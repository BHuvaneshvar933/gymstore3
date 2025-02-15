// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // For simplicity, we'll store the username as a string.
  // In a production app, you might store a reference to a User model.
  user: { type: String, required: true },
  items: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
