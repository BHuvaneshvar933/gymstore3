import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

 return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-orange-500/20 shadow-lg shadow-orange-500/5">
      <div className="flex justify-between items-center px-6 py-4 md:px-24">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-700 flex items-center justify-center">
            <span className="text-2xl">💪</span>
          </div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-white via-orange-400 to-red-600 text-transparent bg-clip-text">
            GymStore
          </h1>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-orange-400 focus:outline-none transition-colors p-2 rounded-lg hover:bg-white/5"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <a href="/" className="text-neutral-300 hover:text-white transition-colors font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a href="/products" className="text-neutral-300 hover:text-white transition-colors font-medium relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          {user ? (
            <>
              <li>
                <a href="/cart" className="text-neutral-300 hover:text-white transition-colors font-medium relative group">
                  Cart
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a href="/orders" className="text-neutral-300 hover:text-white transition-colors font-medium relative group">
                  Orders
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a href="/about" className="text-neutral-300 hover:text-white transition-colors font-medium relative group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a href="/contact" className="text-neutral-300 hover:text-white transition-colors font-medium relative group">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a href="/account" className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-700/10 border border-orange-500/30 hover:border-orange-500/60 transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white font-bold">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white font-medium">{user.username}</span>
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/about" className="text-neutral-300 hover:text-white transition-colors font-medium relative group">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a href="/contact" className="text-neutral-300 hover:text-white transition-colors font-medium relative group">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a href="/login" className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-700 hover:from-orange-400 hover:to-red-600 text-white font-semibold transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transform">
                  Login / Register
                </a>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 bg-black/60 backdrop-blur-xl border-t border-orange-500/20">
          <ul className="flex flex-col space-y-3 pt-4">
            <li>
              <a onClick={() => setIsOpen(false)} href="/" className="block py-2 px-4 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all">
                Home
              </a>
            </li>
            <li>
              <a onClick={() => setIsOpen(false)} href="/products" className="block py-2 px-4 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all">
                Products
              </a>
            </li>
            {user ? (
              <>
                <li>
                  <a onClick={() => setIsOpen(false)} href="/cart" className="block py-2 px-4 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all">
                    Cart
                  </a>
                </li>
                <li>
                  <a onClick={() => setIsOpen(false)} href="/orders" className="block py-2 px-4 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all">
                    Orders
                  </a>
                </li>
                <li>
                  <a onClick={() => setIsOpen(false)} href="/about" className="block py-2 px-4 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all">
                    About
                  </a>
                </li>
                <li>
                  <a onClick={() => setIsOpen(false)} href="/contact" className="block py-2 px-4 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all">
                    Contact
                  </a>
                </li>
                <li>
                  <a onClick={() => setIsOpen(false)} href="/account" className="flex items-center space-x-2 py-2 px-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-700/10 border border-orange-500/30">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white font-bold">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium">{user.username}</span>
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a onClick={() => setIsOpen(false)} href="/about" className="block py-2 px-4 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all">
                    About
                  </a>
                </li>
                <li>
                  <a onClick={() => setIsOpen(false)} href="/contact" className="block py-2 px-4 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-all">
                    Contact
                  </a>
                </li>
                <li>
                  <a onClick={() => setIsOpen(false)} href="/login" className="block text-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-700 text-white font-semibold">
                    Login / Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
