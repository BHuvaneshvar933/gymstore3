import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the cart for the logged-in user from the backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://gymstore3-2.onrender.com/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // response.data is the cart document { user, items }
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  // Update the backend cart with the new items array
  const updateBackendCart = async (items) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://gymstore3-2.onrender.com/api/cart',
        { items },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Add a product to the cart (merging items if already present)
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    let newItems;
    if (existingItem) {
      newItems = cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...cartItems, { ...product, quantity: 1 }];
    }
    updateBackendCart(newItems);
  };

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    const newItems = cartItems.filter(item => item._id !== productId);
    updateBackendCart(newItems);
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (productId, newQuantity) => {
    const newItems = cartItems.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateBackendCart(newItems);
  };

  // Clear the cart
  const clearCart = () => {
    updateBackendCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
