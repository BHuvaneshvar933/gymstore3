import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import PaymentOffers from '../components/PaymentOffers';
import { CreditCard, MapPin, ShoppingBag, CheckCircle, Wallet, Smartphone, ArrowLeft } from 'lucide-react';


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
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
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

   const paymentOptions = [
    { value: 'cash', label: 'Cash on Delivery', icon: Wallet },
    { value: 'upi', label: 'UPI', icon: Smartphone },
    { value: 'credit_card', label: 'Credit Card', icon: CreditCard },
    { value: 'debit_card', label: 'Debit Card', icon: CreditCard },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Cart</span>
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Checkout</h1>
          </div>
          <p className="text-neutral-400 text-lg">Complete your order</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-12 text-center">
            <ShoppingBag className="w-20 h-20 text-neutral-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty!</h2>
            <button
              onClick={() => navigate('/products')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-white">Shipping Address</h2>
                </div>
                <textarea
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your complete shipping address including street, city, state, and PIN code"
                  rows="5"
                  className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                />
                {error && (
                  <p className="mt-3 text-red-400 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    {error}
                  </p>
                )}
              </div>

              <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-white">Payment Method</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setPaymentMethod(option.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                          paymentMethod === option.value
                            ? 'border-orange-500 bg-orange-500/10'
                            : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${paymentMethod === option.value ? 'text-orange-500' : 'text-neutral-400'}`} />
                        <span className={`font-medium ${paymentMethod === option.value ? 'text-white' : 'text-neutral-300'}`}>
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <PaymentOffers paymentMethod={paymentMethod} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 sticky top-6">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 p-3 bg-neutral-800/40 rounded-lg">
                      <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-neutral-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-orange-400 font-semibold text-sm">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 border-t border-neutral-800 pt-6">
                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="text-white font-medium">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Shipping</span>
                    <span className="text-green-400 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Tax</span>
                    <span className="text-white font-medium">Included</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={cartItems.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  <CheckCircle className="w-6 h-6" />
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-neutral-900 border border-green-500 rounded-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Order Placed Successfully!</h2>
            <p className="text-neutral-400 mb-6">
              Thank you for your order. You will be redirected to your orders page.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
