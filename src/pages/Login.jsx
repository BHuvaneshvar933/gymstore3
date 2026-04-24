import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight, UserPlus } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password });
      const data = response.data;

      if (data.token) {
        login(data.token);
        navigate("/"); 
      } else {
        setError(data.message || "Login failed!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login.");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background with parallax-like effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1920)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900/95 to-black opacity-90"></div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden group">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-600"></div>

          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-600/20 border border-orange-400/30 mb-4 group-hover:scale-110 transition-transform duration-300">
              <LogIn className="w-8 h-8 text-orange-400" />
            </div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
              Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Back</span>
            </h1>
            <p className="text-neutral-400 font-medium">Continue your fitness journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-orange-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-neutral-900/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-orange-400 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-neutral-900/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all backdrop-blur-sm"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-shake">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-700 text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 h-px bg-white/10"></div>
              <p className="text-neutral-500 text-sm font-medium">New to GymStore?</p>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>
            
            <Link
              to="/register"
              className="flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold transition-colors group"
            >
              <UserPlus className="w-5 h-5" />
              Create an account
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
