// js/auth.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } 
  from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// ✅ Your Firebase config (use your real App ID)
const firebaseConfig = {
  apiKey: "AIzaSyBt4EwlCkoiynJQMlElwvpUVGDARjHuHUg",
  authDomain: "meefie-web-app.firebaseapp.com",
  projectId: "meefie-web-app",
  storageBucket: "meefie-web-app.appspot.com",
  messagingSenderId: "874544488197",
  appId: "1:1056787620759:web:85fd354e87bd1add16216c" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// ✅ Email/Password Sign In
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Logged in!");
    window.location.href = "dashboard.html";
  } catch (error) {
    // Show meaningful error
    if (error.code === 'auth/operation-not-allowed') {
      alert("❌ Email login is not enabled. Contact admin.");
    } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      alert("❌ Invalid email or password.");
    } else {
      alert(`❌ Login failed: ${error.message}`);
    }
  }
});

// ✅ Google Sign-In
document.getElementById("googleSignIn").addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = "dashboard.html";
  } catch (error) {
    if (error.code === 'auth/operation-not-allowed') {
      alert("❌ Google login is not enabled. Contact admin.");
    } else {
      alert(`❌ Google login failed: ${error.message}`);
    }
  }
});
