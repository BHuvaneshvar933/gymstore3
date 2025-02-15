// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('../middleware/verifyToken');

// POST /api/orders - Place a new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, totalPrice, address, paymentMethod, date } = req.body;
    // Use the username from the token; adjust if you use a different field.
    const user = req.user.username;
    const order = new Order({
      user,
      items,
      totalPrice,
      address,
      paymentMethod,
      date,
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders - Get orders for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = req.user.username;
    // Fetch orders only for this user.
    const orders = await Order.find({ user });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
