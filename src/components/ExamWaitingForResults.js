// src/components/ExamWaitingForResults.js
import React from 'react';

function ExamWaitingForResults() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 font-inter">Exam Submitted!</h2>
        <p className="text-lg text-gray-600 mb-8 font-inter animate-pulse">
          Results will be displayed shortly...
        </p>
        <p className="text-sm text-gray-500 font-inter">
          Please wait for the results to be processed.
        </p>
      </div>
    </div>
  );
}

export default ExamWaitingForResults;
