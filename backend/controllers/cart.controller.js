const Cart = require('../models/cart.model');

// ADD PRODUCT TO CART
exports.addToCart = async (req, res) => {
  try {
    console.log("CART REQUEST BODY:", req.body);
    const userId = req.user.id || req.user._id;

    const { productId, name, price, image } = req.body;

    if (!productId || !name || price == null || !image) {
      return res.status(400).json({
        message: 'All product details are required'
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: []
      });
    }

    const existingProduct = cart.products.find(
      (item) => item.productId === String(productId)
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        productId: String(productId),
        name,
        price,
        image,
        quantity: 1
      });
    }

    await cart.save();

    res.status(200).json({
      message: 'Product added to cart successfully',
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error adding product to cart',
      error: error.message
    });
  }
};


// GET USER CART
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const cart = await Cart.findOne({ userId });

    res.status(200).json({
      message: 'Cart fetched successfully',
      cart: cart || { products: [] }
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching cart',
      error: error.message
    });
  }
};


// REMOVE PRODUCT FROM CART
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    cart.products = cart.products.filter(
      (item) => item.productId !== String(productId)
    );

    await cart.save();

    res.status(200).json({
      message: 'Product removed from cart',
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error removing product',
      error: error.message
    });
  }
};