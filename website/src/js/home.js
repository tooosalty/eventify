import { events } from './data/events.js';

// Helper function to generate random number of seats
function getRandomSeats() {
    return Math.floor(Math.random() * 50) + 10;
}

// Display featured events
function displayFeaturedEvents() {
    const featuredContainer = document.getElementById('featuredEvents');
    if (!featuredContainer) return;

    // Select 3 random events to feature
    const shuffled = [...events].sort(() => 0.5 - Math.random());
    const featuredEvents = shuffled.slice(0, 3);

    featuredContainer.innerHTML = featuredEvents.map(event => `
        <div class="event-card">
            <div class="event-image-container">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-info">
                <span class="category-tag">${event.category}</span>
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${new Date(event.date).toLocaleDateString()}</p>
                <p class="event-location">📍 ${event.location}</p>
                <p class="event-price">💰 $${event.price}</p>
                <a href="/website/src/pages/event-details.html?id=${event.id}" class="view-details-button">View Details</a>
            </div>
        </div>
    `).join('');
}

// Display upcoming events timeline
function displayUpcomingEvents() {
    const upcomingEventsContainer = document.getElementById('upcomingEvents');
    if (!upcomingEventsContainer) return;

    // Select specific events we want to display
    const selectedEvents = [
        events.find(e => e.id === 'tech-summit-2024'),
        events.find(e => e.id === 'summer-music-festival'),
        events.find(e => e.id === 'digital-art-expo'),
        events.find(e => e.id === 'championship-finals'),
        events.find(e => e.id === 'ai-conference')
    ].filter(Boolean);

    upcomingEventsContainer.innerHTML = selectedEvents.map(event => {
        const eventDate = new Date(event.date);
        return `
            <div class="timeline-event">
                <div class="timeline-date">
                    <div class="day">${eventDate.getDate()}</div>
                    <div class="month">${eventDate.toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div class="timeline-content">
                    <h3>${event.title}</h3>
                    <div class="timeline-meta">
                        <span>📍 ${event.location}</span>
                        <span>🎫 ${getRandomSeats()} seats left</span>
                        <span>🏷️ ${event.category}</span>
                    </div>
                    <p class="timeline-description">${event.description.substring(0, 150)}...</p>
                    <div class="timeline-actions">
                        <div class="timeline-price">$${event.price}</div>
                        <a href="/website/src/pages/event-details.html?id=${event.id}" class="view-details-button">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add animation class to timeline events with staggered delay
    document.querySelectorAll('.timeline-event').forEach((event, index) => {
        setTimeout(() => {
            event.classList.add('animate');
        }, index * 200);
    });
}

// Handle hero slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    prevButton?.addEventListener('click', () => showSlide(currentSlide - 1));
    nextButton?.addEventListener('click', () => showSlide(currentSlide + 1));

    // Auto-advance slides every 5 seconds
    setInterval(() => showSlide(currentSlide + 1), 5000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedEvents();
    displayUpcomingEvents();
    initHeroSlider();
});