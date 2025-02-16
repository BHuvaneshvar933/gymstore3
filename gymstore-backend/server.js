const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const ordersRoute = require('./routes/orders');
const productRoutes = require('./routes/products');
const cartRoute = require('./routes/cart');
app.use('/api/products', productRoutes);

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

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors());         // Enable CORS (adjust settings as needed)

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes

const authRoutes = require('./routes/auth');


// Use routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoute);
app.use('/api/cart', cartRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
