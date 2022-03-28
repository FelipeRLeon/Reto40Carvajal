import pool from '../database/keys';

const client = {};

client.getProducts = async (req, res) => {
    try {
        const products = await ( await pool.query('SELECT * FROM product')).rows;
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred.',
            error
        });
    }
}

module.exports = client;