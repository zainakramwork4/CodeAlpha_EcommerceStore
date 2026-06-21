// ===================================
// Login Page Logic
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const errorMsg = document.getElementById('error-msg');
  const loginBtn = document.getElementById('login-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.remove('show');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';

    try {
      const userData = await api.login({ email, password });
      Auth.login(userData);

      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect') || 'index.html';
      window.location.href = redirect;
    } catch (err) {
      errorMsg.textContent = err.message;
      errorMsg.classList.add('show');
      loginBtn.disabled = false;
      loginBtn.textContent = 'Sign In';
    }
  });
});
