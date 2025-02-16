import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-neutral-700/80 bg-opacity-90">
      <div className="flex justify-between items-center px-6 py-4 md:px-24">
        <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-white via-orange-500 to-red-600 text-transparent bg-clip-text">
          SK Gym Products
        </h1>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-12 text-center">
          <li className="py-2">
            <Link to="/">Home</Link>
          </li>
          <li className="py-2">
            <Link to="/products">Products</Link>
          </li>
          {user ? (
            <>
              <li className="py-2">
                <Link to="/cart">Cart</Link>
              </li>
              <li className="py-2">
                <Link to="/orders">Orders</Link>
              </li>
              <li className="py-2">
                <Link to="/about">About</Link>
              </li>
              <li className="py-2">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="flex items-center space-x-2">
                <Link to="/account" className="flex items-center">
                  <img
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-1">{user.username}</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="py-2">
                <Link to="/about">About</Link>
              </li>
              <li className="py-2">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800">
                <Link to="/login">Login/Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col space-y-2 text-center">
            <li>
              <Link onClick={() => setIsOpen(false)} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(false)} to="/products">
                Products
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/cart">
                    Cart
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/orders">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="flex items-center justify-center space-x-4">
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/account"
                    className="flex items-center "
                  >
                    <img
                      src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                      alt="User Avatar"
                      className="w-6 h-6 rounded-full "
                    />
                    <span className="ml-1">{user.username}</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800">
                  <Link onClick={() => setIsOpen(false)} to="/login">
                    Login/Register
                  </Link>
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
