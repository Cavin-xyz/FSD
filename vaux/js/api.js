// ─────────────────────────────────────────
// api.js — Central API service layer
// All backend communication goes through here
// ─────────────────────────────────────────

const API_BASE = 'http://localhost:8080/api';

/**
 * GET  /api/<path>
 * Returns parsed JSON or throws on error.
 */
async function apiGet(path) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json();
}

/**
 * POST /api/<path>
 * @param {string}  path   – e.g. '/auth/login'
 * @param {object}  body   – payload (will be JSON-stringified)
 * @param {string}  [token] – JWT, if needed
 */
async function apiPost(path, body, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `POST ${path} failed: ${res.status}`);
    }
    return res.json();
}

/**
 * DELETE /api/<path>
 * @param {string}  path
 * @param {string}  [token] – JWT, if needed
 */
async function apiDelete(path, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE', headers });
    if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
    return res.json();
}
