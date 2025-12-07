// Admin Dashboard JavaScript - Real-time Updates & Authentication
import { auth, db } from './firebase-config.js';
import { 
  onAuthStateChanged, 
  signOut,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { Toast } from './toast.js';
import { playAdminNotificationSound } from './notifications.js';
import { registerAdminDevice, initFCM } from './fcm-integration.js';

let currentUser = null;
let unsubscribe = null;

// Check Authentication on Load
window.addEventListener('load', () => {
  checkAuthentication();
});

function checkAuthentication() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      showDashboard();
      initRealtimeListener();
    } else {
      showLoginForm();
      hideDashboard();
    }
  });
}

function showLoginForm() {
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('dashboard-section').style.display = 'none';
}

function showDashboard() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('dashboard-section').style.display = 'block';
  document.getElementById('admin-email').textContent = currentUser.email;
  
  // Initialize FCM for this admin
  initFCM();
  registerAdminDevice(currentUser.uid);
}

function hideDashboard() {
  document.getElementById('dashboard-section').style.display = 'none';
}

// Login Handler
window.adminLogin = async function() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  
  if (!email || !password) {
    Toast.error('Please enter email and password');
    return;
  }
  
  try {
    const loginBtn = event.target;
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';
    
    await signInWithEmailAndPassword(auth, email, password);
    Toast.success('Logged in successfully');
    
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign In';
  } catch (error) {
    console.error('Login error:', error);
    Toast.error('Login failed: ' + error.message);
    
    const loginBtn = document.querySelector('#login-section button');
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign In';
  }
};

// Logout Handler
window.adminLogout = async function() {
  try {
    if (unsubscribe) unsubscribe();
    await signOut(auth);
    Toast.success('Logged out successfully');
  } catch (error) {
    Toast.error('Logout failed');
  }
};

// Real-time Listener for Messages
function initRealtimeListener() {
  if (unsubscribe) unsubscribe();
  
  const q = query(
    collection(db, 'contact_messages'),
    orderBy('timestamp', 'desc')
  );
  
  unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = [];
    let newMessageCount = 0;
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        ...data
      });
      
      if (data.status === 'new') {
        newMessageCount++;
      }
    });
    
    // Play sound if there are new messages
    if (newMessageCount > 0) {
      playAdminNotificationSound();
    }
    
    // Update dashboard
    updateDashboard(messages, newMessageCount);
  }, (error) => {
    console.error('Error listening to messages:', error);
    Toast.error('Error loading messages');
  });
}

// Update Dashboard Display
function updateDashboard(messages, newCount) {
  // Update counts
  document.getElementById('total-submissions').textContent = messages.length;
  document.getElementById('new-submissions').textContent = newCount;
  
  // Update latest submission
  if (messages.length > 0) {
    const latest = messages[0];
    const latestDiv = document.getElementById('latest-submission');
    
    const timestamp = latest.timestamp 
      ? new Date(latest.timestamp.toDate()).toLocaleString()
      : 'Just now';
    
    latestDiv.innerHTML = `
      <div class="latest-card">
        <div class="latest-header">
          <h4>${escapeHtml(latest.name)}</h4>
          <span class="timestamp">${timestamp}</span>
        </div>
        <p class="latest-email">${escapeHtml(latest.email)}</p>
        <p class="latest-message">${escapeHtml(latest.message)}</p>
        <div class="latest-actions">
          <button onclick="markAsRead('${latest.id}')" class="btn-small btn-read">Mark as Read</button>
          <button onclick="deleteMessage('${latest.id}')" class="btn-small btn-delete">Delete</button>
        </div>
      </div>
    `;
  }
  
  // Update full messages list
  const messagesList = document.getElementById('messages-list');
  messagesList.innerHTML = '';
  
  if (messages.length === 0) {
    messagesList.innerHTML = '<p class="no-messages">No messages yet</p>';
    return;
  }
  
  messages.forEach((msg) => {
    const timestamp = msg.timestamp 
      ? new Date(msg.timestamp.toDate()).toLocaleString()
      : 'Unknown';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-item ${msg.status === 'new' ? 'new' : 'read'}`;
    messageDiv.innerHTML = `
      <div class="message-header">
        <div class="message-info">
          <h4>${escapeHtml(msg.name)}</h4>
          <p class="message-email">${escapeHtml(msg.email)}</p>
        </div>
        <span class="message-time">${timestamp}</span>
      </div>
      <p class="message-text">${escapeHtml(msg.message)}</p>
      <div class="message-actions">
        ${msg.status === 'new' ? `<button onclick="markAsRead('${msg.id}')" class="btn-small btn-read">Mark as Read</button>` : ''}
        <button onclick="deleteMessage('${msg.id}')" class="btn-small btn-delete">Delete</button>
      </div>
    `;
    
    messagesList.appendChild(messageDiv);
  });
}

// Mark Message as Read
window.markAsRead = async function(docId) {
  try {
    await updateDoc(doc(db, 'contact_messages', docId), {
      status: 'read',
      isRead: true
    });
    Toast.success('Marked as read');
  } catch (error) {
    console.error('Error updating document:', error);
    Toast.error('Failed to update message');
  }
};

// Delete Message
window.deleteMessage = async function(docId) {
  if (!confirm('Are you sure you want to delete this message?')) return;
  
  try {
    await deleteDoc(doc(db, 'contact_messages', docId));
    Toast.success('Message deleted');
  } catch (error) {
    console.error('Error deleting document:', error);
    Toast.error('Failed to delete message');
  }
};

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
