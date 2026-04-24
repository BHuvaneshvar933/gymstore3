const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.json()); 

app.use(cors({
  origin: true,
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

// Root route for API status
app.get('/', (req, res) => {
  res.json({
    status: 'GymStore API is running',
    version: '1.0.0',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'API Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
