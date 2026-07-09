// Get form elements
const form = document.getElementById('contactForm');
const previewBtn = document.getElementById('previewBtn');
const closePreviewBtn = document.getElementById('closePreviewBtn');
const previewSection = document.getElementById('previewSection');
const previewContent = document.getElementById('previewContent');
const errorMessages = document.getElementById('errorMessages');

// Preview button click event
previewBtn.addEventListener('click', function() {
    if (validateForm()) {
        displayPreview();
        previewSection.classList.remove('hidden');
    }
});

// Close preview button
closePreviewBtn.addEventListener('click', function() {
    previewSection.classList.add('hidden');
});

// Form submit event
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        alert('Form submitted successfully!');
        // In real scenario, form would submit to server
        // form.submit();
    }
});

// Validation function
function validateForm() {
    const errors = [];
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const contactMethod = document.querySelector('input[name="contact-method"]:checked');
    const inquiryType = document.getElementById('inquiry-type').value;
    
    // Validation 1: Check if all text fields are filled
    if (name === '') {
        errors.push('Name is required');
    }
    
    if (email === '') {
        errors.push('Email is required');
    }
    
    if (phone === '') {
        errors.push('Phone number is required');
    }
    
    if (message === '') {
        errors.push('Message is required');
    }
    
    // Validation 2: Check email format
    if (email !== '' && !isValidEmail(email)) {
        errors.push('Email format is invalid (example: user@gmail.com)');
    }
    
    // Validation 3: Check phone number (10 digits only)
    if (phone !== '' && !isValidPhone(phone)) {
        errors.push('Phone number must contain exactly 10 digits');
    }
    
    // Check other required fields
    if (!contactMethod) {
        errors.push('Please select a preferred contact method');
    }
    
    if (inquiryType === '') {
        errors.push('Please select an inquiry type');
    }
    
    // Display errors or clear them
    if (errors.length > 0) {
        displayErrors(errors);
        return false;
    } else {
        errorMessages.classList.remove('show');
        return true;
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone number validation function (10 digits only)
function isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

// Display error messages
function displayErrors(errors) {
    errorMessages.innerHTML = '<strong>Please fix the following errors:</strong><ul>';
    
    errors.forEach(error => {
        errorMessages.innerHTML += `<li>${error}</li>`;
    });
    
    errorMessages.innerHTML += '</ul>';
    errorMessages.classList.add('show');
}

// Display preview
function displayPreview() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const contactMethod = document.querySelector('input[name="contact-method"]:checked').value;
    const inquiryType = document.getElementById('inquiry-type').value;
    
    previewContent.innerHTML = `
        <div class="preview-item">
            <strong>Name:</strong> ${name}
        </div>
        <div class="preview-item">
            <strong>Email:</strong> ${email}
        </div>
        <div class="preview-item">
            <strong>Phone:</strong> ${phone}
        </div>
        <div class="preview-item">
            <strong>Message:</strong> ${message}
        </div>
        <div class="preview-item">
            <strong>Preferred Contact Method:</strong> ${contactMethod}
        </div>
        <div class="preview-item">
            <strong>Inquiry Type:</strong> ${inquiryType}
        </div>
    `;
}