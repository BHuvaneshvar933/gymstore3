import React, { useState, useEffect } from 'react';
import api, { getBaseUrl } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import productBg from "../assets/product.avif";
import { ShoppingCart, Package, Dumbbell, Pill, Search, Star } from 'lucide-react';

const Products = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState('equipment');
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products?category=${selectedCategory}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);
      setNotification({
        type: 'success',
        message: `${product.name} added to cart!`
      });
    } else {
      setNotification({
        type: 'error',
        message: 'Please login to add items to cart'
      });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const filteredProducts = Array.isArray(products) ? products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${productBg})`, backgroundSize: "cover" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black opacity-90"></div>
      
      {/* Content Container */}
      <div className="relative z-10 px-4 py-12 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Our Products
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Premium fitness equipment and supplements to fuel your journey
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Box */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedCategory('equipment')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === 'equipment'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50 scale-105'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
                }`}
              >
                <Dumbbell className="w-5 h-5" />
                Equipment
              </button>
              <button
                onClick={() => setSelectedCategory('supplement')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === 'supplement'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50 scale-105'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
                }`}
              >
                <Pill className="w-5 h-5" />
                Supplements
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-56 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={product.image.startsWith('http') ? product.image : `${getBaseUrl()}${product.image}`}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Quick View Badge */}
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      NEW
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                      ))}
                      <span className="text-neutral-400 text-sm ml-2">(4.8)</span>
                    </div>

                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Price</p>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                          ₹{product.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 active:scale-95"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <Package className="w-20 h-20 text-neutral-700 mx-auto mb-4" />
                <p className="text-neutral-400 text-xl">
                  No products found in this category
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border ${
            notification.type === 'success'
              ? 'bg-neutral-900/95 border-orange-500 text-white'
              : 'bg-neutral-900/95 border-red-500 text-white'
          }`}>
            {notification.type === 'success' ? (
              <ShoppingCart className="w-5 h-5 text-orange-500" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 text-xs font-bold">!</div>
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;