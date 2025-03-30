import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// 👥 Get all users (admin only)
router.get('/', authenticate, authorizeAdmin, getAllUsers);

// 👤 Get a single user by ID (self or admin)
router.get('/:id', authenticate, getUserById);

// ✏️ Update a user (self or admin)
router.put('/:id', authenticate, updateUser);

// ❌ Delete user (admin only)
router.delete('/:id', authenticate, authorizeAdmin, deleteUser);

export default router;
