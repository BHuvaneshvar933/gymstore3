import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import productBg from "../assets/product.avif"; // Background image

const Products = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState('equipment');
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState(null);

  // Fetch products when the selected category changes
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      // Adjust the query string to match your seed/model (e.g., "supplement" vs "supplements")
      const res = await axios.get(`/api/products?category=${selectedCategory}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);
      setNotification(`${product.name} has been added to your cart!`);
    } else {
      setNotification("Please login to add items to the cart.");
    }
    // Hide the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${productBg})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black to-neutral-950 opacity-75"></div>
      <div className="relative z-10 text-center py-8">
        <h1 className="text-white text-4xl font-bold mb-6">Products</h1>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`text-white py-2 px-4 rounded ${
              selectedCategory === "equipment"
                ? "bg-gradient-to-r from-orange-400 to-orange-700"
                : "bg-neutral-700"
            }`}
            onClick={() => setSelectedCategory("equipment")}
          >
            Equipment
          </button>
          <button
            className={`text-white py-2 px-4 rounded ${
              selectedCategory === "supplement"
                ? "bg-gradient-to-r from-orange-400 to-orange-700"
                : "bg-neutral-700"
            }`}
            onClick={() => setSelectedCategory("supplement")}
          >
            Supplements
          </button>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-14">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-neutral-800/80 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <div className="w-full h-48 flex items-center justify-center bg-neutral-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white">{product.name}</h3>
                  <p className="text-sm text-neutral-400">Price: ${product.price}</p>
                  <p className="text-sm text-neutral-400">{product.description}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 py-2 px-4 bg-gradient-to-r from-orange-400 to-orange-700 text-white rounded-md w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              No products available in this category.
            </p>
          )}
        </div>
      </div>
      {notification && (
        <div className="fixed bottom-16 z-50 border-[1px] border-orange-600 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white py-2 px-4 rounded shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Products;
