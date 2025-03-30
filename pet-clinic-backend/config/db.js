// ---------------------------
// File: config/db.js
// ---------------------------
import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the URI from environment variables
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
