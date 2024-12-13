import { events } from './data/events.js';

// Display events
function displayEvents(eventsToShow) {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = eventsToShow.map(event => `
        <div class="event-card animate-fade-in">
            <img src="${event.image}" alt="${event.title}">
            <div class="event-info">
                <span class="category-tag">${event.category}</span>
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${new Date(event.date).toLocaleDateString()}</p>
                <p class="event-location">📍 ${event.location}</p>
                <p class="event-price">💰 $${event.price}</p>
                <a href="/src/pages/event-details.html?id=${event.id}" class="view-details">View Details</a>
            </div>
        </div>
    `).join('');
}

// Filter events
function initializeFilters() {
    const searchInput = document.getElementById('searchEvents');
    const categoryFilter = document.getElementById('categoryFilter');

    // Search functionality
    searchInput?.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
        displayEvents(filteredEvents);
    });

    // Category filter
    categoryFilter?.addEventListener('change', () => {
        const category = categoryFilter.value;
        const filteredEvents = category 
            ? events.filter(event => event.category === category)
            : events;
        displayEvents(filteredEvents);
    });
}

// Initialize events page
document.addEventListener('DOMContentLoaded', () => {
    displayEvents(events);
    initializeFilters();
});