// Account.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // Use user.profileImage if provided; otherwise, check localStorage
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
        // Optionally: send this image to your backend to update the user profile.
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
  };

  if (!user) {
    return <p className="text-center text-xl">Please log in to view your account.</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg h-screen">
      <h1 className="text-4xl font-semibold text-center mb-6">
        Your <span className="bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text">Account</span>
      </h1>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src={profileImage || 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
          />
          <label className="absolute bottom-0 right-0 bg-orange-600 px-2 rounded-full cursor-pointer hover:bg-orange-700 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <span className="text-white text-xl font-bold">+</span>
          </label>
          {profileImage && (
            <button
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-red-500 text-white px-2 cursor-pointer rounded-full hover:bg-red-600 transition"
            >
              <span className="text-lg font-bold">-</span>
            </button>
          )}
        </div>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold ">{user.username}</h2>
        <p className="text-gray-500 mt-2">{user.email}</p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
