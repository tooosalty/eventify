import pool from '../config/db.config.js';

export const PaymentModel = {
    // Create a new payment
    async create(paymentData) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO Payments (ticket_id, amount, status) VALUES (?, ?, ?)',
                [paymentData.ticket_id, paymentData.amount, paymentData.status || 'pending']
            );
            return result.insertId;
        } catch (error) {
            throw new Error('Error creating payment: ' + error.message);
        }
    },

    // Get payment by ID
    async getById(paymentId) {
        try {
            const [rows] = await pool.execute(
                'SELECT p.*, t.user_id, e.event_name FROM Payments p ' +
                'JOIN Tickets t ON p.ticket_id = t.ticket_id ' +
                'JOIN Events e ON t.event_id = e.event_id ' +
                'WHERE p.payment_id = ?',
                [paymentId]
            );
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching payment: ' + error.message);
        }
    },

    // Get payments by user ID
    async getByUserId(userId) {
        try {
            const [rows] = await pool.execute(
                'SELECT p.*, e.event_name FROM Payments p ' +
                'JOIN Tickets t ON p.ticket_id = t.ticket_id ' +
                'JOIN Events e ON t.event_id = e.event_id ' +
                'WHERE t.user_id = ?',
                [userId]
            );
            return rows;
        } catch (error) {
            throw new Error('Error fetching user payments: ' + error.message);
        }
    },

    // Update payment status
    async updateStatus(paymentId, status) {
        try {
            const [result] = await pool.execute(
                'UPDATE Payments SET status = ? WHERE payment_id = ?',
                [status, paymentId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating payment status: ' + error.message);
        }
    },

    // Delete payment
    async delete(paymentId) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM Payments WHERE payment_id = ?',
                [paymentId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error deleting payment: ' + error.message);
        }
    }
};