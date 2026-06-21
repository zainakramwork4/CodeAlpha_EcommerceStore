// ===================================
// Homepage logic — product grid, search, filter
// ===================================
let currentCategory = 'all';
let currentKeyword = '';
let searchDebounce;

function renderProducts(products) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <h3>No products found</h3>
        <p>Try a different search term or category.</p>
      </div>`;
    return;
  }

  grid.innerHTML = products
    .map(
      (p) => `
    <article class="product-card">
      <a href="product.html?id=${p._id}" class="product-card__image">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" />
      </a>
      <div class="product-card__body">
        <span class="product-card__category">${escapeHtml(p.category)}</span>
        <a href="product.html?id=${p._id}">
          <h3 class="product-card__name">${escapeHtml(p.name)}</h3>
        </a>
        <div class="product-card__footer">
          <span class="product-card__price">$${p.price.toFixed(2)}</span>
          <button class="btn-add-cart" data-id="${p._id}" ${p.stock === 0 ? 'disabled' : ''}>
            ${p.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>`
    )
    .join('');

  grid.querySelectorAll('.btn-add-cart').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      const product = products.find((p) => p._id === id);
      if (product) {
        Cart.addItem(product, 1);
        btn.textContent = 'Added ✓';
        setTimeout(() => {
          btn.textContent = 'Add to Cart';
        }, 1200);
      }
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function loadProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '<p style="padding: 40px; color: var(--color-muted);">Loading products...</p>';

  try {
    const params = new URLSearchParams();
    if (currentCategory !== 'all') params.set('category', currentCategory);
    if (currentKeyword) params.set('keyword', currentKeyword);

    const query = params.toString() ? `?${params.toString()}` : '';
    const products = await api.getProducts(query);
    renderProducts(products);
  } catch (err) {
    grid.innerHTML = `<p style="padding: 40px; color: var(--color-danger);">Failed to load products: ${err.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  // Category filter
  document.querySelectorAll('.category-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.category-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.category;
      loadProducts();
    });
  });

  // Search input with debounce
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        currentKeyword = searchInput.value.trim();
        loadProducts();
      }, 350);
    });
  }
});
