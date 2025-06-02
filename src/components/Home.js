// src/components/Home.js
import React from 'react';

function Home({ onStartPractice, onStartExam }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 font-inter">Welcome to Exambank!</h1>
        <p className="text-lg text-gray-600 mb-8 font-inter">Choose your path:</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={onStartPractice}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 font-inter"
          >
            Practice Test
          </button>
          <button
            onClick={onStartExam}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 font-inter"
          >
            Take Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
