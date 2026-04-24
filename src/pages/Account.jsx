import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Camera, Trash2, ShieldCheck, ShoppingBag } from 'lucide-react';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(user?.profileImage || localStorage.getItem('profileImage'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <ShieldCheck className="w-16 h-16 text-orange-500 mx-auto opacity-50" />
          <p className="text-neutral-400 text-xl font-medium">Please log in to view your account.</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-700 text-white font-bold rounded-xl hover:scale-105 transition-transform"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="md:col-span-1">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-28 shadow-2xl">
              <div className="flex flex-col items-center">
                <div className="relative group mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="relative w-40 h-40 rounded-full object-cover border-2 border-white/20 shadow-2xl"
                    />
                  ) : (
                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-white/10 shadow-2xl flex items-center justify-center">
                      <User className="w-16 h-16 text-neutral-500" />
                    </div>
                  )}
                  <label className="absolute bottom-2 right-2 bg-orange-500 p-3 rounded-full cursor-pointer hover:bg-orange-600 hover:scale-110 transition-all shadow-lg border-2 border-black">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <Camera className="w-5 h-5 text-white" />
                  </label>
                  {profileImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 p-2 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-lg border-2 border-black"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>

                <div className="text-center space-y-1 mb-8">
                  <h2 className="text-2xl font-black tracking-tight">{user.username}</h2>
                  <p className="text-neutral-400 font-medium flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-4 rounded-2xl bg-neutral-800 hover:bg-red-500/20 text-neutral-300 hover:text-red-400 border border-white/5 hover:border-red-500/30 font-bold transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Account Details & Actions */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats / Header Card */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/20 rounded-3xl p-8">
              <h1 className="text-4xl font-black mb-2 tracking-tight">Account <span className="text-orange-400">Settings</span></h1>
              <p className="text-neutral-300">Manage your profile and workout history from here.</p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => navigate('/orders')}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all text-left group flex items-center gap-6"
              >
                <div className="w-12 h-12 bg-orange-400/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <ShoppingBag className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">My Orders</h3>
                  <p className="text-sm text-neutral-400">Track and view your equipment purchases.</p>
                </div>
              </button>
            </div>

            {/* Info Card */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-orange-400" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Username</p>
                  <p className="text-lg font-medium">{user.username}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Email</p>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Member Since</p>
                  <p className="text-lg font-medium">April 2024</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;
