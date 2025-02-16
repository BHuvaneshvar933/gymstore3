import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  

  const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen p-6" id="cart">
      <div className="max-w-7xl mx-auto shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">
          Shopping <span className="bg-gradient-to-r from-orange-300 to-red-600 text-transparent bg-clip-text">Cart</span>
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-sm text-gray-500">Category: {item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-2 py-1 rounded"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-semibold">${item.price * item.quantity}</p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal:</p>
                  <p className="font-semibold">${totalCost}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping:</p>
                  <p className="font-semibold">Free</p>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total:</p>
                <p>${totalCost}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-orange-400 to-red-700 hover:from-orange-400 hover:to-red-600 transition text-white py-2 px-4 rounded mt-4"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
