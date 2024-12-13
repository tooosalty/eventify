// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate elements on scroll
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));
}

// Animate navbar on scroll
function initNavbarAnimation() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.remove('navbar-shadow');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('navbar-hidden')) {
            navbar.classList.add('navbar-hidden');
        } else if (currentScroll < lastScroll && navbar.classList.contains('navbar-hidden')) {
            navbar.classList.remove('navbar-hidden');
        }

        navbar.classList.add('navbar-shadow');
        lastScroll = currentScroll;
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbarAnimation();
});