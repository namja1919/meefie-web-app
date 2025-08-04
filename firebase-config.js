// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// ✅ Correct Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBt4EwlCkoiynJQMlElwvpUVGDARjHuHUg",
  authDomain: "meefie-web-app.firebaseapp.com",
  projectId: "meefie-web-app",
  storageBucket: "meefie-web-app.appspot.com",
  messagingSenderId: "874544488197",
  appId: "1:1056787620759:web:85fd354e87bd1add16216c" // ← Replace with real ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth
export { auth };
