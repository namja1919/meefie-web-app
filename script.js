// Handle Login Form
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulate login
  if (username && password) {
    alert(`Welcome, ${username}!`);
    // In production: redirect to dashboard
    window.location.href = "dashboard.html";
  } else {
    alert("Please enter both username and password.");
  }
});

// Handle Social Login Buttons
document.querySelectorAll(".social-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const provider = this.getAttribute("data-provider");
    alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login clicked.\nIn production, integrate OAuth.`);
  });
});
