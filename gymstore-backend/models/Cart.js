const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  items: { type: Array, default: [] },
});

module.exports = mongoose.model('Cart', cartSchema);
