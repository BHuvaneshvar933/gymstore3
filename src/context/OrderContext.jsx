import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  const placeOrder = async (order) => {
    try {
      const response = await api.post('/orders', order);
      setOrders((prevOrders) => [response.data, ...prevOrders]);
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

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
