import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

// Handle authentication state changes
onAuthStateChanged(auth, (user) => {
    const loginLink = document.querySelector('.login-link');
    const profileLink = document.querySelector('.profile-link');
    const logoutBtn = document.querySelector('.logout-btn');

    if (user) {
        loginLink?.classList.add('hidden');
        profileLink?.classList.remove('hidden');
        logoutBtn?.classList.remove('hidden');
    } else {
        loginLink?.classList.remove('hidden');
        profileLink?.classList.add('hidden');
        logoutBtn?.classList.add('hidden');
    }
});

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
function updatePasswordStrength(password, strengthBar) {
    const strength = checkPasswordStrength(password);
    strengthBar.className = 'password-strength-bar';
    
    if (strength === 0) {
        strengthBar.style.width = '0';
    } else if (strength <= 2) {
        strengthBar.classList.add('strength-weak');
    } else if (strength === 3) {
        strengthBar.classList.add('strength-medium');
    } else {
        strengthBar.classList.add('strength-strong');
    }
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
loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(loginForm)) return;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = '/index.html';
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = error.message;
        loginForm.appendChild(errorMessage);
    }
});

// Register functionality
const registerForm = document.getElementById('registerForm');
registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(registerForm)) return;

    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.href = '/index.html';
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = error.message;
        registerForm.appendChild(errorMessage);
    }
});

// Password strength indicators
const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(input => {
    const strengthBar = input.parentElement.querySelector('.password-strength-bar');
    if (strengthBar) {
        input.addEventListener('input', () => {
            updatePasswordStrength(input.value, strengthBar);
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
    loginBox.style.animation = 'slideUpFade 0.6s ease forwards';
    loginBox.classList.add('hidden');
    registerBox.classList.remove('hidden');
    registerBox.style.animation = 'slideUpFade 0.6s ease forwards';
});

showLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    registerBox.style.animation = 'slideUpFade 0.6s ease forwards';
    registerBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
    loginBox.style.animation = 'slideUpFade 0.6s ease forwards';
});

// Logout functionality
const logoutBtn = document.querySelector('.logout-btn');
logoutBtn?.addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = '/index.html';
    } catch (error) {
        alert('Logout failed: ' + error.message);
    }
});