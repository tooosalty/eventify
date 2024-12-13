import { events } from './data/events.js';
import { auth } from './firebase-config.js';
import { dateUtils } from '../utils/date.util.js';

function getEventDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        window.location.href = '/src/pages/events.html';
        return;
    }

    const event = events.find(e => e.id === eventId);
    if (!event) {
        window.location.href = '/src/pages/events.html';
        return;
    }

    displayEventDetails(event);
}

function displayEventDetails(event) {
    const detailsContainer = document.getElementById('eventDetails');
    if (!detailsContainer) return;

    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });

    detailsContainer.innerHTML = `
        <div class="event-header">
            <div class="event-image-container">
                <img src="${event.image}" alt="${event.title}" class="event-main-image">
                <div class="event-overlay"></div>
            </div>
            <div class="event-info">
                <span class="event-category">${event.category}</span>
                <h1>${event.title}</h1>
                <div class="event-meta">
                    <div class="meta-item">
                        <span class="meta-icon">📅</span>
                        <div class="meta-content">
                            <span class="meta-label">Date & Time</span>
                            <span class="meta-value">${formattedDate}</span>
                        </div>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">📍</span>
                        <div class="meta-content">
                            <span class="meta-label">Location</span>
                            <span class="meta-value">${event.location}</span>
                        </div>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">💰</span>
                        <div class="meta-content">
                            <span class="meta-label">Price</span>
                            <span class="meta-value">$${event.price}</span>
                        </div>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">🎫</span>
                        <div class="meta-content">
                            <span class="meta-label">Availability</span>
                            <span class="meta-value">${Math.floor(Math.random() * 50) + 10} seats left</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="event-content">
            <div class="event-description">
                <h2>About This Event</h2>
                <p>${event.description}</p>
                
                <div class="event-highlights">
                    <h3>Event Highlights</h3>
                    <ul class="highlights-list">
                        ${event.highlights.map(highlight => `
                            <li class="highlight-item">
                                <span class="highlight-icon">✨</span>
                                <span class="highlight-text">${highlight}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="event-location">
                    <h3>Venue Information</h3>
                    <div class="venue-details">
                        <div class="venue-map">
                            <img src="https://via.placeholder.com/600x300" alt="Venue Map" class="map-image">
                        </div>
                        <div class="venue-info">
                            <p><strong>Address:</strong> ${event.location}</p>
                            <p><strong>Parking:</strong> Available on-site</p>
                            <p><strong>Accessibility:</strong> Wheelchair accessible</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="event-sidebar">
                <div class="ticket-card">
                    <h3>Get Your Tickets</h3>
                    <div class="ticket-price">
                        <span class="price-amount">$${event.price}</span>
                        <span class="price-type">per person</span>
                    </div>
                    <div class="ticket-info">
                        <p>🎫 Limited seats available</p>
                        <p>📅 ${formattedDate}</p>
                        <p>⭐ Instant confirmation</p>
                    </div>
                    ${auth.currentUser 
                        ? `<a href="/src/pages/checkout.html?id=${event.id}" class="purchase-button">
                            <span>Purchase Tickets</span>
                            <span class="button-icon">→</span>
                          </a>`
                        : `<a href="/src/pages/login.html" class="login-prompt">
                            <span>Login to Purchase</span>
                            <span class="button-icon">→</span>
                          </a>`
                    }
                    <div class="secure-badge">
                        <span class="secure-icon">🔒</span>
                        <span>Secure checkout</span>
                    </div>
                </div>

                <div class="share-card">
                    <h3>Share This Event</h3>
                    <div class="share-buttons">
                        <button class="share-button facebook">
                            <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/facebook.svg" alt="Facebook">
                        </button>
                        <button class="share-button twitter">
                            <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/x.svg" alt="Twitter">
                        </button>
                        <button class="share-button linkedin">
                            <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/linkedin.svg" alt="LinkedIn">
                        </button>
                        <button class="share-button email">
                            <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/gmail.svg" alt="Email">
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="related-events">
            <h2>Similar Events You Might Like</h2>
            <div class="related-events-grid">
                ${getRelatedEvents(event).map(relatedEvent => `
                    <div class="related-event-card">
                        <img src="${relatedEvent.image}" alt="${relatedEvent.title}">
                        <div class="related-event-info">
                            <h3>${relatedEvent.title}</h3>
                            <p>📅 ${new Date(relatedEvent.date).toLocaleDateString()}</p>
                            <p>💰 $${relatedEvent.price}</p>
                            <a href="/src/pages/event-details.html?id=${relatedEvent.id}" class="view-details-button">View Details</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    initializeEventInteractions();
}

function getRelatedEvents(currentEvent) {
    return events
        .filter(event => 
            event.id !== currentEvent.id && 
            (event.category === currentEvent.category || 
             Math.abs(event.price - currentEvent.price) < 100)
        )
        .slice(0, 3);
}

function initializeEventInteractions() {
    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = window.location.href;
            const text = 'Check out this amazing event!';
            
            if (button.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
            } else if (button.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
            } else if (button.classList.contains('linkedin')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
            } else if (button.classList.contains('email')) {
                window.location.href = `mailto:?subject=${text}&body=${url}`;
            }
        });
    });

    // Animate highlights on scroll
    const highlights = document.querySelectorAll('.highlight-item');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 100);
                }
            });
        },
        { threshold: 0.2 }
    );

    highlights.forEach(highlight => observer.observe(highlight));
}

// Initialize event details page
document.addEventListener('DOMContentLoaded', getEventDetails);
