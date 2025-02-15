// seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  { 
    name: 'Dumbbells', 
    price: 100, 
    category: 'equipment', 
    image: 'http://localhost:5000/images/dumbbell.webp',
    description: 'A versatile piece of equipment for strength training and toning muscles. Ideal for home or gym workouts.'
  },
  { 
    name: 'Resistance Bands', 
    price: 200, 
    category: 'equipment', 
    image: 'http://localhost:5000/images/band.avif', // local path
    description: 'Lightweight and portable bands for strength, flexibility, and rehabilitation exercises.'
  },
  { 
    name: 'Treadmill', 
    price: 300, 
    category: 'equipment', 
    image: 'http://localhost:5000/images/threadmill.jpg', // local path
    description: 'A high-quality machine for indoor running or walking, perfect for cardio and endurance training.'
  },
  { 
    name: 'Exercise Bike', 
    price: 100, 
    category: 'equipment', 
    image: 'http://localhost:5000/images/bike.png', // local path
    description: 'A compact and efficient bike designed for cardiovascular fitness and lower body strength.'
  },
  { 
    name: 'Medicine Ball', 
    price: 200, 
    category: 'equipment', 
    image: 'http://localhost:5000/images/ball.avif', // local path
    description: 'A durable ball for strength, balance, and core training exercises. Great for functional workouts.'
  },
  { 
    name: 'Pull-Up Bar', 
    price: 300, 
    category: 'equipment', 
    image: 'http://localhost:5000/images/bar.png', // local path
    description: 'A sturdy bar that easily fits in doorframes for effective upper body and core strength exercises.'
  },
  { 
    name: 'Yoga Mat', 
    price: 100, 
    category: 'equipment', // or change to appropriate category if needed
    image: 'http://localhost:5000/images/b.png', // local path
    description: 'A cushioned, non-slip surface for yoga, stretching, or floor exercises. Essential for any fitness routine.'
  },
  { 
    name: 'Jump Rope', 
    price: 200, 
    category: 'equipment', 
    image: 'http://localhost:5000/images/rope.webp', // local path
    description: 'A classic tool for cardio and agility workouts, offering an efficient full-body exercise.'
  },
  { 
    name: 'Whey Protein', 
    price: 300, 
    category: 'supplement', 
    image: 'http://localhost:5000/images/whey.png', // local path
    description: 'A high-quality protein supplement to support muscle growth and recovery after workouts.'
  },
  { 
    name: 'Creatine', 
    price: 100, 
    category: 'supplement', 
    image: 'http://localhost:5000/images/creagen.png', // local path
    description: 'A performance-boosting supplement to improve strength, endurance, and muscle recovery.'
  },
  { 
    name: 'Pre-Workout', 
    price: 200, 
    category: 'supplement', 
    image: 'http://localhost:5000/images/pre.png', // local path
    description: 'A supplement designed to enhance energy, focus, and performance during intense training sessions.'
  },
  { 
    name: 'Glutamine', 
    price: 300, 
    category: 'supplement', 
    image: 'http://localhost:5000/images/glutamine.webp', // local path
    description: 'A supplement that aids muscle recovery, supports the immune system, and reduces muscle soreness.'
  }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully!');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
