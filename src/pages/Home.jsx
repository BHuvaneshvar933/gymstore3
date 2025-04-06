import React from 'react';
import home from "../assets/home.jpg"; 
import { Link } from "react-router-dom";

const Home = () => (
  <div
    className="relative bg-cover bg-center h-dvh"
    style={{ backgroundImage: `url(${home})` }} 
  >
    
    <div className="absolute inset-0 bg-gradient-to-r from-black to-neutral-950  opacity-75"></div>

    <div className="relative container mx-auto p-8 text-center text-white">
      <h1 className="text-7xl font-bold mt-52">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text">
        SK Gym Products
        </span>
      </h1>
      <p className="text-lg mb-6 text-neutral-300 mt-2">
        Find the best gym equipment and supplements at unbeatable prices.
      </p>
      <Link to="/products">
      <a
        href="/products"
        className="py-2 px-4 rounded-md bg-gradient-to-r from-orange-400 to-red-700 hover:from-orange-400 hover:to-red-600 transition"
      >
        Shop Now
      </a>
        </Link>
    </div>
  </div>
);

export default Home;
