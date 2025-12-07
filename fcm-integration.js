// Firebase Cloud Messaging Integration
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const FCM_SERVER_KEY = 'BKCUKKL7mEG0sM527XPDsV0AF6paF5jaQ5ZKFErLvGttx6MrbgaZNxaDjSuS17zbS4x3x70L0HK9_fPJ_H_5Ejg';

let fcmToken = null;
let isNotificationEnabled = false;

// Initialize FCM
export async function initFCM() {
  try {
    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      console.log('Service Workers not supported');
      return;
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('Service Worker registered:', registration);

    // Request notification permission
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      console.log('Notification permission granted');
      isNotificationEnabled = true;
      
      // Get FCM token from admin dashboard
      getFCMToken();
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.error('FCM initialization error:', error);
  }
}

// Get FCM device token
export async function getFCMToken() {
  try {
    // Note: In production, use Firebase Messaging SDK properly
    // For now, generate a unique device ID
    const deviceId = generateDeviceId();
    fcmToken = deviceId;
    
    // Store token in localStorage
    localStorage.setItem('fcm_token', fcmToken);
    console.log('FCM Token:', fcmToken);
    
    return fcmToken;
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
}

// Generate unique device identifier
function generateDeviceId() {
  const stored = localStorage.getItem('device_id');
  if (stored) return stored;
  
  const id = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('device_id', id);
  return id;
}

// Send FCM notification to admin devices
export async function sendFCMNotification(submission) {
  if (!FCM_SERVER_KEY) {
    console.log('FCM Server Key not configured');
    return;
  }

  try {
    // Get all registered admin devices from Firestore
    const adminTokens = await getAdminNotificationTokens();
    
    if (adminTokens.length === 0) {
      console.log('No admin devices registered for notifications');
      return;
    }

    const message = {
      notification: {
        title: `📨 New Contact Message from ${submission.name}`,
        body: submission.message.substring(0, 100) + (submission.message.length > 100 ? '...' : ''),
        icon: '📧',
      },
      data: {
        submissionId: submission.docId || 'unknown',
        senderEmail: submission.email,
        senderName: submission.name,
        link: '/admin.html'
      }
    };

    // Send to all admin tokens
    for (const token of adminTokens) {
      await sendToDevice(token, message);
    }

    console.log('FCM notifications sent to', adminTokens.length, 'devices');
  } catch (error) {
    console.error('Error sending FCM notification:', error);
  }
}

// Send message to specific device
async function sendToDevice(deviceToken, message) {
  try {
    const response = await fetch('https://fcm.googleapis.com/v1/projects/vvraju-portfolio/messages:send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FCM_SERVER_KEY}`
      },
      body: JSON.stringify({
        message: {
          token: deviceToken,
          notification: message.notification,
          data: message.data,
          android: {
            priority: 'high',
            notification: {
              sound: 'default',
              channelId: 'contact_submissions'
            }
          },
          webpush: {
            headers: {
              TTL: '86400'
            },
            data: message.data,
            notification: {
              icon: '/favicon.ico',
              badge: '/badge-128x128.png',
              title: message.notification.title,
              body: message.notification.body,
              tag: 'contact-notification',
              requireInteraction: 'true'
            }
          },
          apns: {
            headers: {
              'apns-priority': '10'
            },
            payload: {
              aps: {
                alert: {
                  title: message.notification.title,
                  body: message.notification.body
                },
                sound: 'default',
                badge: 1
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('FCM send error:', error);
    }
  } catch (error) {
    console.error('Error sending to device:', error);
  }
}

// Get all admin notification tokens from Firestore
async function getAdminNotificationTokens() {
  try {
    // This would query admin_devices collection
    // For now, return empty array (implement in admin dashboard)
    const stored = localStorage.getItem('admin_fcm_tokens');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting admin tokens:', error);
    return [];
  }
}

// Register device token (call from admin dashboard)
export async function registerAdminDevice(userId) {
  try {
    const token = await getFCMToken();
    
    // Save to Firestore
    await addDoc(collection(db, 'admin_devices'), {
      userId,
      token,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      platform: getPlatform()
    });

    // Also store locally
    const tokens = JSON.parse(localStorage.getItem('admin_fcm_tokens') || '[]');
    if (!tokens.includes(token)) {
      tokens.push(token);
      localStorage.setItem('admin_fcm_tokens', JSON.stringify(tokens));
    }

    console.log('Admin device registered for FCM');
  } catch (error) {
    console.error('Error registering admin device:', error);
  }
}

// Show local notification (for testing)
export function showLocalNotification(title, options = {}) {
  if (!isNotificationEnabled || !('Notification' in window)) {
    console.log('Notifications not available');
    return;
  }

  try {
    new Notification(title, {
      icon: '/favicon.ico',
      badge: '/badge-128x128.png',
      tag: 'contact-notification',
      ...options
    });
  } catch (error) {
    console.error('Error showing notification:', error);
  }
}

// Detect platform
function getPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('win')) return 'Windows';
  if (ua.includes('mac')) return 'MacOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  if (ua.includes('android')) return 'Android';
  return 'Unknown';
}

// Initialize on import
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // initFCM(); // Uncomment when ready to enable FCM
  });
}
