import React from 'react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

import img1 from '../assets/pexels-chevanon-1108099.jpg';
import img2 from '../assets/pexels-kateryna-babaieva-1423213-2853422.jpg';
import img3 from '../assets/pexels-lum3n-44775-406014.jpg';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      <div className="flex-grow p-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-rose-700 text-center drop-shadow mb-4">
          🐾 Welcome to Pet Clinic 🏥
        </h1>
        <p className="text-center text-lg text-gray-700 mb-10">
          Logged in as: <span className="font-bold text-indigo-600">{user?.role}</span>
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[img1, img2, img3].map((img, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 bg-white"
            >
              <img
                src={img}
                alt={`Pet ${index + 1}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {index === 0 && 'Happy Puppy'}
                  {index === 1 && 'Winter Husky'}
                  {index === 2 && 'Curious Nose'}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {index === 0 && 'Regular checkups keep your dog healthy!'}
                  {index === 1 && 'Cold weather? No worries for this fluff!'}
                  {index === 2 && 'Always curious about you!'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
