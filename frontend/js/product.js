// ===================================
// Product Detail Page Logic
// ===================================
let currentProduct = null;
let selectedQty = 1;

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderProductDetail(product) {
  const container = document.getElementById('product-detail-container');
  const inStock = product.stock > 0;

  container.innerHTML = `
    <div class="product-detail__image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-detail__info">
      <div class="product-detail__category">${product.category}</div>
      <h1 class="product-detail__name">${product.name}</h1>
      <div class="product-detail__price">$${product.price.toFixed(2)}</div>
      <p class="product-detail__desc">${product.description}</p>
      <div class="product-detail__stock ${inStock ? 'stock-in' : 'stock-out'}">
        ${inStock ? `✓ In Stock (${product.stock} available)` : '✕ Out of Stock'}
      </div>
      ${
        inStock
          ? `
        <div class="qty-selector">
          <button id="qty-minus" aria-label="Decrease quantity">−</button>
          <span id="qty-value">1</span>
          <button id="qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn-primary btn-block" id="add-to-cart-btn">Add to Cart</button>
      `
          : `<button class="btn btn-secondary btn-block" disabled>Out of Stock</button>`
      }
    </div>
  `;

  if (inStock) {
    document.getElementById('qty-minus').addEventListener('click', () => {
      if (selectedQty > 1) {
        selectedQty--;
        document.getElementById('qty-value').textContent = selectedQty;
      }
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
      if (selectedQty < product.stock) {
        selectedQty++;
        document.getElementById('qty-value').textContent = selectedQty;
      }
    });
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
      Cart.addItem(product, selectedQty);
      const btn = document.getElementById('add-to-cart-btn');
      btn.textContent = 'Added to Cart ✓';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
      }, 1500);
    });
  }
}

async function loadProductDetail() {
  const id = getProductIdFromUrl();
  const container = document.getElementById('product-detail-container');

  if (!id) {
    container.innerHTML = `<p style="padding: 40px; color: var(--color-danger);">No product ID provided.</p>`;
    return;
  }

  try {
    const product = await api.getProduct(id);
    currentProduct = product;
    renderProductDetail(product);
  } catch (err) {
    container.innerHTML = `<p style="padding: 40px; color: var(--color-danger);">${err.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadProductDetail();

  const headerSearch = document.getElementById('search-input-header');
  if (headerSearch) {
    headerSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && headerSearch.value.trim()) {
        window.location.href = `index.html?search=${encodeURIComponent(headerSearch.value.trim())}`;
      }
    });
  }
});
