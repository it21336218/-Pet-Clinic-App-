// ---------------------------
// File: models/User.js
// ---------------------------
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // User's full name
  name: { type: String, required: [true, 'Name is required'] },
  
  // Unique email address
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
  },
  
  // Hashed password
  password: { type: String, required: [true, 'Password is required'] },
  
  // User role with restricted values
  role: { 
    type: String, 
    enum: ['admin', 'pet_owner'], 
    default: 'pet_owner' 
  },
  
  // Optional phone number
  phone: String,
  
  // Array of pet objects
  pets: [{
    name: String,
    species: String,
    age: Number
  }]
}, { 
  // Automatic timestamps
  timestamps: true 
});

export default mongoose.model('User', userSchema);
