// ===================================
// Orders History Page Logic
// ===================================
document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireAuth()) return;

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => Auth.logout());
  }

  const container = document.getElementById('orders-container');
  const params = new URLSearchParams(window.location.search);
  const highlightId = params.get('highlight');

  try {
    const orders = await api.getMyOrders();

    if (orders.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No orders yet</h3>
          <p>Your past orders will appear here once you place one.</p>
          <br/>
          <a href="index.html" class="btn btn-primary">Start Shopping</a>
        </div>`;
      return;
    }

    container.innerHTML = orders
      .map(
        (order) => `
      <div class="order-card" style="${order._id === highlightId ? 'border-color: var(--color-accent);' : ''}">
        <div class="order-card__header">
          <span class="order-id">Order #${order._id.slice(-8).toUpperCase()} · ${new Date(order.createdAt).toLocaleDateString()}</span>
          <span class="order-status status-${order.status.toLowerCase()}">${order.status}</span>
        </div>
        ${order.orderItems
          .map(
            (item) => `
          <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:8px;">
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>`
          )
          .join('')}
        <div style="border-top:1px solid var(--color-border); margin-top:12px; padding-top:12px; display:flex; justify-content:space-between; font-weight:700;">
          <span>Total</span><span>$${order.totalPrice.toFixed(2)}</span>
        </div>
      </div>`
      )
      .join('');
  } catch (err) {
    container.innerHTML = `<p style="color: var(--color-danger);">${err.message}</p>`;
  }
});
