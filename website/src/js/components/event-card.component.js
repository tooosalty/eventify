// Event card component
import { dateUtils } from '../utils/date.util.js';

export const createEventCard = (event) => {
    return `
        <div class="event-card">
            <div class="event-image-container">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-info">
                <span class="category-tag">${event.category}</span>
                <h3>${event.title}</h3>
                <p class="event-date">📅 ${dateUtils.formatDate(event.date)}</p>
                <p class="event-location">📍 ${event.location}</p>
                <p class="event-price">💰 $${event.price}</p>
                <a href="/src/pages/event-details.html?id=${event.id}" class="view-details-button">View Details</a>
            </div>
        </div>
    `;
};