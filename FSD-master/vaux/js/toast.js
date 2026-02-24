// ─────────────────────────────────────────
// toast.js — Toast notification system
// ─────────────────────────────────────────

/** Display a toast message that auto-dismisses after 2.4s */
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span>${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2400);
}
