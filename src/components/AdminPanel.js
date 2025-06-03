// src/components/AdminPanel.js
import React from 'react';

function AdminPanel({ onBackToHome }) { // Removed db, userId, appId props as they are no longer used here
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h2 className="text-3xl font-extrabold text-red-800 mb-6 font-inter">Admin Panel (Backend Required)</h2>
        <p className="text-lg text-red-600 mb-8 font-inter">
          The Admin Panel requires a configured backend (like Firebase Firestore) to manage questions.
          Since no backend is connected, this functionality is currently disabled.
        </p>
        <button
          onClick={onBackToHome}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 font-inter"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
