// ===================================
// Shopping Cart Management (localStorage)
// ===================================
const CART_KEY = 'codealpha_cart';

const Cart = {
  getItems() {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  saveItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    Cart.updateBadge();
  },

  addItem(product, quantity = 1) {
    const items = Cart.getItems();
    const existing = items.find((i) => i.productId === product._id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        quantity
      });
    }

    Cart.saveItems(items);
  },

  updateQuantity(productId, quantity) {
    let items = Cart.getItems();
    if (quantity <= 0) {
      items = items.filter((i) => i.productId !== productId);
    } else {
      const item = items.find((i) => i.productId === productId);
      if (item) item.quantity = quantity;
    }
    Cart.saveItems(items);
  },

  removeItem(productId) {
    const items = Cart.getItems().filter((i) => i.productId !== productId);
    Cart.saveItems(items);
  },

  clear() {
    localStorage.removeItem(CART_KEY);
    Cart.updateBadge();
  },

  getTotalItems() {
    return Cart.getItems().reduce((sum, i) => sum + i.quantity, 0);
  },

  getSubtotal() {
    return Cart.getItems().reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  updateBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
      const count = Cart.getTotalItems();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
