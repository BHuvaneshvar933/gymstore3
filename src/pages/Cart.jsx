import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const totalCost = Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;
  const itemCount = Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 p-6" id="cart">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Shopping Cart
            </h1>
          </div>
          <p className="text-neutral-400 text-lg">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {!cartItems || cartItems.length === 0 ? (
          <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-neutral-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty</h2>
              <p className="text-neutral-400 mb-6">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
              >
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-neutral-800 rounded-xl overflow-hidden flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white mb-2">{item.name}</h2>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-neutral-500">Category:</span>
                          <span className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-full text-xs text-orange-400 font-medium">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                          ₹{item.price}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-neutral-400 font-medium">Quantity:</span>
                          <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-3 py-2 hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="px-6 py-2 text-white font-semibold border-x border-neutral-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="px-3 py-2 hover:bg-neutral-700 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="font-medium">Remove</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-2">
                      <span className="text-sm text-neutral-500">Subtotal</span>
                      <p className="text-2xl font-bold text-white">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6 text-orange-500" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                    <span className="text-neutral-400">Subtotal ({itemCount} items)</span>
                    <span className="text-white font-semibold text-lg">₹{totalCost}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                    <span className="text-neutral-400">Shipping</span>
                    <span className="text-green-400 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                    <span className="text-neutral-400">Tax</span>
                    <span className="text-white font-semibold">Included</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                      ₹{totalCost}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate('/products')}
                  className="w-full mt-3 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-all duration-300 border border-neutral-700"
                >
                  Continue Shopping
                </button>
                <div className="mt-6 pt-6 border-t border-neutral-800">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-neutral-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Free shipping on all orders</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>30-day return policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;