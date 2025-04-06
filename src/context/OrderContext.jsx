import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Function to fetch orders from the backend
  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://gymstore3-2.onrender.com/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  // Function to place an order in the backend
  const placeOrder = async (order) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://gymstore3-2.onrender.com/api/orders', order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // update local orders state with the newly created order
      setOrders((prevOrders) => [response.data, ...prevOrders]);
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
