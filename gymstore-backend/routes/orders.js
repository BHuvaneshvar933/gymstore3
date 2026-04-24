const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('../middleware/verifyToken');
const sendEmail = require('../utils/sendEmail'); // Import the email utility

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

    // Send order confirmation email
    const emailMessage = `
      <h1>Order Confirmation</h1>
      <p>Dear ${req.user.username},</p>
      <p>Thank you for your order from GymStore!</p>
      <p>Your order #${savedOrder._id} has been successfully placed and will be shipped to ${address}.</p>
      <h2>Order Details:</h2>
      <ul>
        ${items.map(item => `<li>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</li>`).join('')}
      </ul>
      <p>Total Price: ₹${totalPrice}</p>
      <p>Payment Method: ${paymentMethod}</p>
      <p>Order Date: ${new Date(date).toLocaleDateString()}</p>
      <p>We will notify you once your order has been shipped.</p>
      <p>Best regards,</p>
      <p>The GymStore Team</p>
    `;

    try {
      await sendEmail({
        email: req.user.email,
        subject: 'GymStore Order Confirmation',
        message: emailMessage,
      });
      console.log('Order confirmation email sent successfully.');
    } catch (emailError) {
      console.error('Error sending order confirmation email:', emailError);
      // Optionally, handle email sending failure without failing the order
    }

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
