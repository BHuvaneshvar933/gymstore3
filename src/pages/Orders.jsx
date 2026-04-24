import React, { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { getBaseUrl } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Package, ChevronDown, ChevronUp, MapPin, CreditCard, Calendar, ShoppingBag, Box } from 'lucide-react';

const Orders = () => {
  const { orders, fetchOrders } = useOrder();
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState({});

  const sortedOrders = Array.isArray(orders) ? orders.slice().sort((a, b) => new Date(b.date) - new Date(a.date)) : [];

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  const handleShowMore = (orderId) => {
    setShowAllProducts((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const handleToggleDetails = (orderId) => {
    setExpandedOrder((prevState) => (prevState === orderId ? null : orderId));
  };

  const getStatusColor = (date) => {
    const orderDate = new Date(date);
    const daysSinceOrder = Math.floor((new Date() - orderDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceOrder < 2) return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    if (daysSinceOrder < 5) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-green-400 bg-green-500/10 border-green-500/30';
  };

   const getStatusText = (date) => {
    const orderDate = new Date(date);
    const daysSinceOrder = Math.floor((new Date() - orderDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceOrder < 2) return 'Processing';
    if (daysSinceOrder < 5) return 'In Transit';
    return 'Delivered';
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Your Orders
            </h1>
          </div>
          <p className="text-neutral-400 text-lg">
            Track and manage your order history
          </p>
        </div>

        {sortedOrders.length > 0 ? (
          <div className="space-y-5">
            {sortedOrders.map((order) => {
              const orderId = order._id || order.id;
              const isExpanded = expandedOrder === orderId;
              
              return (
                <div
                  key={orderId}
                  className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left Section - Images & Info */}
                      <div className="flex flex-col md:flex-row gap-6 flex-1">
                        
                        {/* Product Images Preview */}
                        <div className="flex items-center gap-2">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div
                              key={index}
                              className="w-20 h-20 bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 flex items-center justify-center"
                              style={{ zIndex: 3 - index }}
                            >
                              <img
                                src={item.image.startsWith('http') ? item.image : `${getBaseUrl()}${item.image}`}
                                alt={item.name}
                                className="w-full h-full object-contain p-1"
                              />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-20 h-20 bg-neutral-800 rounded-xl border border-neutral-700 flex items-center justify-center">
                              <span className="text-orange-400 font-bold text-sm">
                                +{order.items.length - 3}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Order Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg font-bold text-white">
                              Order #{orderId.slice(-8).toUpperCase()}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.date)}`}>
                              {getStatusText(order.date)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-neutral-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(order.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-neutral-500 text-sm">Total:</span>
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                              ₹{order.totalPrice}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <button
                        onClick={() => handleToggleDetails(orderId)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
                      >
                        {isExpanded ? (
                          <>
                            Hide Details
                            <ChevronUp className="w-5 h-5" />
                          </>
                        ) : (
                          <>
                            View Details
                            <ChevronDown className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div className="border-t border-neutral-800 bg-neutral-950/40 p-6">
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        
                        {/* Delivery Address */}
                        <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-5 h-5 text-orange-500" />
                            <h4 className="font-semibold text-white text-lg">Delivery Address</h4>
                          </div>
                          <p className="text-neutral-300 leading-relaxed">{order.address}</p>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <CreditCard className="w-5 h-5 text-orange-500" />
                            <h4 className="font-semibold text-white text-lg">Payment Method</h4>
                          </div>
                          <p className="text-neutral-300">{order.paymentMethod}</p>
                        </div>
                      </div>

                      {/* Items Ordered */}
                      <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <ShoppingBag className="w-5 h-5 text-orange-500" />
                          <h4 className="font-semibold text-white text-lg">Items Ordered</h4>
                          <span className="text-sm text-neutral-400">({order.items.length} items)</span>
                        </div>
                        
                        <div className="space-y-3">
                          {(showAllProducts[orderId] ? order.items : order.items.slice(0, 3)).map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-3 bg-neutral-800/40 border border-neutral-700 rounded-lg hover:border-orange-500/30 transition-all"
                            >
                              <div className="w-16 h-16 bg-neutral-900 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                                <img
                                  src={item.image.startsWith('http') ? item.image : `${getBaseUrl()}${item.image}`}
                                  alt={item.name}
                                  className="w-full h-full object-contain p-1"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-medium">{item.name}</p>
                                <p className="text-sm text-neutral-400">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-orange-400 font-semibold">₹{item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Show More/Less */}
                        {order.items.length > 3 && (
                          <button
                            onClick={() => handleShowMore(orderId)}
                            className="w-full mt-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-orange-400 rounded-lg font-medium transition-all duration-300 border border-neutral-700 hover:border-orange-500/30"
                          >
                            {showAllProducts[orderId] 
                              ? 'Show Less' 
                              : `Show ${order.items.length - 3} More Item${order.items.length - 3 > 1 ? 's' : ''}`
                            }
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Box className="w-12 h-12 text-neutral-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">No orders yet</h2>
              <p className="text-neutral-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
