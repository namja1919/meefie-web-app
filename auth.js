import { auth } from './firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Handle Email/Password Sign In
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

// Handle Email/Password Sign Up
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

// Handle Google Sign-In/Up
const googleProvider = new GoogleAuthProvider();
document.getElementById("googleSignIn")?.addEventListener("click", async () => {
  handleSocialSignIn(googleProvider, "Google");
});
document.getElementById("googleSignUp")?.addEventListener("click", async () => {
  handleSocialSignIn(googleProvider, "Google");
});

// Handle Facebook Sign-In/Up
const facebookProvider = new FacebookAuthProvider();
document.getElementById("facebookSignIn")?.addEventListener("click", async () => {
  handleSocialSignIn(facebookProvider, "Facebook");
});
document.getElementById("facebookSignUp")?.addEventListener("click", async () => {
  handleSocialSignIn(facebookProvider, "Facebook");
});

// Handle Instagram (not direct)
document.getElementById("instagramSignIn")?.addEventListener("click", () => {
  alert("⚠️ Instagram login requires Facebook OAuth setup.");
});
document.getElementById("instagramSignUp")?.addEventListener("click", () => {
  alert("⚠️ Instagram sign-up requires Facebook OAuth setup.");
});

// Reusable social sign-in function
async function handleSocialSignIn(provider, providerName) {
  try {
    await signInWithPopup(auth, provider);
    alert(`✅ Signed in with ${providerName}!`);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`❌ ${providerName} login failed: ${error.message}`);
  }
}
