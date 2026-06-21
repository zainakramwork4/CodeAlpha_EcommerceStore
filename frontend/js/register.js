// ===================================
// Register Page Logic
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const errorMsg = document.getElementById('error-msg');
  const registerBtn = document.getElementById('register-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.remove('show');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    registerBtn.disabled = true;
    registerBtn.textContent = 'Creating account...';

    try {
      const userData = await api.register({ name, email, password });
      Auth.login(userData);
      window.location.href = 'index.html';
    } catch (err) {
      errorMsg.textContent = err.message;
      errorMsg.classList.add('show');
      registerBtn.disabled = false;
      registerBtn.textContent = 'Create Account';
    }
  });
});
