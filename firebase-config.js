// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_-ncY5lH6ATyHyMCFEG-S1PTd1a9kydQ",
  authDomain: "vvraju-portfolio.firebaseapp.com",
  projectId: "vvraju-portfolio",
  storageBucket: "vvraju-portfolio.firebasestorage.app",
  messagingSenderId: "656271012390",
  appId: "1:656271012390:web:8837a5af22d7b0d95face7",
  measurementId: "G-F89054R2KN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };
