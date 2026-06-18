import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nexusmart';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import Category from './models/Category.js';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('NexusMart Backend API is running');
});

// Seed basic data if none exists (demo purpose)
const seedDatabase = async () => {
    try {
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            await Product.insertMany([
                { name: 'Samsung Galaxy S23 Ultra', description: 'Flagship smartphone with 200MP camera.', price: 1199, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80' },
                { name: 'Apple iPhone 14 Pro', description: 'Dynamic Island, 48MP Main camera.', price: 999, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500&q=80' },
                { name: 'Sony WH-1000XM5', description: 'Industry leading noise canceling headphones.', price: 348, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80' },
                { name: 'MacBook Air M2', description: 'Supercharged by M2.', price: 1099, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80' },
                { name: 'Nike Air Max 270', description: 'Men\'s lifestyle shoe.', price: 150, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
                { name: 'Levi\'s Denim Jacket', description: 'Classic blue trucker jacket.', price: 90, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80' },
                { name: 'Spalding Basketball', description: 'Official NBA size and weight.', price: 35, category: 'Sports Equipments', imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&q=80' },
                { name: 'Yoga Mat', description: 'Non-slip exercise mat.', price: 20, category: 'Sports Equipments', imageUrl: 'https://images.unsplash.com/photo-1601614917637-251f28b7470c?w=500&q=80' },
                { name: 'Organic Almonds', description: '1lb bag of raw almonds.', price: 12, category: 'Groceries', imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&q=80' },
            ]);
            console.log('Database seeded with sample products');
        }

        const categoryCount = await Category.countDocuments();
        if (categoryCount === 0) {
            await Category.insertMany([
                { name: 'Fashion', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=60' },
                { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60' },
                { name: 'Mobiles', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60' },
                { name: 'Groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60' },
                { name: 'Sports Equipments', image: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=800&auto=format&fit=crop&q=60' }
            ]);
        }
        
        // Ensure admin user exists
        // bcrypt and User imports moved to top of file
        const adminExists = await User.findOne({ email: 'admin@nexusmart.com' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.create({
                name: 'Admin',
                email: 'admin@nexusmart.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Admin user seeded (admin@nexusmart.com / admin123)');
        }
    } catch (err) {
        console.error('Error seeding DB:', err);
    }
};

mongoose.connection.once('open', () => {
    seedDatabase();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
