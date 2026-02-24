// ─────────────────────────────────────────
// cart.js — Cart state & localStorage persistence
// ─────────────────────────────────────────

const STORAGE_KEY = 'vaux_cart';

// In-memory cart state: { [productId]: { ...product, qty } }
let cart = {};

/** Load cart from localStorage into memory */
function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = {};
  }
  renderCart();
  updateCartBadge();
}

/** Persist current cart to localStorage */
function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/** Add one unit of a product (or create entry) */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { ...product, qty: 1 };
  }

  saveCart();
  renderCart();
  updateCartBadge();
  flashAddBtn(id);
  showToast(`${product.emoji} ${product.name} added to cart`);
  bumpCount();
}

/** Adjust quantity of an item; removes if reaches zero */
function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  saveCart();
  renderCart();
  updateCartBadge();
}

/** Remove an item entirely */
function removeItem(id) {
  delete cart[id];
  saveCart();
  renderCart();
  updateCartBadge();
}

/** Total item count across all lines */
function getCartCount() {
  return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
}

/** Subtotal price */
function getSubtotal() {
  return Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);
}
