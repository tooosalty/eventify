import pool from '../config/db.config.js';
import bcrypt from 'bcryptjs';

export const UserModel = {
    // Create a new user
    async create(userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const [result] = await pool.execute(
                'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
                [userData.name, userData.email, hashedPassword]
            );
            return result.insertId;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },

    // Get user by ID
    async getById(userId) {
        try {
            const [rows] = await pool.execute(
                'SELECT user_id, name, email, created_at FROM Users WHERE user_id = ?',
                [userId]
            );
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    },

    // Get user by email
    async getByEmail(email) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM Users WHERE email = ?',
                [email]
            );
            return rows[0];
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    },

    // Update user
    async update(userId, userData) {
        try {
            const updates = [];
            const values = [];

            if (userData.name) {
                updates.push('name = ?');
                values.push(userData.name);
            }
            if (userData.email) {
                updates.push('email = ?');
                values.push(userData.email);
            }
            if (userData.password) {
                updates.push('password = ?');
                values.push(await bcrypt.hash(userData.password, 10));
            }

            values.push(userId);

            const [result] = await pool.execute(
                `UPDATE Users SET ${updates.join(', ')} WHERE user_id = ?`,
                values
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    },

    // Delete user
    async delete(userId) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM Users WHERE user_id = ?',
                [userId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
};