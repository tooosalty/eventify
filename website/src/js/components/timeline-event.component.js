// Timeline event component
import { dateUtils } from '../utils/date.util.js';

export const createTimelineEvent = (event) => {
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
                    <span>🎫 ${Math.floor(Math.random() * 50) + 10} seats left</span>
                    <span>🏷️ ${event.category}</span>
                </div>
                <p class="timeline-description">${event.description.substring(0, 150)}...</p>
                <div class="timeline-actions">
                    <div class="timeline-price">$${event.price}</div>
                    <a href="/src/pages/event-details.html?id=${event.id}" class="view-details-button">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;
};