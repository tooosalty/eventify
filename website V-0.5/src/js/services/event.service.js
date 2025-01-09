// Event-related business logic
import { events } from '../data/events.js';

export const eventService = {
    getAllEvents: () => events,

    getEventById: (id) => events.find(event => event.id === id),

    getFeaturedEvents: (count = 3) => {
        return [...events]
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
    },

    getUpcomingEvents: (count = 5) => {
        const today = new Date();
        return events
            .filter(event => new Date(event.date) > today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, count);
    }
};