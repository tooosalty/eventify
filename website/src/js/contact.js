// Form validation and submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
document.body.appendChild(successMessage);

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill out all required fields.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        // Submit form data to the backend
        const response = await fetch('/website/src/php/contact.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&subject=${encodeURIComponent(formData.subject)}&message=${encodeURIComponent(formData.message)}`,
        });

        if (response.ok) {
            const result = await response.json();
            successMessage.textContent = result.message || 'Thank you for your message! We will get back to you soon.';
            successMessage.classList.add('show');

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);

            // Reset form
            contactForm.reset();
        } else {
            const error = await response.json();
            alert(`Error: ${error.message || 'Failed to send message.'}`);
        }
    } catch (error) {
        alert('Failed to send message: ' + error.message);
    }
});

// Input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Animate contact items on scroll
const contactItems = document.querySelectorAll('.contact-item');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

contactItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    observer.observe(item);
});
