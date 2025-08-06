// Import Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } 
  from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Your Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyBt4EwlCkoiynJQMlElwvpUVGDARjHuHUg",
  authDomain: "meefie-web-app.firebaseapp.com",
  projectId: "meefie-web-app",
  storageBucket: "meefie-web-app.appspot.com",
  messagingSenderId: "874544488197",
  appId: "1:1056787620759:web:YOUR-FIREBASE-APP-ID" // ← Replace
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// Email/Password Sign In
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// Google Sign-In
document.getElementById("googleSignIn").addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Google login failed: " + error.message);
  }
});
