import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminUsers.css';

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch users:', err.response?.data || err.message);
      alert('Failed to load users');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setUsers(users.filter(u => u._id !== id));
      alert('✅ User deleted');
    } catch (err) {
      console.error('❌ Failed to delete user:', err.response?.data || err.message);
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-rose-700 mb-8 drop-shadow">👥 All Users</h2>
        <ul className="space-y-4">
          {users.map(u => (
            <li key={u._id} className="user-card p-5 bg-white/90 rounded-xl shadow-lg flex justify-between items-center hover:shadow-xl transition">
              <div>
                <p className="text-lg font-semibold text-gray-800">{u.name}</p>
                <p className="text-sm text-gray-600">{u.email}</p>
                <span className={`role-badge ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'}`}>
                  {u.role === 'admin' ? 'Admin' : 'Pet Owner'}
                </span>
              </div>
              <button
                onClick={() => deleteUser(u._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
