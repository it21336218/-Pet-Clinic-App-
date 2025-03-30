import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}

        {user && (
          <>
            {user.role === 'admin' && (
              <Link to="/admin/users" className="hover:underline">Admin</Link>
            )}
            <Link to="/appointments" className="hover:underline">Appointments</Link>
          </>
        )}
      </div>

      {user && (
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-white">
          Logout
        </button>
      )}
    </nav>
  );
}
