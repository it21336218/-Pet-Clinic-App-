import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../styles/EditAppointment.css'; // Add animation & enhancements

export default function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ pet: '', doctor: '', date: '', service: '', price: '' });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`/appointments/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const app = res.data;
        setForm({
          pet: app.pet,
          doctor: app.doctor,
          date: app.date?.substring(0, 16),
          service: app.service,
          price: app.price
        });
      } catch (err) {
        console.error('Error loading appointment:', err);
        alert('Failed to load appointment');
      }
    };

    fetchAppointment();
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/appointments/${id}`, form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('✅ Appointment updated');
      navigate('/appointments');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update appointment');
    }
  };

  return (
    <div className="edit-wrapper min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="edit-container w-full max-w-xl p-8 bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl animate-fadeInUp">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">Edit Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            placeholder="Pet"
            value={form.pet}
            onChange={e => setForm({ ...form, pet: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            placeholder="Doctor"
            value={form.doctor}
            onChange={e => setForm({ ...form, doctor: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="datetime-local"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            placeholder="Service"
            value={form.service}
            onChange={e => setForm({ ...form, service: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Save Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
