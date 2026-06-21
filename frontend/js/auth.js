// ===================================
// Auth State Management
// ===================================
const Auth = {
  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  },

  isLoggedIn() {
    return !!Auth.getToken();
  },

  login(userData) {
    localStorage.setItem('token', userData.token);
    const { token, ...user } = userData;
    localStorage.setItem('user', JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  },

  updateNavUI() {
    const accountLink = document.getElementById('nav-account');
    if (!accountLink) return;

    if (Auth.isLoggedIn()) {
      const user = Auth.getUser();
      accountLink.textContent = user?.name?.split(' ')[0] || 'Account';
      accountLink.href = 'orders.html';
    } else {
      accountLink.textContent = 'Sign In';
      accountLink.href = 'login.html';
    }
  },

  requireAuth() {
    if (!Auth.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }
};

document.addEventListener('DOMContentLoaded', () => Auth.updateNavUI());
