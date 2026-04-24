const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.json()); 

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'https://gymstore3.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
const ordersRoute = require('./routes/orders');
const productRoutes = require('./routes/products');
const cartRoute = require('./routes/cart');
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoute);
app.use('/api/cart', cartRoute);

app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const options = { root: path.join(__dirname, 'public', 'images') };
  res.sendFile(imageName, options, (err) => {
    if (err) {
      console.error(`Error sending file: ${err}`);
      res.status(err.status || 404).send('Image not found');
    }
  });
});



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Catch-all route to serve index.html (for production builds served by backend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
