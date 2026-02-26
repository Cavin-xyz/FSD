/**
 * API Service - Frontend Integration
 * 
 * This file demonstrates how to connect your frontend (vaux project) 
 * to the Spring Boot backend
 */

const API_BASE_URL = 'http://localhost:8080/api';

// Store auth token
let authToken = localStorage.getItem('token');

// ============================================
// AUTHENTICATION
// ============================================

// Register new user
export async function register(email, password, firstName, lastName) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, lastName })
  });
  
  if (response.ok) {
    const data = await response.json();
    setToken(data.token);
    return data;
  }
  throw new Error('Registration failed');
}

// Login user
export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (response.ok) {
    const data = await response.json();
    setToken(data.token);
    return data;
  }
  throw new Error('Login failed');
}

// Logout
export function logout() {
  authToken = null;
  localStorage.removeItem('token');
}

function setToken(token) {
  authToken = token;
  localStorage.setItem('token', token);
}

// ============================================
// PRODUCTS
// ============================================

// Get all products
export async function getAllProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to fetch products');
}

// Get single product
export async function getProduct(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Product not found');
}

// Get products by category
export async function getProductsByCategory(category) {
  const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to fetch products');
}

// Search products
export async function searchProducts(name) {
  const response = await fetch(`${API_BASE_URL}/products/search?name=${name}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Search failed');
}

// ============================================
// CART
// ============================================

// Add to cart
export async function addToCart(productId, quantity = 1) {
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ productId, quantity })
  });
  
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to add to cart');
}

// Get cart
export async function getCart() {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to fetch cart');
}

// Update cart item quantity
export async function updateCartItem(itemId, quantity) {
  const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ quantity })
  });
  
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to update cart item');
}

// Remove from cart
export async function removeFromCart(itemId) {
  const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to remove from cart');
}

// Clear cart
export async function clearCart() {
  const response = await fetch(`${API_BASE_URL}/cart/clear`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to clear cart');
}

// ============================================
// EXAMPLE USAGE
// ============================================

/*
// In your app.js or main component:

import { 
  login, 
  getAllProducts, 
  addToCart, 
  getCart 
} from './api.js';

// On page load
async function initApp() {
  // Check if user is already logged in
  if (localStorage.getItem('token')) {
    const cart = await getCart();
    console.log('Cart loaded:', cart);
  }
}

// On login button click
async function handleLogin(email, password) {
  try {
    const user = await login(email, password);
    console.log('Logged in as:', user.email);
  } catch (error) {
    console.error(error.message);
  }
}

// On product click
async function handleAddToCart(productId) {
  try {
    await addToCart(productId, 1);
    const cart = await getCart();
    updateCartUI(cart);
  } catch (error) {
    console.error(error.message);
  }
}
*/
