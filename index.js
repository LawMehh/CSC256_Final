let isLoggedIn = false; // Initially not logged in
const mainNav = document.getElementById('main-nav');

function updateNav() {
  mainNav.innerHTML = ''; // Clear existing nav items
  if (isLoggedIn) {
    // Add logout link
    const logoutLink = document.createElement('a');
    logoutLink.href = "#"; // You might handle logout differently
    logoutLink.textContent = "Logout";
    mainNav.appendChild(logoutLink);
  } else {
    // Add login and signup links
    const loginLink = document.createElement('a');
    loginLink.href = "login.html";
    loginLink.textContent = "Login";
    mainNav.appendChild(loginLink);

    const signupLink = document.createElement('a');
    signupLink.href = "signup.html";
    signupLink.textContent = "Sign Up";
    mainNav.appendChild(signupLink);
  }
}

// Call updateNav on page load to initially set the navigation
updateNav();