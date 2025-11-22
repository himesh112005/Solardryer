import express from 'express';
import { pool } from '../../server.js';

const router = express.Router();

// Get settings
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [settings] = await connection.query('SELECT * FROM settings LIMIT 1');
        connection.release();

        if (settings.length === 0) {
            return res.json({ success: true, data: {} });
        }

        res.json({
            success: true,
            data: settings[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching settings',
            error: error.message
        });
    }
});

// Update settings
router.put('/', async (req, res) => {
    try {
        const { site_name, site_email, site_phone, site_address, theme, maintenance_mode } = req.body;

        const connection = await pool.getConnection();
        await connection.query(
            'UPDATE settings SET site_name = ?, site_email = ?, site_phone = ?, site_address = ?, theme = ?, maintenance_mode = ?',
            [site_name, site_email, site_phone, site_address, theme, maintenance_mode]
        );
        connection.release();

        res.json({
            success: true,
            message: 'Settings updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating settings',
            error: error.message
        });
    }
});

export default router;
