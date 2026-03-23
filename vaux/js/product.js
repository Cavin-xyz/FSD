// ─────────────────────────────────────────
// product.js — Rich product detail renderer
// ─────────────────────────────────────────

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function buildStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}

function renderProductDetail() {
  const id = parseInt(getParam('id'), 10);
  const mount = document.getElementById('productDetail');
  if (!mount) return;

  if (!id || isNaN(id)) {
    mount.innerHTML = `
      <div class="pd-not-found reveal">
        <h2>No product selected</h2>
        <p>Head back to the shop to browse our collection.</p>
        <a href="index.html" class="pd-back"><span class="pd-back-arrow">←</span> Back to shop</a>
      </div>`;
    return;
  }

  const p = products.find(x => x.id === id);

  if (!p) {
    mount.innerHTML = `
      <div class="pd-not-found reveal">
        <h2>Product not found</h2>
        <p>This item may no longer be available.</p>
        <a href="index.html" class="pd-back">
          <span class="pd-back-arrow">←</span> Back to shop
        </a>
      </div>`;
    return;
  }

  /* Update page title */
  document.title = `${p.name} — VAUX`;

  /* Discount % */
  const discount = p.originalPrice
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : null;

  /* Badge HTML */
  const badgeHtml = p.badge
    ? `<span class="pd-badge ${p.badge}">${p.badge === 'sale' ? 'Sale' : 'New'}</span>`
    : (discount ? `<span class="pd-badge sale">${discount}% off</span>` : '');

  /* Description fallback */
  const desc = p.description ||
    'A thoughtfully crafted piece that blends premium materials with timeless design. Inspected to meet our highest standards before every shipment.';

  mount.innerHTML = `
    <!-- Breadcrumb -->
    <nav class="pd-breadcrumb reveal">
      <a href="index.html">Shop</a>
      <span class="sep">›</span>
      <a href="index.html?category=${p.category}">${capitalise(p.category)}</a>
      <span class="sep">›</span>
      <span class="current">${p.name}</span>
    </nav>

    <!-- Two-column layout -->
    <div class="pd-layout">

      <!-- LEFT: image panel -->
      <div class="pd-image-panel reveal-left">
        <div class="pd-image-frame">
          <div class="pd-glow"></div>
          <span class="pd-emoji">${p.emoji}</span>
        </div>

        <!-- Quick detail rows under the image -->
        <div class="pd-details" style="margin-top:1.5rem;">
          <div class="pd-detail-row">
            <span class="pd-detail-key">Category</span>
            <span class="pd-detail-val">${capitalise(p.category)}</span>
          </div>
          <div class="pd-detail-row">
            <span class="pd-detail-key">Rating</span>
            <span class="pd-detail-val">${p.rating} / 5 &nbsp;(${p.reviews} reviews)</span>
          </div>
          <div class="pd-detail-row">
            <span class="pd-detail-key">Stock</span>
            <span class="pd-detail-val" style="color:var(--green)">
              ${p.stock > 10 ? 'In Stock' : p.stock > 0 ? `Only ${p.stock} left` : 'Out of Stock'}
            </span>
          </div>
          <div class="pd-detail-row">
            <span class="pd-detail-key">Shipping</span>
            <span class="pd-detail-val">Free · 3–5 business days</span>
          </div>
          <div class="pd-detail-row">
            <span class="pd-detail-key">Returns</span>
            <span class="pd-detail-val">Easy 30-day returns</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: info panel -->
      <div class="pd-info reveal-right">

        <div class="pd-category">${capitalise(p.category)}</div>
        <h1 class="pd-name">${p.name}</h1>

        <!-- Rating -->
        <div class="pd-rating">
          <span class="pd-stars">${buildStars(p.rating)}</span>
          <span class="pd-review-count">${p.rating} &nbsp;·&nbsp; ${p.reviews} reviews</span>
        </div>

        <!-- Price -->
        <div class="pd-price-block">
          <span class="pd-price">₹${p.price}</span>
          ${p.originalPrice ? `<span class="pd-price-old">₹${p.originalPrice}</span>` : ''}
          ${badgeHtml}
        </div>

        <!-- Description -->
        <p class="pd-desc">${desc}</p>

        <!-- Quantity -->
        <div class="pd-qty-row">
          <span class="pd-qty-label">Quantity</span>
          <div class="pd-qty-ctrl">
            <button class="pd-qty-btn" id="pdQtyMinus" onclick="pdChangeQty(-1)">−</button>
            <span class="pd-qty-val" id="pdQtyVal">1</span>
            <button class="pd-qty-btn" id="pdQtyPlus"  onclick="pdChangeQty(+1)">+</button>
          </div>
        </div>

        <!-- Add to cart -->
        <button class="pd-add-btn" id="pdAddBtn" onclick="pdAddToCart(${p.id})">
          Add to Cart
        </button>

        <!-- Perks -->
        <div class="pd-perks">
          <div class="pd-perk"><span class="pd-perk-icon">🚚</span> Free Shipping</div>
          <div class="pd-perk"><span class="pd-perk-icon">🔄</span> Easy Returns</div>
          <div class="pd-perk"><span class="pd-perk-icon">🔒</span> Secure Checkout</div>
          <div class="pd-perk"><span class="pd-perk-icon">✨</span> Premium Quality</div>
        </div>

        <!-- Back link -->
        <a href="index.html" class="pd-back">
          <span class="pd-back-arrow">←</span> Back to shop
        </a>

      </div>
    </div>
  `;

  /* ── Quantity logic ── */
  let qty = 1;

  window.pdChangeQty = function (delta) {
    qty = Math.max(1, Math.min(qty + delta, p.stock || 99));
    document.getElementById('pdQtyVal').textContent = qty;
  };

  window.pdAddToCart = function (productId) {
    const btn = document.getElementById('pdAddBtn');
    for (let i = 0; i < qty; i++) addToCart(productId);
    btn.textContent = `${qty > 1 ? qty + ' × ' : ''}Added ✓`;
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }, 2000);
  };
}

function capitalise(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

document.addEventListener('DOMContentLoaded', function () {
  renderProductDetail();
  if (typeof loadCart === 'function') loadCart();
  if (typeof initSearch === 'function') initSearch();
  if (typeof initAuth === 'function') initAuth();

  // effects.js IntersectionObserver ran before these elements existed,
  // so manually kick off the reveal with a stagger
  const revealEls = document.querySelectorAll(
    '#productDetail .reveal, #productDetail .reveal-left, #productDetail .reveal-right'
  );
  revealEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 80 + i * 160);
  });
});
