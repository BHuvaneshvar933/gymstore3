# 🏋️‍♂️ GymStore - Premium Fitness E-commerce

GymStore is a full-stack, premium e-commerce platform for gym equipment and supplements. It features a modern, high-performance design with glassmorphism aesthetics, a robust authentication system, and a centralized API management system.

![GymStore Preview](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200)

## ✨ Features

- **Premium UI/UX**: Dark-themed, glassmorphic design using Tailwind CSS and Lucide icons.
- **Authentication**: Secure JWT-based login and registration with encrypted passwords (bcrypt).
- **Product Management**: Categorized product listing (Equipment & Supplements) with real-time search.
- **Shopping Cart**: Fully functional cart with quantity management and persistent state.
- **Order Tracking**: Comprehensive order history dashboard for users.
- **Profile Management**: User account customization with profile image uploads.
- **Production Ready**: Optimized for deployment on Vercel (Frontend) and Render (Backend).

## 🚀 Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API (Auth, Cart, Orders)
- **API Client**: Axios (with centralized interceptors)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT, Bcrypt.js, CORS
- **Deployment**: Render

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/gymstore3.git
cd gymstore3
```

### 2. Backend Setup
```bash
cd gymstore-backend
npm install
```
Create a `.env` file in `gymstore-backend/` and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ALLOWED_ORIGINS=http://localhost:5173
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ..
npm install
```
Create a `.env` file in the root directory and add:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Start the frontend:
```bash
npm run dev
```

## 🌐 Deployment

### Frontend (Vercel)
- Set the Build Command: `npm run build`
- Set the Output Directory: `dist`
- Add Environment Variable: `VITE_API_BASE_URL` pointing to your deployed backend.

### Backend (Render)
- Set the Root Directory: `gymstore-backend`
- Set the Build Command: `npm install`
- Set the Start Command: `npm start`
- Add Environment Variables: `MONGO_URI`, `JWT_SECRET`, `ALLOWED_ORIGINS`.

## 📄 License
This project is licensed under the ISC License.

---
Built with 💪 by Antigravity.
