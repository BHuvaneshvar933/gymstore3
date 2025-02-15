// navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky flex justify-between px-24 top-0 z-50 py-4 backdrop-blur-lg border-b border-neutral-700/80">
      <h1 className="text-3xl font-bold mt-2 bg-gradient-to-r from-white via-orange-500 to-red-600 text-transparent bg-clip-text">
        SK Gym Products
      </h1>
      <ul className="flex space-x-12 text-center">
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
            <li className=" flex items-center space-x-2 flex-row">
              <Link to="/account" className="flex">
              <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" className="w-6 h-6 rounded-4xl"/>
                <span className=" ml-1">{user.username}</span>
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
    </nav>
  );
};

export default NavBar;
