import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nexusmart';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Clearing Product and Order collections...');
    await mongoose.connection.db.dropCollection('products').catch(err => console.log('Products col does not exist'));
    await mongoose.connection.db.dropCollection('orders').catch(err => console.log('Orders col does not exist'));
    console.log('Collections cleared.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
