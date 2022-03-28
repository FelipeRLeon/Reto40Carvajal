import express from 'express';
import client from '../controllers/client';


const router = express.Router();

router.get('/allproducts', client.getProducts);

module.exports = router;