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
        const response = await fetch('/website/src/components/footer.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const footerHtml = await response.text();
        footerContainer.innerHTML = footerHtml;

        // Initialize footer animations
        const footerSections = document.querySelectorAll('.footer-section');
        if (footerSections.length > 0) {
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
        } else {
            console.warn('No footer sections found for animations.');
        }

        // Initialize newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('.newsletter-input').value;
                if (email) {
                    alert('Thank you for subscribing to our newsletter!');
                    newsletterForm.reset();
                } else {
                    alert('Please enter a valid email address.');
                }
            });
        } else {
            console.warn('Newsletter form not found in the footer.');
        }

    } catch (error) {
        console.error('Error loading footer:', error);
        let footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = '<p>Failed to load footer. Please try again later.</p>';
        }
    }
}

// Export the loadFooter function
export { loadFooter };

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);
