import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Cart from './pages/Cart';
import Products from './pages/Products'; 
import Orders from './pages/Orders';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
 
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
         
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} /> 
              <Route path="/account" element={<Account />} />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path='/about' element={<About/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
            </Routes>
            <Footer/>
          
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
   
  );
}

export default App;
