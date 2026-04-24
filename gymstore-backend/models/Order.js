const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  user: { type: String, required: true },
  items: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
