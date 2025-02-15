// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  // We'll store the username from the token.
  // In production, you might reference a User model.
  user: { type: String, required: true, unique: true },
  items: { type: Array, default: [] },
});

module.exports = mongoose.model('Cart', cartSchema);
