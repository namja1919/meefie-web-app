// Import Firebase modules
import { auth } from './firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// ——— Email/Password Sign In ———
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Logged in!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`❌ Error: ${error.message}`);
  }
});

// ——— Email/Password Sign Up ———
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Account created!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`❌ Error: ${error.message}`);
  }
});

// ——— Google Sign-In/Up ———
document.getElementById("googleSignIn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    alert(`Signed in with Google!`);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(`Google login failed: ${error.message}`);
  }
});

// ——— Facebook Sign-In/Up ———
document.getElementById("facebookSignIn")?.addEventListener("click", async () => {
  const provider = new FacebookAuthProvider();
  handleSocialSignIn(provider, "Facebook");
});

document.getElementById("facebookSignUp")?.addEventListener("click", async () => {
  const provider = new FacebookAuthProvider();
  handleSocialSignIn(provider, "Facebook");
});

// ——— Instagram (not supported directly) ———
document.getElementById("instagramSignIn")?.addEventListener("click", () => {
  alert("⚠️ Instagram login requires custom OAuth setup.");
});
document.getElementById("instagramSignUp")?.addEventListener("click", () => {
  alert("⚠️ Instagram sign-up requires custom OAuth setup.");
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
