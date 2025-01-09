// Animate footer sections on scroll
function initFooterAnimations() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation with delay based on index
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200); // 200ms delay between each section
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    footerSections.forEach(section => observer.observe(section));
}

// Handle newsletter form submission
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('.newsletter-input').value;
        
        // Here you would typically send this to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        form.reset();
    });
}

// Initialize footer functionality
document.addEventListener('DOMContentLoaded', () => {
    initFooterAnimations();
    initNewsletterForm();
});


