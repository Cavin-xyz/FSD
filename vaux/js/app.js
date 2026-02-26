// ─────────────────────────────────────────
// app.js — Application entry point
// Initializes all modules on DOM ready
// ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadCart();             // cart.js  — restore persisted cart from localStorage
  loadProductsFromAPI(); // products.js — fetch from backend (falls back to data.js)
  initSearch();          // products.js — wire up search input listener
});
