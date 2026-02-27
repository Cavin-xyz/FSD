// ─────────────────────────────────────────
// cart.js — Cart state & persistence
// Logged-in users: synced to backend API
// Guests: persisted via localStorage
// ─────────────────────────────────────────

const STORAGE_KEY = 'vaux_cart';

// In-memory cart state: { [productId]: { ...product, qty, cartItemId? } }
let cart = {};

// ── LOCAL STORAGE HELPERS (guest) ──────────

function _saveLocal() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function _loadLocal() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) cart = JSON.parse(saved);
  } catch { cart = {}; }
}

// ── BACKEND SYNC (logged-in users) ─────────

/** Load cart from backend into memory */
async function loadCartFromAPI() {
  try {
    const data = await apiGet('/cart');
    cart = {};
    (data.items || []).forEach(item => {
      cart[item.productId] = {
        id: item.productId,
        name: item.productName,
        emoji: item.emoji,
        price: item.price,
        qty: item.quantity,
        cartItemId: item.id,
      };
    });
  } catch (err) {
    console.warn('[Cart] Could not load cart from backend:', err.message);
  }
}

// ── PUBLIC API ─────────────────────────────

/** Load cart on page init */
async function loadCart() {
  if (isLoggedIn()) {
    await loadCartFromAPI();
  } else {
    _loadLocal();
  }
  renderCart();
  updateCartBadge();
}

/** Add one unit */
async function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (isLoggedIn()) {
    try {
      const item = await apiPost('/cart/add', { productId: id, quantity: 1 });
      cart[id] = {
        id: item.productId,
        name: item.productName,
        emoji: item.emoji,
        price: item.price,
        qty: item.quantity,
        cartItemId: item.id,
      };
    } catch (err) {
      showToast('❌ Could not add to cart: ' + err.message);
      return;
    }
  } else {
    if (cart[id]) {
      cart[id].qty += 1;
    } else {
      cart[id] = { ...product, qty: 1 };
    }
    _saveLocal();
  }

  renderCart();
  updateCartBadge();
  flashAddBtn(id);
  showToast(`${product.emoji} ${product.name} added to cart`);
  bumpCount();
}

/** Adjust quantity (+1 / -1) */
async function changeQty(id, delta) {
  if (!cart[id]) return;
  const newQty = cart[id].qty + delta;

  if (isLoggedIn()) {
    const cartItemId = cart[id].cartItemId;
    try {
      if (newQty <= 0) {
        await apiDelete(`/cart/${cartItemId}`);
        delete cart[id];
      } else {
        const item = await apiPut(`/cart/${cartItemId}`, { quantity: newQty });
        cart[id].qty = item.quantity;
      }
    } catch (err) {
      showToast('❌ ' + err.message);
      return;
    }
  } else {
    cart[id].qty += delta;
    if (cart[id].qty <= 0) delete cart[id];
    _saveLocal();
  }

  renderCart();
  updateCartBadge();
}

/** Remove item entirely */
async function removeItem(id) {
  if (!cart[id]) return;

  if (isLoggedIn()) {
    try {
      await apiDelete(`/cart/${cart[id].cartItemId}`);
    } catch (err) {
      showToast('❌ ' + err.message);
      return;
    }
  } else {
    _saveLocal();
  }

  delete cart[id];
  renderCart();
  updateCartBadge();
}

/** Total item count */
function getCartCount() {
  return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
}

/** Subtotal price */
function getSubtotal() {
  return Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);
}



