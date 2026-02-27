// ─────────────────────────────────────────
// cartUI.js — Cart sidebar render & toggle
// ─────────────────────────────────────────

/** Re-render the cart sidebar contents */
function renderCart() {
  const items = Object.values(cart);
  const cartItemsEl = document.getElementById('cartItems');
  const cartFoot = document.getElementById('cartFoot');

  if (items.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛍️</div>
        <p>Your cart is empty.<br>Browse the collection and add something beautiful.</p>
      </div>`;
    cartFoot.style.display = 'none';
    return;
  }

  cartItemsEl.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="ci-img">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">₹${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="ci-controls">
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');

  const subtotal = getSubtotal();
  cartFoot.style.display = 'flex';
  document.getElementById('cartSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById('cartTotal').textContent = `₹${subtotal.toFixed(2)}`;
}

/** Update header cart badge count */
function updateCartBadge() {
  document.getElementById('cartCount').textContent = getCartCount();
}

/** Animate the count badge when item is added */
function bumpCount() {
  const el = document.getElementById('cartCount');
  el.classList.remove('bump');
  void el.offsetWidth; // force reflow to restart animation
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 400);
}

/** Open / close cart sidebar */
function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
