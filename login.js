// Login Form Handling
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Simulate login (replace with actual backend logic)
  if (email === 'test@example.com' && password === 'password') { 
    alert('Login successful!');
    window.location.href = 'notes.html'; // Redirect to notes page
  } else {
    alert('Invalid email or password.');
  }
});