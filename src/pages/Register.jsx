import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import home from "../assets/home.jpg";
import { CreditCard, MapPin, ShoppingBag, CheckCircle, Wallet, Smartphone, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ username, email, password }),
        withCredentials: true
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() =>{
          setShowSuccessMessage(false);
          navigate('/login')
        },2000);
        setUsername('');
        setEmail('');
        setPassword(''); 
      } else {
        setError(data.message || 'Registration failed!');
      }
    } catch (err) {
      setError('An error occurred during registration.');
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
        <form onSubmit={handleRegister} className="space-y-6">
          <h1 className="text-4xl font-bold text-white">Register</h1>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
              className="border border-neutral-500 w-full px-4 py-3 rounded-lg bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
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
            Register
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
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

export default Register;
