import pool from '../config/db.config.js';

export const TicketModel = {
    // Create a new ticket
    async create(ticketData) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO Tickets (event_id, user_id, status) VALUES (?, ?, ?)',
                [ticketData.event_id, ticketData.user_id, ticketData.status || 'available']
            );
            return result.insertId;
        } catch (error) {
            throw new Error('Error creating ticket: ' + error.message);
        }
    },

    // Get ticket by ID
    async getById(ticketId) {
        try {
            const [rows] = await pool.execute(
                'SELECT t.*, e.event_name, e.event_date, e.location FROM Tickets t ' +
                'JOIN Events e ON t.event_id = e.event_id ' +
                'WHERE t.ticket_id = ?',
                [ticketId]
            );
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching ticket: ' + error.message);
        }
    },

    // Get tickets by user ID
    async getByUserId(userId) {
        try {
            const [rows] = await pool.execute(
                'SELECT t.*, e.event_name, e.event_date, e.location FROM Tickets t ' +
                'JOIN Events e ON t.event_id = e.event_id ' +
                'WHERE t.user_id = ?',
                [userId]
            );
            return rows;
        } catch (error) {
            throw new Error('Error fetching user tickets: ' + error.message);
        }
    },

    // Update ticket status
    async updateStatus(ticketId, status) {
        try {
            const [result] = await pool.execute(
                'UPDATE Tickets SET status = ? WHERE ticket_id = ?',
                [status, ticketId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating ticket status: ' + error.message);
        }
    },

    // Delete ticket
    async delete(ticketId) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM Tickets WHERE ticket_id = ?',
                [ticketId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error deleting ticket: ' + error.message);
        }
    }
};