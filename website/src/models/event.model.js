import pool from '../config/db.config.js';

export const EventModel = {
    // Create a new event
    async create(eventData) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO Events (event_name, event_date, location, description) VALUES (?, ?, ?, ?)',
                [eventData.event_name, eventData.event_date, eventData.location, eventData.description]
            );
            return result.insertId;
        } catch (error) {
            throw new Error('Error creating event: ' + error.message);
        }
    },

    // Get all events
    async getAll() {
        try {
            const [rows] = await pool.execute('SELECT * FROM Events');
            return rows;
        } catch (error) {
            throw new Error('Error fetching events: ' + error.message);
        }
    },

    // Get event by ID
    async getById(eventId) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM Events WHERE event_id = ?',
                [eventId]
            );
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching event: ' + error.message);
        }
    },

    // Update event
    async update(eventId, eventData) {
        try {
            const [result] = await pool.execute(
                'UPDATE Events SET event_name = ?, event_date = ?, location = ?, description = ? WHERE event_id = ?',
                [eventData.event_name, eventData.event_date, eventData.location, eventData.description, eventId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating event: ' + error.message);
        }
    },

    // Delete event
    async delete(eventId) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM Events WHERE event_id = ?',
                [eventId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error deleting event: ' + error.message);
        }
    }
};