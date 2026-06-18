import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nexusmart';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Clearing old products...');
    await Product.deleteMany({});
    
    console.log('Inserting new products...');
    await Product.insertMany([
        { name: 'PETER ENGLAND Solid Polo Neck', description: 'Men Solid Polo Neck Poly...', price: 6, category: 'Topwear', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/j/b/5/s-3759901-peter-england-original-imagsyznqzyfyfxy.jpeg?q=70' },
        { name: 'PETER ENGLAND Solid Polo', description: 'Men Solid Polo Neck Poly...', price: 5, category: 'Topwear', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/y/v/k/m-3759918-peter-england-original-imagsyznth226uz6.jpeg?q=70' },
        { name: 'PETER ENGLAND Self Design', description: 'Men Self Design Polo...', price: 6, category: 'Topwear', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/9/1/v/xl-3759892-peter-england-original-imagsyznguz4ezgh.jpeg?q=70' },
        { name: 'PETER ENGLAND Regular Fit', description: 'Men Regular Fit Striped...', price: 5.5, category: 'Topwear', imageUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/4/l/1/40-3949826-peter-england-original-imagtzv9xzwqhhwg.jpeg?q=70' },
        { name: 'Samsung Galaxy S23 Ultra', description: 'Flagship smartphone', price: 1199, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80' },
        { name: 'Sony WH-1000XM5', description: 'Noise canceling headphones', price: 348, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80' },
        { name: 'Yoga Mat', description: 'Non-slip mat', price: 20, category: 'Sports Equipments', imageUrl: 'https://images.unsplash.com/photo-1601614917637-251f28b7470c?w=500&q=80' },
        { name: 'Levi\'s Denim Jacket', description: 'Classic trucker', price: 90, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80' }
    ]);
    
    console.log('Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });
