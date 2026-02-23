// ─────────────────────────────────────────
// app.js — Application entry point
// Initializes all modules on DOM ready
// ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadCart();      // cart.js  — restore persisted cart from localStorage
  renderProducts(); // products.js — populate the product grid
  initSearch();    // products.js — wire up search input listener
});
