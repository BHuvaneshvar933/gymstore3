const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const verifyToken = require('../middleware/verifyToken');

// GET /api/cart - Fetch the cart for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const username = req.user.username;
    let cart = await Cart.findOne({ user: username });
    if (!cart) {
      // If no cart exists, create an empty one for this user
      cart = await Cart.create({ user: username, items: [] });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/cart - Update the cart for the logged-in user
router.post('/', verifyToken, async (req, res) => {
  try {
    const username = req.user.username;
    const { items } = req.body; // Expect an array of items
    const cart = await Cart.findOneAndUpdate(
      { user: username },
      { items },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/cart - Clear the cart for the logged-in user
router.delete('/', verifyToken, async (req, res) => {
  try {
    const username = req.user.username;
    const cart = await Cart.findOneAndUpdate(
      { user: username },
      { items: [] },
      { new: true }
    );
    res.json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
