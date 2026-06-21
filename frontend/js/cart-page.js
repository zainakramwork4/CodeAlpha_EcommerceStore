// ===================================
// Cart Page Logic
// ===================================
function renderCartPage() {
  const items = Cart.getItems();
  const container = document.getElementById('cart-page-container');

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <h3>Your cart is empty</h3>
        <p>Browse our products and add something you like.</p>
        <br/>
        <a href="index.html" class="btn btn-primary">Continue Shopping</a>
      </div>`;
    return;
  }

  const subtotal = Cart.getSubtotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="cart-items-list">
      ${items
        .map(
          (item) => `
        <div class="cart-item" data-id="${item.productId}">
          <div class="cart-item__image"><img src="${item.image}" alt="${item.name}" /></div>
          <div class="cart-item__info">
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__price">$${item.price.toFixed(2)} each</div>
            <div class="cart-item__controls">
              <div class="qty-selector" style="margin-bottom:0;">
                <button class="cart-qty-minus" data-id="${item.productId}" aria-label="Decrease quantity">−</button>
                <span>${item.quantity}</span>
                <button class="cart-qty-plus" data-id="${item.productId}" aria-label="Increase quantity">+</button>
              </div>
              <button class="cart-item__remove" data-id="${item.productId}">Remove</button>
            </div>
          </div>
          <div style="font-weight:600;">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>`
        )
        .join('')}
    </div>

    <aside class="cart-summary">
      <h3>Order Summary</h3>
      <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span></div>
      <div class="summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
      <button class="btn btn-primary btn-block" id="checkout-btn" style="margin-top:16px;">Proceed to Checkout</button>
    </aside>
  `;

  attachCartEventListeners();
}

function attachCartEventListeners() {
  document.querySelectorAll('.cart-qty-plus').forEach((btn) => {
    btn.addEventListener('click', () => {
      const items = Cart.getItems();
      const item = items.find((i) => i.productId === btn.dataset.id);
      if (item && item.quantity < item.stock) {
        Cart.updateQuantity(btn.dataset.id, item.quantity + 1);
        renderCartPage();
      }
    });
  });

  document.querySelectorAll('.cart-qty-minus').forEach((btn) => {
    btn.addEventListener('click', () => {
      const items = Cart.getItems();
      const item = items.find((i) => i.productId === btn.dataset.id);
      if (item) {
        Cart.updateQuantity(btn.dataset.id, item.quantity - 1);
        renderCartPage();
      }
    });
  });

  document.querySelectorAll('.cart-item__remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      Cart.removeItem(btn.dataset.id);
      renderCartPage();
    });
  });

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (!Auth.isLoggedIn()) {
        window.location.href = 'login.html?redirect=checkout.html';
      } else {
        window.location.href = 'checkout.html';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', renderCartPage);
