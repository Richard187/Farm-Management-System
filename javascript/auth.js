// Authentication JavaScript Functions

// Modal Functions
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('#loginEmail');
            if (firstInput) firstInput.focus();
        }, 100);
        // Attach tilt to modal content
        const card = modal.querySelector('.modal-content.auth-3d');
        if (card) attachTilt(card);
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Clear form
        const form = modal.querySelector('#loginForm');
        if (form) form.reset();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLoginModal();
    }
});

// Password Toggle Function
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Form Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    // Basic phone validation (allows various formats)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validateLoginField(value) {
    // Validate if it's an email, username, or phone
    const trimmedValue = value.trim();
    
    // Check if it's an email
    if (validateEmail(trimmedValue)) {
        return true;
    }
    
    // Check if it's a phone number
    if (validatePhone(trimmedValue)) {
        return true;
    }
    
    // Check if it's a username (alphanumeric, 3-20 characters, may include underscore or dash)
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (usernameRegex.test(trimmedValue)) {
        return true;
    }
    
    return false;
}

// Form Submission Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Basic validation for email, username, or phone
            if (!validateLoginField(email)) {
                showNotification('Please enter a valid email address, username, or phone number.', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters long.', 'error');
                return;
            }
            
            // Simulate login process
            showNotification('Signing you in...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Welcome back to AgriSmart Pro!', 'success');
                closeLoginModal();
                
                // In a real application, you would redirect to dashboard or update UI
                // window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
    
    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        // Attach tilt to signup card
        const card = document.querySelector('.auth-card.auth-3d');
        if (card) attachTilt(card);
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!validateSignupForm(data)) {
                return;
            }
            
            // Simulate signup process
            showNotification('Creating your account...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Account created successfully! Welcome to AgriSmart Pro!', 'success');
                
                // In a real application, you would redirect to login or dashboard
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }, 2000);
        });
    }
});

function validateSignupForm(data) {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'farmType', 'farmSize', 'password', 'confirmPassword'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`, 'error');
            return false;
        }
    }
    
    // Validate email
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Validate phone
    if (!validatePhone(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    // Validate password
    if (!validatePassword(data.password)) {
        showNotification('Password must be at least 8 characters with uppercase, lowercase, and number.', 'error');
        return false;
    }
    
    // Validate password confirmation
    if (data.password !== data.confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return false;
    }
    
    // Validate terms agreement
    const termsChecked = document.getElementById('terms').checked;
    if (!termsChecked) {
        showNotification('Please agree to the Terms of Service and Privacy Policy.', 'error');
        return false;
    }
    
    return true;
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Add notification styles to head if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 3000;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            padding: 0;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            border-left: 4px solid;
        }
        
        .notification-success .notification-content {
            border-left-color: var(--primary);
        }
        
        .notification-error .notification-content {
            border-left-color: var(--danger);
        }
        
        .notification-warning .notification-content {
            border-left-color: var(--warning);
        }
        
        .notification-info .notification-content {
            border-left-color: var(--info);
        }
        
        .notification-content i:first-child {
            font-size: 1.2rem;
        }
        
        .notification-success .notification-content i:first-child {
            color: var(--primary);
        }
        
        .notification-error .notification-content i:first-child {
            color: var(--danger);
        }
        
        .notification-warning .notification-content i:first-child {
            color: var(--warning);
        }
        
        .notification-info .notification-content i:first-child {
            color: var(--info);
        }
        
        .notification-content span {
            flex: 1;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--gray);
            padding: 4px;
            border-radius: 4px;
            transition: var(--transition);
        }
        
        .notification-close:hover {
            background: #f5f5f5;
            color: var(--dark);
        }
        
        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// 3D Tilt effect
function attachTilt(el) {
    const handleMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rotateX = (+dy * 6).toFixed(2);
        const rotateY = (-dx * 6).toFixed(2);
        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        el.style.boxShadow = `${-dx*10}px ${dy*10}px 30px rgba(0,0,0,0.25)`;
    };
    const reset = () => {
        el.style.transform = 'rotateX(0deg) rotateY(0deg)';
        el.style.boxShadow = '';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', reset);
}
