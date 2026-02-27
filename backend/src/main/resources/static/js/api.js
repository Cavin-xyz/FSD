// ─────────────────────────────────────────
// api.js — Central API service layer
// All backend communication goes through here
// ─────────────────────────────────────────

const API_BASE = '/api';

/** Build auth headers — attaches JWT if one is stored */
function _authHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = typeof getToken === 'function' ? getToken() : null;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
}

/** GET /api/<path> */
async function apiGet(path) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'GET',
        headers: _authHeaders(),
    });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json();
}

/** POST /api/<path> with JSON body */
async function apiPost(path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: _authHeaders(),
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `POST ${path} failed: ${res.status}`);
    }
    return res.json();
}

/** PUT /api/<path> with JSON body */
async function apiPut(path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'PUT',
        headers: _authHeaders(),
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `PUT ${path} failed: ${res.status}`);
    }
    return res.json();
}

/** DELETE /api/<path> */
async function apiDelete(path) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'DELETE',
        headers: _authHeaders(),
    });
    if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
    return res.json();
}
