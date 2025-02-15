// Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setError('Please provide an address.');
      return;
    }

    const order = {
      totalPrice,
      address,
      paymentMethod,
      items: cartItems,
      date: new Date(),
    };

    try {
      await placeOrder(order);
      
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/orders');
      }, 2000);
    } catch (error) {
      setError('Failed to place order.');
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto bg-neutral-900 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Items in Cart</h3>
          {cartItems.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty!</p>
          ) : (
            <ul className="divide-y divide-gray-700">
              {cartItems.map((item) => (
                <li key={item._id} className="py-4 flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Total Price: ${totalPrice}</h3>
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Shipping Address:
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your shipping address"
            className="w-full bg-neutral-800 text-white p-3 rounded-lg focus:ring focus:ring-orange-400"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="paymentMethod" className="block text-sm font-medium mb-2">
            Payment Method:
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-neutral-800 text-white p-3 rounded-lg focus:ring focus:ring-orange-400"
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
          </select>
        </div>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
            className="bg-gradient-to-r from-orange-400 to-red-700 hover:from-orange-400 hover:to-red-600 transition text-white py-2 px-4 rounded-lg disabled:opacity-50"
          >
            Place Order
          </button>
        </div>
        {showSuccessMessage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white p-6 rounded-lg shadow-lg z-50">
            Order Placed Successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
