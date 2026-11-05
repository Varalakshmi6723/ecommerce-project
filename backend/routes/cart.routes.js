const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Add product to cart
router.post('/add', authMiddleware, cartController.addToCart);

// Get logged-in user's cart
router.get('/', authMiddleware, cartController.getCart);

// Remove product from cart
router.delete('/:productId', authMiddleware, cartController.removeFromCart);

module.exports = router;