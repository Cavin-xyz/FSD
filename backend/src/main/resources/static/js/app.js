// ─────────────────────────────────────────
// app.js — Application entry point
// Initializes all modules on DOM ready
// ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  initAuth();            // auth.js  — show login btn or user greeting in header
  await loadCart();      // cart.js  — restore cart (from backend or localStorage)
  loadProductsFromAPI(); // products.js — fetch from backend (falls back to data.js)
  initSearch();          // products.js — wire up search input listener
});

