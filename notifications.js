// Notifications: Sound, Telegram, Email Integration
import { db } from './firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// EmailJS Configuration (you need to sign up at emailjs.com)
const EMAILJS_SERVICE_ID = 'service_your_service_id';
const EMAILJS_TEMPLATE_ID = 'template_your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = 'your_bot_token';
const TELEGRAM_CHAT_ID = 'your_chat_id';

export async function notifyAdmins(submission) {
  try {
    // Send Telegram notification
    await sendTelegramNotification(submission);
    
    // Send email notification
    await sendEmailNotification(submission);
    
  } catch (error) {
    console.error('Error notifying admins:', error);
  }
}

async function sendTelegramNotification(submission) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured');
    return;
  }
  
  try {
    const message = `
📨 New Contact Form Submission!

👤 Name: ${submission.name}
📧 Email: ${submission.email}
💬 Message: ${submission.message}
⏰ Time: ${new Date().toLocaleString()}
    `.trim();
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
    
  } catch (error) {
    console.error('Telegram notification failed:', error);
  }
}

async function sendEmailNotification(submission) {
  if (!EMAILJS_PUBLIC_KEY) {
    console.log('EmailJS not configured');
    return;
  }
  
  try {
    // Initialize EmailJS (add to index.html: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>)
    if (typeof emailjs !== 'undefined') {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'your_email@gmail.com',
        from_name: submission.name,
        from_email: submission.email,
        message: submission.message,
        timestamp: new Date().toLocaleString()
      });
    }
  } catch (error) {
    console.error('Email notification failed:', error);
  }
}

export function playAdminNotificationSound() {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [800, 600, 800, 600];
    let time = context.currentTime;
    
    notes.forEach((freq) => {
      const osc = context.createOscillator();
      const gain = context.createGain();
      
      osc.connect(gain);
      gain.connect(context.destination);
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
      
      osc.start(time);
      osc.stop(time + 0.2);
      
      time += 0.2;
    });
  } catch (e) {
    console.log('Audio context not available');
  }
}
