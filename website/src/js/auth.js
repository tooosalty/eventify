// Handle authentication state changes
function updateAuthUI(isLoggedIn) {
    const loginLink = document.querySelector('.login-link');
    const profileLink = document.querySelector('.profile-link');
    const logoutBtn = document.querySelector('.logout-btn');

    if (isLoggedIn) {
        loginLink?.classList.add('hidden');
        profileLink?.classList.remove('hidden');
        logoutBtn?.classList.remove('hidden');
    } else {
        loginLink?.classList.remove('hidden');
        profileLink?.classList.add('hidden');
        logoutBtn?.classList.add('hidden');
    }
}

// Check authentication state
async function checkAuthState() {
    try {
        const response = await fetch('/website/src/php/check_session.php');
        const data = await response.json();
        updateAuthUI(data.loggedIn);

        if (data.loggedIn) {
            console.log('User is logged in:', data.user);
        } else {
            console.log('User is not logged in');
        }
    } catch (error) {
        console.error('Failed to check auth state:', error);
    }
}

// Call on page load
checkAuthState();


// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
}

// Update password strength indicator
function updatePasswordStrength(password, strengthBar, feedbackElement) {
    const strength = checkPasswordStrength(password);
    const feedback = ['Weak', 'Moderate', 'Strong', 'Very Strong'];
    strengthBar.style.width = `${(strength / 4) * 100}%`;
    feedbackElement.textContent = feedback[strength - 1] || 'Too Short';
}

// Form validation
function validateForm(form) {
    let isValid = true;
    form.querySelectorAll('.form-group').forEach(group => {
        const input = group.querySelector('input');
        const errorMessage = group.querySelector('.error-message');

        if (errorMessage) {
            errorMessage.remove();
        }

        group.classList.remove('error', 'success');

        if (!input.value) {
            group.classList.add('error');
            const message = document.createElement('span');
            message.className = 'error-message';
            message.textContent = 'This field is required';
            group.appendChild(message);
            isValid = false;
        } else if (input.type === 'email' && !input.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            group.classList.add('error');
            const message = document.createElement('span');
            message.className = 'error-message';
            message.textContent = 'Please enter a valid email address';
            group.appendChild(message);
            isValid = false;
        } else if (input.type === 'password' && input.value.length < 8) {
            group.classList.add('error');
            const message = document.createElement('span');
            message.className = 'error-message';
            message.textContent = 'Password must be at least 8 characters long';
            group.appendChild(message);
            isValid = false;
        } else {
            group.classList.add('success');
        }
    });
    return isValid;
}

// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Email and password are required.');
            return;
        }

        try {
            const response = await fetch('/website/src/php/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Redirecting to:', result.redirect);
                window.location.href = result.redirect || '/website/src/pages/dashboard.html';
            } else {
                alert(result.error || 'Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    });
}

// Register functionality
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value.trim();

        if (!validateForm(registerForm)) return;

        try {
            const response = await fetch('/website/src/php/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Show success message
                window.location.href = '/website/src/pages/login.html'; // Redirect to login page
            } else {
                alert(`Error: ${result.error}`); // Show error message
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    });
}

// Password strength indicators
const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(input => {
    const strengthBar = input.parentElement.querySelector('.password-strength-bar');
    const feedbackElement = input.parentElement.querySelector('.strength-feedback');
    if (strengthBar && feedbackElement) {
        input.addEventListener('input', () => {
            updatePasswordStrength(input.value, strengthBar, feedbackElement);
        });
    }
});

// Toggle between login and register forms
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const loginBox = document.querySelector('.auth-box');
const registerBox = document.getElementById('registerBox');

showRegister?.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.classList.add('hidden');
    registerBox.classList.remove('hidden');
});

showLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
});

// Logout functionality
const logoutBtn = document.querySelector('.logout-btn');
logoutBtn?.addEventListener('click', async () => {
    if (confirm('Are you sure you want to log out?')) {
        try {
            await fetch('/website/src/php/logout.php', { method: 'POST' });
            window.location.href = '/index.html';
        } catch (error) {
            alert('Logout failed: ' + error.message);
        }
    }
});

// Check authentication state on page load
checkAuthState();
