// Dummy Database - Simulating user data
const userDatabase = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        password: "Admin@123",
        role: "admin"
    },
    {
        id: 2,
        name: "John Doe",
        email: "user@example.com",
        password: "User@123",
        role: "user"
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice.j@university.edu",
        password: "Alice@2024",
        role: "student"
    },
    {
        id: 4,
        name: "Bob Smith",
        email: "bob.smith@company.com",
        password: "Bob@2024",
        role: "employee"
    }
];

// Form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginBtn = document.getElementById('loginBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const closeAlertBtn = document.getElementById('closeAlertBtn');

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 6 characters, one uppercase, one lowercase, one number or special char
    return password.length >= 6;
}

// Clear error for specific field
function clearError(field) {
    if (field === 'email') {
        emailError.textContent = '';
        emailInput.classList.remove('input-error');
    } else if (field === 'password') {
        passwordError.textContent = '';
        passwordInput.classList.remove('input-error');
    }
}

// Show error for specific field
function showError(field, message) {
    if (field === 'email') {
        emailError.textContent = message;
        emailInput.classList.add('input-error');
    } else if (field === 'password') {
        passwordError.textContent = message;
        passwordInput.classList.add('input-error');
    }
}

// Real-time validation
emailInput.addEventListener('input', function() {
    clearError('email');
    if (this.value && !validateEmail(this.value)) {
        showError('email', 'Please enter a valid email address');
    }
});

passwordInput.addEventListener('input', function() {
    clearError('password');
    if (this.value && !validatePassword(this.value)) {
        showError('password', 'Password must be at least 6 characters');
    }
});

// Toggle password visibility button event listener
togglePasswordBtn.addEventListener('click', togglePassword);

// Close alert button event listener
closeAlertBtn.addEventListener('click', closeAlert);

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// Show alert message
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    
    alertBox.className = `alert ${type}`;
    alertMessage.textContent = message;
    
    setTimeout(() => {
        alertBox.classList.add('show');
    }, 100);
}

// Close alert
function closeAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.classList.remove('show');
    setTimeout(() => {
        alertBox.className = 'alert hidden';
    }, 300);
}

// Authenticate user
function authenticateUser(email, password) {
    return userDatabase.find(
        user => user.email === email && user.password === password
    );
}

// Show loading state
function showLoading() {
    loginBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.classList.remove('hidden');
}

// Hide loading state
function hideLoading() {
    loginBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.classList.add('hidden');
}

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearError('email');
    clearError('password');
    closeAlert();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;

    // Validate email
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError('password', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('password', 'Password must be at least 6 characters');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Show loading state
    showLoading();

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Authenticate user
    const user = authenticateUser(email, password);

    hideLoading();

    if (user) {
        // Success
        showAlert(`✅ Login successful! Welcome back, ${user.name}`, 'success');
        
        // Store user info
        if (document.getElementById('rememberMe').checked) {
            localStorage.setItem('rememberedEmail', email);
        }

        // Redirect after 2 seconds (simulate)
        setTimeout(() => {
            showAlert(`🚀 Redirecting to ${user.role} dashboard...`, 'success');
            // In real app: window.location.href = '/dashboard';
        }, 2000);
    } else {
        // Failure
        showAlert('❌ Invalid email or password. Please try again.', 'error');
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Load remembered email on page load
window.addEventListener('DOMContentLoaded', function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
});

// Forgot password link
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    showAlert('🔗 Password reset link would be sent to your email.', 'info');
});

// Sign up link
document.querySelector('.signup-link a').addEventListener('click', function(e) {
    e.preventDefault();
    showAlert('📝 Redirecting to sign up page...', 'info');
});
