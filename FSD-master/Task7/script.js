// ============================================
// REUSABLE VALIDATION FUNCTIONS
// ============================================

// Validate name (minimum 2 characters, letters and spaces only)
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return {
        isValid: nameRegex.test(name),
        message: nameRegex.test(name) ? '' : 'Name must be 2-50 characters (letters only)'
    };
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
        isValid: emailRegex.test(email),
        message: emailRegex.test(email) ? '' : 'Please enter a valid email address'
    };
}

// Validate phone (supports multiple formats)
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)]{10,}$/;
    const digitCount = phone.replace(/\D/g, '').length;
    return {
        isValid: phoneRegex.test(phone) && digitCount >= 10,
        message: (phoneRegex.test(phone) && digitCount >= 10) ? '' : 'Phone must be at least 10 digits'
    };
}

// Validate text (minimum length)
function validateText(text, minLength = 10) {
    const isValid = text.trim().length >= minLength;
    return {
        isValid: isValid,
        message: isValid ? '' : `Must be at least ${minLength} characters`
    };
}

// Validate required field
function validateRequired(value) {
    const isValid = value.trim() !== '';
    return {
        isValid: isValid,
        message: isValid ? '' : 'This field is required'
    };
}


// ============================================
// EVENT TRACKING
// ============================================

let keypressCount = 0;
let hoverCount = 0;
let clickCount = 0;

function updateEventCounter(type) {
    if (type === 'keypress') {
        keypressCount++;
        document.getElementById('keypressCount').textContent = keypressCount;
        flashIndicator('keypressIndicator');
    } else if (type === 'hover') {
        hoverCount++;
        document.getElementById('hoverCount').textContent = hoverCount;
        flashIndicator('hoverIndicator');
    } else if (type === 'click') {
        clickCount++;
        document.getElementById('clickCount').textContent = clickCount;
        flashIndicator('clickIndicator');
    }
}

function flashIndicator(indicatorId) {
    const indicator = document.getElementById(indicatorId);
    indicator.classList.add('active');
    setTimeout(() => indicator.classList.remove('active'), 300);
}


// ============================================
// FIELD VALIDATION HANDLERS
// ============================================

// Name field validation
function handleNameInput(e) {
    updateEventCounter('keypress');
    const value = e.target.value;
    const result = validateName(value);
    
    updateFieldValidation('name', result, value);
    updateCharCounter('nameCounter', value, 50);
    updateFormSummary();
}

// Email field validation
function handleEmailInput(e) {
    updateEventCounter('keypress');
    const value = e.target.value;
    const result = validateEmail(value);
    
    updateFieldValidation('email', result, value);
    updateFormSummary();
}

// Phone field validation
function handlePhoneInput(e) {
    updateEventCounter('keypress');
    const value = e.target.value;
    const result = validatePhone(value);
    
    updateFieldValidation('phone', result, value);
    updateFormSummary();
}

// Comments field validation
function handleCommentsInput(e) {
    updateEventCounter('keypress');
    const value = e.target.value;
    const result = validateText(value, 10);
    
    updateFieldValidation('comments', result, value);
    updateCharCounter('commentsCounter', value, 500);
    updateFormSummary();
}

// Category field validation
function handleCategoryChange(e) {
    const value = e.target.value;
    const result = validateRequired(value);
    
    updateFieldValidation('category', result, value);
    updateFormSummary();
}

// Update field validation display
function updateFieldValidation(fieldName, result, value) {
    const field = document.getElementById(fieldName);
    const errorEl = document.getElementById(`${fieldName}Error`);
    const successEl = document.getElementById(`${fieldName}Success`);
    
    if (!value) {
        // Empty field
        field.classList.remove('valid', 'invalid');
        errorEl.classList.remove('show');
        successEl.classList.remove('show');
    } else if (result.isValid) {
        // Valid
        field.classList.add('valid');
        field.classList.remove('invalid');
        errorEl.classList.remove('show');
        successEl.classList.add('show');
    } else {
        // Invalid
        field.classList.add('invalid');
        field.classList.remove('valid');
        errorEl.textContent = result.message;
        errorEl.classList.add('show');
        successEl.classList.remove('show');
    }
}

// Update character counter
function updateCharCounter(counterId, value, maxLength) {
    const counter = document.getElementById(counterId);
    const length = value.length;
    counter.textContent = `${length}/${maxLength} characters`;
    
    if (length > maxLength * 0.9) {
        counter.style.color = '#e74c3c';
    } else {
        counter.style.color = '#999';
    }
}


// ============================================
// STAR RATING
// ============================================

let currentRating = 0;

function initStarRating() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        // Click event
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.rating);
            document.getElementById('rating').value = currentRating;
            updateStars(currentRating);
            updateRatingText(currentRating);
            updateFormSummary();
        });
        
        // Hover event
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            updateStars(rating);
        });
    });
    
    // Reset on mouse leave
    document.getElementById('starRating').addEventListener('mouseleave', function() {
        updateStars(currentRating);
    });
}

function updateStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.textContent = '★';
            star.classList.add('active');
        } else {
            star.textContent = '☆';
            star.classList.remove('active');
        }
    });
}

function updateRatingText(rating) {
    const texts = ['No rating', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    document.getElementById('ratingText').textContent = texts[rating] || texts[0];
}


// ============================================
// FORM SUMMARY
// ============================================

function updateFormSummary() {
    const fields = {
        name: validateName(document.getElementById('name').value),
        email: validateEmail(document.getElementById('email').value),
        phone: validatePhone(document.getElementById('phone').value),
        rating: { isValid: currentRating > 0 },
        category: validateRequired(document.getElementById('category').value),
        comments: validateText(document.getElementById('comments').value, 10)
    };
    
    Object.keys(fields).forEach(field => {
        const summaryItem = document.getElementById(`summary${field.charAt(0).toUpperCase() + field.slice(1)}`);
        summaryItem.classList.remove('valid', 'invalid', 'pending');
        
        const value = document.getElementById(field).value;
        if (field === 'rating') {
            if (currentRating > 0) {
                summaryItem.classList.add('valid');
            } else {
                summaryItem.classList.add('pending');
            }
        } else if (!value) {
            summaryItem.classList.add('pending');
        } else if (fields[field].isValid) {
            summaryItem.classList.add('valid');
        } else {
            summaryItem.classList.add('invalid');
        }
    });
}


// ============================================
// HOVER EFFECTS
// ============================================

function initHoverEffects() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('mouseenter', function() {
            updateEventCounter('hover');
        });
    });
}


// ============================================
// SUBMIT HANDLING (Double-Click)
// ============================================

let clickTimeout;
let isDoubleClick = false;

function handleSubmitClick(e) {
    updateEventCounter('click');
    
    if (clickTimeout) {
        // Double click detected
        clearTimeout(clickTimeout);
        isDoubleClick = true;
        handleDoubleClick();
    } else {
        // Single click - wait for potential double click
        clickTimeout = setTimeout(() => {
            if (!isDoubleClick) {
                handleSingleClick();
            }
            clickTimeout = null;
            isDoubleClick = false;
        }, 300);
    }
}

function handleSingleClick() {
    // Pulse animation
    document.getElementById('submitBtn').classList.add('pulse');
    setTimeout(() => {
        document.getElementById('submitBtn').classList.remove('pulse');
    }, 500);
    
    // Show hint
    const hint = document.querySelector('.submit-hint');
    hint.style.color = '#667eea';
    hint.style.fontWeight = 'bold';
    setTimeout(() => {
        hint.style.color = '#666';
        hint.style.fontWeight = 'normal';
    }, 1000);
}

function handleDoubleClick() {
    // Validate all fields
    const isValid = validateAllFields();
    
    if (isValid) {
        showConfirmationModal();
    } else {
        alert('⚠️ Please fill in all required fields correctly before submitting.');
    }
}

function validateAllFields() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const category = document.getElementById('category').value;
    const comments = document.getElementById('comments').value;
    
    return validateName(name).isValid &&
           validateEmail(email).isValid &&
           validatePhone(phone).isValid &&
           currentRating > 0 &&
           validateRequired(category).isValid &&
           validateText(comments, 10).isValid;
}


// ============================================
// CONFIRMATION MODAL
// ============================================

function showConfirmationModal() {
    const modal = document.getElementById('confirmModal');
    const previewContent = document.getElementById('previewContent');
    
    const formData = {
        'Name': document.getElementById('name').value,
        'Email': document.getElementById('email').value,
        'Phone': document.getElementById('phone').value,
        'Rating': `${'★'.repeat(currentRating)}${'☆'.repeat(5-currentRating)} (${currentRating}/5)`,
        'Category': document.getElementById('category').options[document.getElementById('category').selectedIndex].text,
        'Feedback': document.getElementById('comments').value,
        'Newsletter': document.getElementById('subscribe').checked ? 'Yes' : 'No'
    };
    
    previewContent.innerHTML = Object.entries(formData).map(([key, value]) => `
        <div class="data-row">
            <div class="data-label">${key}:</div>
            <div class="data-value">${value}</div>
        </div>
    `).join('');
    
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
}

function hideConfirmationModal() {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function confirmSubmission() {
    hideConfirmationModal();
    submitForm();
}

function submitForm() {
    const formData = {
        'Name': document.getElementById('name').value,
        'Email': document.getElementById('email').value,
        'Phone': document.getElementById('phone').value,
        'Rating': `${'★'.repeat(currentRating)}${'☆'.repeat(5-currentRating)} (${currentRating}/5)`,
        'Category': document.getElementById('category').options[document.getElementById('category').selectedIndex].text,
        'Feedback': document.getElementById('comments').value,
        'Newsletter Subscription': document.getElementById('subscribe').checked ? 'Yes' : 'No',
        'Submission Time': new Date().toLocaleString()
    };
    
    const submittedContent = document.getElementById('submittedContent');
    submittedContent.innerHTML = Object.entries(formData).map(([key, value]) => `
        <div class="data-row">
            <div class="data-label">${key}:</div>
            <div class="data-value">${value}</div>
        </div>
    `).join('');
    
    // Hide form, show submitted data
    document.querySelector('.form-section').style.display = 'none';
    document.querySelector('.validation-summary').style.display = 'none';
    document.getElementById('submittedData').classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    // Reset form
    document.getElementById('feedbackForm').reset();
    currentRating = 0;
    updateStars(0);
    updateRatingText(0);
    
    // Reset validation states
    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.classList.remove('valid', 'invalid');
    });
    
    document.querySelectorAll('.error-message, .success-message').forEach(el => {
        el.classList.remove('show');
    });
    
    // Reset counters
    keypressCount = 0;
    hoverCount = 0;
    clickCount = 0;
    document.getElementById('keypressCount').textContent = '0';
    document.getElementById('hoverCount').textContent = '0';
    document.getElementById('clickCount').textContent = '0';
    
    // Show form, hide submitted data
    document.querySelector('.form-section').style.display = 'block';
    document.querySelector('.validation-summary').style.display = 'block';
    document.getElementById('submittedData').classList.add('hidden');
    
    updateFormSummary();
    updateTransactionPreview();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize star rating
    initStarRating();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Attach input event listeners for real-time validation
    document.getElementById('name').addEventListener('input', handleNameInput);
    document.getElementById('email').addEventListener('input', handleEmailInput);
    document.getElementById('phone').addEventListener('input', handlePhoneInput);
    document.getElementById('comments').addEventListener('input', handleCommentsInput);
    document.getElementById('category').addEventListener('change', handleCategoryChange);
    
    // Submit button (double-click)
    document.getElementById('submitBtn').addEventListener('click', handleSubmitClick);
    
    // Modal buttons
    document.getElementById('confirmSubmit').addEventListener('click', confirmSubmission);
    document.getElementById('cancelSubmit').addEventListener('click', hideConfirmationModal);
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetForm);
    
    // Initialize form summary
    updateFormSummary();
});
