import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import userRoutes from './routes/users.js';         // ✅ Added user routes
import reminderJob from './utils/cronJobs.js';

const app = express();

// ✅ Enable CORS
app.use(cors());

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ Connect to DB
connectDB();

// ✅ Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);                  // ✅ Register user route

// ✅ Test route
app.get('/api', (req, res) => {
  res.send('✅ Pet Clinic API is running');
});

// ✅ Start email reminder job
reminderJob.start();

// ✅ Server boot
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
