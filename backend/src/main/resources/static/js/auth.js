// ─────────────────────────────────────────
// auth.js — Authentication state manager
// Handles JWT storage, login, register, logout
// ─────────────────────────────────────────

const AUTH_TOKEN_KEY = 'vaux_token';
const AUTH_USER_KEY = 'vaux_user';

/** Get stored JWT token (or null) */
function getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

/** Get stored user object (or null) */
function getUser() {
    try {
        const raw = localStorage.getItem(AUTH_USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

/** Returns true if a token exists */
function isLoggedIn() {
    return !!getToken();
}

/** Persist auth response from the backend */
function _storeAuth(authResponse) {
    localStorage.setItem(AUTH_TOKEN_KEY, authResponse.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify({
        id: authResponse.id,
        email: authResponse.email,
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
    }));
}

/** Login — calls POST /api/auth/login */
async function authLogin(email, password) {
    const res = await apiPost('/auth/login', { email, password });
    _storeAuth(res);
    return res;
}

/** Register — calls POST /api/auth/register */
async function authRegister(firstName, lastName, email, password) {
    const res = await apiPost('/auth/register', { firstName, lastName, email, password });
    _storeAuth(res);
    return res;
}

/** Logout — clears all stored auth data */
function authLogout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem('vaux_cart');  // clear local cart too
    window.location.href = 'login.html';
}

/** Update the header to show user or login button */
function initAuth() {
    const loginBtn = document.getElementById('headerLoginBtn');
    const userGreet = document.getElementById('headerUserGreet');
    const userName = document.getElementById('headerUserName');
    const logoutBtn = document.getElementById('headerLogoutBtn');

    if (!loginBtn) return; // not on a page with auth header

    if (isLoggedIn()) {
        const user = getUser();
        loginBtn.style.display = 'none';
        userGreet.style.display = 'flex';
        if (userName && user) userName.textContent = user.firstName;
    } else {
        loginBtn.style.display = '';
        userGreet.style.display = 'none';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', authLogout);
    }
}
