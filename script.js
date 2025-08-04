// Handle Sign In
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  alert(`Signing in as ${email}...\nIn production, connect to Firebase/Auth0.`);
  // Redirect to dashboard or call backend
  window.location.href = "dashboard.html";
});

// Handle Social Logins
const socialButtons = document.querySelectorAll(".social-btn");
socialButtons.forEach(button => {
  button.addEventListener("click", function() {
    const provider = this.querySelector("span").textContent.toLowerCase();
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} Sign-In clicked.\nIn production, integrate OAuth.`);
  });
});
