// ─────────────────────────────────────────
// products.js — Product grid rendering & filtering
// Fetches from backend API; falls back to data.js
// ─────────────────────────────────────────

let currentFilter = 'all';
let searchQuery = '';

/** Build star string from numeric rating */
function buildStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}

/** Return the badge HTML (or empty string) */
function buildBadge(badge) {
  if (!badge) return '';
  const label = badge === 'sale' ? 'Sale' : badge === 'new' ? 'New' : badge;
  return `<div class="badge ${badge}">${label}</div>`;
}

/** Show a loading skeleton in the grid */
function showLoadingSkeleton() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = Array.from({ length: 8 }).map(() => `
    <div class="product-card" style="pointer-events:none;opacity:0.5;">
      <div class="product-img" style="background:#eee;color:transparent;">⬜</div>
      <div class="product-body">
        <div class="product-category" style="background:#eee;height:12px;border-radius:4px;margin-bottom:8px;"></div>
        <div class="product-name"    style="background:#eee;height:16px;border-radius:4px;margin-bottom:12px;"></div>
        <div class="product-footer">
          <div style="background:#eee;height:14px;width:60px;border-radius:4px;"></div>
        </div>
      </div>
    </div>
  `).join('');
}

/** Render the full product grid based on active filter + search */
function renderProducts() {
  const grid = document.getElementById('productGrid');

  const filtered = products.filter(p => {
    const matchCat = currentFilter === 'all' || p.category === currentFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="products-empty">No products found.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.06}s" onclick="location.href='product.html?id=${p.id}'">
      ${buildBadge(p.badge)}
      <div class="product-img">${p.emoji}</div>
      <div class="product-body">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${buildStars(p.rating)}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-footer">
          <div>
            <span class="price">₹${p.price}</span>
            ${p.originalPrice ? `<span class="price-old">₹${p.originalPrice}</span>` : ''}
          </div>
          <button class="add-btn" id="addbtn-${p.id}" onclick="event.stopPropagation(); addToCart(${p.id})">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/** Switch active filter category */
function filterProducts(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
}

/** Visual feedback on the Add button after adding to cart */
function flashAddBtn(id) {
  const btn = document.getElementById(`addbtn-${id}`);
  if (!btn) return;

  btn.classList.add('added');
  btn.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Added`;

  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Add`;
  }, 1400);
}

/**
 * Load products from backend API.
 * Falls back to the local `products` array (data.js) on any error.
 */
async function loadProductsFromAPI() {
  showLoadingSkeleton();
  try {
    const data = await apiGet('/products');
    // Replace the global products array with backend data
    products.length = 0;
    data.forEach(p => products.push(p));
    console.log(`[API] Loaded ${products.length} products from backend.`);
  } catch (err) {
    console.warn('[API] Could not reach backend — using local data.js fallback.', err.message);
  }
  renderProducts();
}

/** Wire up the search input (called once on init) */
function initSearch() {
  document.getElementById('searchInput').addEventListener('input', function () {
    searchQuery = this.value;
    renderProducts();
  });
}
