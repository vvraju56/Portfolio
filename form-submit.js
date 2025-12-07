// Contact Form Submission Handler
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { Toast } from './toast.js';
import { notifyAdmins } from './notifications.js';
import { sendFCMNotification } from './fcm-integration.js';

export async function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
      Toast.error('Please fill in all fields');
      return;
    }
    
    if (!isValidEmail(email)) {
      Toast.error('Please enter a valid email');
      return;
    }
    
    try {
      // Disable submit button
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'contact_messages'), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
        isRead: false,
        status: 'new'
      });
      
      // Show success to user
      Toast.success('Message sent successfully! We will get back to you soon.');
      
      // Play notification sound
      playNotificationSound();
      
      // Notify admins
      await notifyAdmins({
        name,
        email,
        message,
        docId: docRef.id
      });
      
      // Send FCM push notification
      await sendFCMNotification({
        name,
        email,
        message,
        docId: docRef.id
      });
      
      // Reset form
      contactForm.reset();
      
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      Toast.error('Failed to send message. Please try again.');
      
      // Re-enable submit button
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
    }
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function playNotificationSound() {
  // Use Web Audio API to create a simple beep
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);
  } catch (e) {
    console.log('Audio context not available');
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}
