// Import auth from firebase-config
import { auth } from './firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Email/Password Sign In
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

// Google Sign-In
document.getElementById("googleSignIn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`Google login failed: ${error.message}`);
  }
});

// Facebook Sign-In
document.getElementById("facebookSignIn").addEventListener("click", async () => {
  const provider = new FacebookAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`Facebook login failed: ${error.message}`);
  }
});

// Instagram Sign-In
document.getElementById("instagramSignIn").addEventListener("click", () => {
  alert("Instagram login requires custom OAuth setup.");
});
