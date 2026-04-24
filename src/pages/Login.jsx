import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import home from "../assets/home.jpg";
import { CheckCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage]= useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const data = response.data;

      if (data.token) {
        login(data.token);
        setShowSuccessMessage(true);
        setTimeout(() =>{
          setShowSuccessMessage(false);
          navigate("/"); 
        }, 2000);
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
      {showSuccessMessage && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                      <div className="bg-neutral-900 border border-green-500 rounded-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">Registered Successfully!</h2>
                        <p className="text-neutral-400 mb-6">
                          Redirecting to login page...
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
                      </div>
                    </div>
                  )}
    </div>
  );
};

export default Login;
