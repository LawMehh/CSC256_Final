// Signup Form Handling
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  // Simulate signup (replace with actual backend logic)
  if (email && password) {
    alert('Signup successful!');
    window.location.href = 'login.html'; // Redirect to login page
  } else {
    alert('Please enter both email and password.');
  }
});