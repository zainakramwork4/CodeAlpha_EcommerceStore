// ===================================
// API Configuration & Helper
// ===================================
const API_BASE = '/api';

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

const api = {
  // Auth
  register: (payload) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: () => apiRequest('/auth/profile'),

  // Products
  getProducts: (query = '') => apiRequest(`/products${query}`),
  getProduct: (id) => apiRequest(`/products/${id}`),

  // Orders
  createOrder: (payload) => apiRequest('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getMyOrders: () => apiRequest('/orders/myorders'),
  getOrder: (id) => apiRequest(`/orders/${id}`)
};
