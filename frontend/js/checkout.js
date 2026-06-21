// ===================================
// Checkout Page Logic
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;

  const items = Cart.getItems();
  if (items.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  renderOrderSummary();

  const form = document.getElementById('checkout-form');
  const errorMsg = document.getElementById('error-msg');
  const successMsg = document.getElementById('success-msg');
  const placeOrderBtn = document.getElementById('place-order-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.remove('show');

    const shippingAddress = {
      street: document.getElementById('street').value.trim(),
      city: document.getElementById('city').value.trim(),
      postalCode: document.getElementById('postalCode').value.trim(),
      country: document.getElementById('country').value.trim()
    };
    const paymentMethod = document.getElementById('paymentMethod').value;

    const orderItems = Cart.getItems().map((i) => ({
      product: i.productId,
      quantity: i.quantity
    }));

    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Placing order...';

    try {
      const order = await api.createOrder({ orderItems, shippingAddress, paymentMethod });
      Cart.clear();
      successMsg.textContent = 'Order placed successfully! Redirecting...';
      successMsg.classList.add('show');
      setTimeout(() => {
        window.location.href = `orders.html?highlight=${order._id}`;
      }, 1200);
    } catch (err) {
      errorMsg.textContent = err.message;
      errorMsg.classList.add('show');
      placeOrderBtn.disabled = false;
      placeOrderBtn.textContent = 'Place Order';
    }
  });
});

function renderOrderSummary() {
  const items = Cart.getItems();
  const subtotal = Cart.getSubtotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const container = document.getElementById('order-summary-mini');
  container.innerHTML = `
    ${items
      .map(
        (i) => `
      <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:8px;">
        <span>${i.name} × ${i.quantity}</span>
        <span>$${(i.price * i.quantity).toFixed(2)}</span>
      </div>`
      )
      .join('')}
    <div style="border-top:1px solid var(--color-border); margin-top:12px; padding-top:12px; display:flex; justify-content:space-between; font-weight:700;">
      <span>Total</span><span>$${total.toFixed(2)}</span>
    </div>
  `;
}
