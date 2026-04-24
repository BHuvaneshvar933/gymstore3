import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders', {
         withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
       
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  const placeOrder = async (order) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/orders', order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
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
