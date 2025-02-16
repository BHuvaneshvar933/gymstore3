import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the context hook
import home from "../assets/home.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        // Use the context's login function to store the token and update the state
        login(data.token);
        alert("Login successful!");
        navigate("/"); // Optionally navigate to home or another protected page
      } else {
        setError(data.message || "Login failed!");
        alert("Login failed!");
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error(err);
    }
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${home})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black to-neutral-950 opacity-80"></div>
      <div className="relative bottom-14 text-center bg-neutral-800/80 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-6">
          <h1 className="text-4xl font-bold text-white">Login</h1>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="border border-neutral-500 w-full px-4 py-3 rounded-lg bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="border border-neutral-500 w-full px-4 py-3 rounded-lg bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800 text-white font-semibold hover:from-orange-400 hover:to-red-600 transition"
          >
            Login
          </button>
        </form>
        <div className="flex items-center mt-6">
          <div className="flex-1 h-px bg-neutral-600"></div>
          <p className="text-neutral-400 mx-4 text-sm">New to GymStore?</p>
          <div className="flex-1 h-px bg-neutral-600"></div>
        </div>
        <Link
          to="/register"
          className="block mt-4 border border-neutral-400 text-neutral-400 py-2 px-6 rounded-md hover:bg-neutral-700 hover:text-white transition"
        >
          Register
        </Link>
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
