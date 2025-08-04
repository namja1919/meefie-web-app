// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Your Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyBt4EwlCkoiynJQMlElwvpUVGDARjHuHUg",
  authDomain: "meefie-web-app.firebaseapp.com",
  projectId: "meefie-web-app",
  storageBucket: "meefie-web-app.appspot.com",
  messagingSenderId: "874544488197",
  appId: "1056787620759-s3nmkr5rtco36n2osqqu5b07q9hdvofo.apps.googleusercontent.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Make auth available to other modules
export { auth };
