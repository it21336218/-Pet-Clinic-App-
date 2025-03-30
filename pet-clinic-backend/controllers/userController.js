import User from '../models/User.js';

/** ✅ Get all users (admin only) */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: '🔥 Failed to fetch users' });
  }
};

/** ✅ Get user by ID */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    // Allow only self or admin to view
    if (!user || (req.userRole !== 'admin' && req.userId !== user._id.toString())) {
      return res.status(403).json({ error: '❌ Access denied' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: '🔥 Failed to fetch user' });
  }
};

/** ✅ Update user */
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Only admin can update role
    const updates = req.userRole === 'admin'
      ? { name, email, role }
      : { name, email };

    // Only self or admin can update
    const user = await User.findById(req.params.id);
    if (!user || (req.userRole !== 'admin' && req.userId !== user._id.toString())) {
      return res.status(403).json({ error: '❌ Access denied' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true
    }).select('-password');

    res.json({ message: '✅ User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: '🔥 Failed to update user', details: err.message });
  }
};

/** ✅ Delete user (admin only) */
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: '❌ User not found' });
    }
    res.json({ message: '✅ User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: '🔥 Failed to delete user' });
  }
};
