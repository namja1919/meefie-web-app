// auth.js
import { auth } from './firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Email/Password Sign In
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Logged in!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`❌ Login failed: ${error.message}`);
  }
});

// Email/Password Sign Up
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Account created!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`❌ Sign-up failed: ${error.message}`);
  }
});

// Google Sign-In
const googleProvider = new GoogleAuthProvider();
document.getElementById("googleSignIn")?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`❌ Google login failed: ${error.message}`);
  }
});

// Google Sign-Up (same as sign-in)
document.getElementById("googleSignUp")?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`❌ Google sign-up failed: ${error.message}`);
  }
});
