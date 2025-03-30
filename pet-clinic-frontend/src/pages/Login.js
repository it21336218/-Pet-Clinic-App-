import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import '../styles/Login.css'; // custom styles
import logo from '../assets/logo.jpg'; // logo image

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      const token = res.data.token;
      const decoded = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem('token', token);
      setUser({ token, role: decoded.role });
      navigate(decoded.role === 'admin' ? '/admin/users' : '/appointments');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('❌ Login failed: ' + (err.response?.data?.error || 'Invalid credentials'));
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full transition hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
