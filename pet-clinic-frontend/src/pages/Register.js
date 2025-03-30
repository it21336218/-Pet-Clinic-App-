import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/Register.css'; // ✅ CSS path
import logo from '../assets/logo.jpg'; // logo image

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'pet_owner' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', form);
      if (res.data.token || res.data.message) {
        alert('✅ Registration successful');
        navigate('/login');
      } else {
        alert('⚠️ Unexpected response from server');
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      alert('❌ Registration failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <img src={logo} alt="Logo" className="register-logo" />
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="pet_owner">Pet Owner</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded w-full transition hover:bg-green-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
