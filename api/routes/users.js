import express from 'express';
import bcryptjs from 'bcryptjs';
import { pool } from '../../server.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [users] = await connection.query(
            'SELECT id, username, email, role, status, joined_date FROM users'
        );
        connection.release();

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

// Create user
router.post('/', async (req, res) => {
    try {
        const { username, email, password, role, status } = req.body;

        const hashedPassword = await bcryptjs.hash(password, 10);

        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO users (username, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
            [username, email, hashedPassword, role || 'user', status || 'active']
        );
        connection.release();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        const { username, email, role, status } = req.body;

        const connection = await pool.getConnection();
        await connection.query(
            'UPDATE users SET username = ?, email = ?, role = ?, status = ? WHERE id = ?',
            [username, email, role, status, req.params.id]
        );
        connection.release();

        res.json({
            success: true,
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        connection.release();

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
});

export default router;
