import express from 'express';
import { pool } from '../../server.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [products] = await connection.query(
            'SELECT * FROM products WHERE status = "active" ORDER BY created_date DESC'
        );
        connection.release();

        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [products] = await connection.query(
            'SELECT * FROM products WHERE id = ?',
            [req.params.id]
        );
        connection.release();

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: products[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

// Create product
router.post('/', async (req, res) => {
    try {
        const { name, model_id, price, description, image, status } = req.body;

        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO products (name, model_id, price, description, image, status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, model_id, price, description, image, status || 'active']
        );
        connection.release();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            productId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    try {
        const { name, model_id, price, description, image, status } = req.body;

        const connection = await pool.getConnection();
        await connection.query(
            'UPDATE products SET name = ?, model_id = ?, price = ?, description = ?, image = ?, status = ? WHERE id = ?',
            [name, model_id, price, description, image, status, req.params.id]
        );
        connection.release();

        res.json({
            success: true,
            message: 'Product updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        connection.release();

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
});

export default router;
