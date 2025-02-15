// Orders.jsx
import React, { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { orders, fetchOrders } = useOrder();
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState({});

  // Sort orders in descending order (most recent first)
  const sortedOrders = orders.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

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

  return (
    <div className="max-w-screen-lg mx-auto p-6 h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Your <span className="bg-gradient-to-r from-orange-300 to-red-600 text-transparent bg-clip-text">Orders</span>
      </h2>
      {sortedOrders.length > 0 ? (
        <div className="grid gap-6">
          {sortedOrders.map((order) => (
            <div key={order._id || order.id} className="border border-gray-200 rounded-lg shadow-md p-4">
              <div className="flex justify-between gap-4">
                <div className="flex space-x-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <img
                          key={index}
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Order #{order._id || order.id}</p>
                    <p className="text-neutral-400">Total: ${order.totalPrice}</p>
                    <p className="text-gray-500 text-sm">
                      Date: {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-gradient-to-r from-orange-400 to-red-700 hover:from-orange-400 hover:to-red-600 transition text-white py-2 px-4 rounded-md mt-2"
                  onClick={() => handleToggleDetails(order._id || order.id)}
                >
                  {expandedOrder === (order._id || order.id) ? 'Hide Details' : 'View Details'}
                </button>
              </div>
              {expandedOrder === (order._id || order.id) && (
                <div className="mt-4">
                  <p>
                    <strong className="font-semibold">Address:</strong> {order.address}
                  </p>
                  <p>
                    <strong className="font-semibold">Payment Method:</strong> {order.paymentMethod}
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg">Items Ordered:</h4>
                    <ul className="list-none pl-0">
                      {(showAllProducts[order._id || order.id]
                        ? order.items
                        : order.items.slice(0, 3)
                      ).map((item, index) => (
                        <li key={index} className="flex items-center space-x-4 mt-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <p>{item.name} - Qty: {item.quantity}</p>
                        </li>
                      ))}
                    </ul>
                    {order.items.length > 3 && !showAllProducts[order._id || order.id] && (
                      <p
                        className="text-neutral-400 cursor-pointer mt-2"
                        onClick={() => handleShowMore(order._id || order.id)}
                      >
                        + {order.items.length - 3} more product{order.items.length - 3 > 1 ? 's' : ''}
                      </p>
                    )}
                    {showAllProducts[order._id || order.id] && (
                      <p
                        className="text-neutral-400 cursor-pointer mt-2"
                        onClick={() => handleShowMore(order._id || order.id)}
                      >
                        Show less products
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-400">No orders placed yet.</p>
      )}
    </div>
  );
};

export default Orders;
