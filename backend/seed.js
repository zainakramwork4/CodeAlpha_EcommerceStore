require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 79.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 25,
    rating: 4.6
  },
  {
    name: 'Smart Watch Series 5',
    description: 'Fitness tracking smartwatch with heart rate monitor, GPS, and water resistance.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    stock: 15,
    rating: 4.4
  },
  {
    name: 'Men\'s Classic Leather Jacket',
    description: 'Genuine leather jacket with a timeless design, perfect for all seasons.',
    price: 129.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    stock: 10,
    rating: 4.7
  },
  {
    name: 'Running Shoes - Lightweight',
    description: 'Breathable mesh running shoes with cushioned sole for maximum comfort.',
    price: 59.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 30,
    rating: 4.5
  },
  {
    name: 'Stainless Steel Coffee Maker',
    description: '12-cup programmable coffee maker with auto shut-off and keep-warm function.',
    price: 45.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
    stock: 20,
    rating: 4.3
  },
  {
    name: 'Non-Stick Cookware Set (10-Piece)',
    description: 'Durable non-stick cookware set including pots, pans, and lids.',
    price: 89.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1584990347449-39b78c0e5147?w=500',
    stock: 12,
    rating: 4.6
  },
  {
    name: 'Yoga Mat - Extra Thick',
    description: 'Eco-friendly, non-slip yoga mat with carrying strap, ideal for home workouts.',
    price: 24.99,
    category: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 40,
    rating: 4.5
  },
  {
    name: 'Adjustable Dumbbell Set',
    description: 'Space-saving adjustable dumbbells, 5-25 lbs per hand, ideal for home gyms.',
    price: 119.99,
    category: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500',
    stock: 8,
    rating: 4.8
  },
  {
    name: 'Bestselling Novel - Mystery Box Set',
    description: 'Collection of 3 bestselling mystery novels, paperback edition.',
    price: 34.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500',
    stock: 18,
    rating: 4.9
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charger compatible with all Qi-enabled smartphones.',
    price: 19.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500',
    stock: 35,
    rating: 4.2
  }
];

const seedDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/codealpha_ecommerce';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} sample products inserted`);

    // Create a default admin user if none exists
    const adminExists = await User.findOne({ email: 'admin@codealpha.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@codealpha.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Default admin user created (email: admin@codealpha.com, password: admin123)');
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
