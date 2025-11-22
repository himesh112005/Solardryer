import express from 'express';
import { pool } from '../../server.js';

const router = express.Router();

// Get all published articles
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [articles] = await connection.query(
            'SELECT * FROM articles WHERE status = "published" ORDER BY created_date DESC'
        );
        connection.release();

        res.json({
            success: true,
            data: articles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching articles',
            error: error.message
        });
    }
});

// Create article
router.post('/', async (req, res) => {
    try {
        const { title, category, excerpt, content, author, image, status } = req.body;

        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO articles (title, category, excerpt, content, author, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, category, excerpt, content, author, image, status || 'draft']
        );
        connection.release();

        res.status(201).json({
            success: true,
            message: 'Article created successfully',
            articleId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating article',
            error: error.message
        });
    }
});

// Update article
router.put('/:id', async (req, res) => {
    try {
        const { title, category, excerpt, content, author, image, status } = req.body;

        const connection = await pool.getConnection();
        await connection.query(
            'UPDATE articles SET title = ?, category = ?, excerpt = ?, content = ?, author = ?, image = ?, status = ? WHERE id = ?',
            [title, category, excerpt, content, author, image, status, req.params.id]
        );
        connection.release();

        res.json({
            success: true,
            message: 'Article updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating article',
            error: error.message
        });
    }
});

// Delete article
router.delete('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
        connection.release();

        res.json({
            success: true,
            message: 'Article deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting article',
            error: error.message
        });
    }
});

export default router;
