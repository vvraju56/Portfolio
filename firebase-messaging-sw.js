// Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyA_-ncY5lH6ATyHyMCFEG-S1PTd1a9kydQ",
  authDomain: "vvraju-portfolio.firebaseapp.com",
  projectId: "vvraju-portfolio",
  storageBucket: "vvraju-portfolio.firebasestorage.app",
  messagingSenderId: "656271012390",
  appId: "1:656271012390:web:8837a5af22d7b0d95face7",
  measurementId: "G-F89054R2KN"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico',
    badge: '/badge-128x128.png',
    tag: 'contact-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Open Dashboard'
      },
      {
        action: 'close',
        title: 'Dismiss'
      }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  if (event.action === 'close') {
    event.notification.close();
  } else {
    event.notification.close();
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        for (let client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/admin.html');
        }
      })
    );
  }
});
