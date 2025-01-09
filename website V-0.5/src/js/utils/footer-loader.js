// Function to load footer into pages
async function loadFooter() {
    try {
        // Get the footer container or create one if it doesn't exist
        let footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            footerContainer = document.createElement('div');
            footerContainer.id = 'footer-container';
            document.body.appendChild(footerContainer);
        }

        // Fetch and insert the footer content
        const response = await fetch('/src/components/footer.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const footerHtml = await response.text();
        footerContainer.innerHTML = footerHtml;

        // Initialize footer animations
        const footerSections = document.querySelectorAll('.footer-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        footerSections.forEach(section => observer.observe(section));

        // Initialize newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        newsletterForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.newsletter-input').value;
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });

    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Export the loadFooter function
export { loadFooter };

// Load footer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}