// ─────────────────────────────────────────
// product.js — Render product detail page
// ─────────────────────────────────────────

/** Read a query param from the URL */
function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/** Build star string */
function buildStars(rating) {
  const full  = Math.floor(rating);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}

/** Render the product detail into #productDetail */
function renderProductDetail() {
  const id = parseInt(getParam('id'), 10);
  const mount = document.getElementById('productDetail');
  if (!id || !mount) return;

  const p = products.find(x => x.id === id);
  if (!p) {
    mount.innerHTML = '<p>Product not found. <a href="index.html">Back to shop</a></p>';
    return;
  }

  mount.innerHTML = `
    <div style="display:flex; gap:40px; align-items:flex-start;">
      <div style="flex:0 0 260px; text-align:center; font-size:96px">${p.emoji}</div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:start; gap:20px;">
          <div>
            <h1 style="margin:0 0 8px">${p.name}</h1>
            <div style="color:var(--muted); margin-bottom:12px">${p.category} · <span class="stars">${buildStars(p.rating)}</span> <span style="color:var(--muted)">(${p.reviews} reviews)</span></div>
            <div style="font-size:24px; margin-bottom:12px">
              <strong>$${p.price}</strong>
              ${p.originalPrice ? `<span class="price-old" style="margin-left:12px">$${p.originalPrice}</span>` : ''}
            </div>
            ${p.badge ? `<div class="badge ${p.badge}" style="display:inline-block; margin-bottom:12px">${p.badge === 'sale' ? 'Sale' : (p.badge==='new'?'New':p.badge)}</div>` : ''}
            <p style="color:var(--muted); max-width:640px">A thoughtfully crafted product combining quality materials and timeless design. Each piece is inspected and prepared for long-term use.</p>
          </div>
          <div style="flex:0 0 220px; text-align:right">
            <button class="add-btn" onclick="addToCart(${p.id})" style="width:100%">Add to cart</button>
            <div style="margin-top:12px; font-size:13px; color:var(--muted)">Free shipping · Easy returns</div>
          </div>
        </div>

        <section style="margin-top:28px">
          <h3>Details</h3>
          <ul>
            <li>Premium materials and construction</li>
            <li>Dimensions and care instructions available on request</li>
            <li>Made with attention to ethical sourcing</li>
          </ul>
        </section>

      </div>
    </div>
    <div style="margin-top:28px"><a href="index.html">← Back to shop</a></div>
  `;
}

document.addEventListener('DOMContentLoaded', function () {
  renderProductDetail();
  // initialize cart UI & search wiring (if present on page)
  if (typeof loadCart === 'function') loadCart();
  if (typeof initSearch === 'function') initSearch();
});
