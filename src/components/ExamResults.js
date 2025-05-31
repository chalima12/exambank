// src/components/ExamResults.js
import React from 'react';

function ExamResults({ questions, score, onBackToHome }) { // Removed 'userAnswers' from props as it's no longer needed for detailed display
  const percentage = questions.length > 0 ? ((score / questions.length) * 100).toFixed(2) : 0;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full mt-8 mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 font-inter">Real Exam Results</h2>
        <p className="text-2xl font-bold text-purple-600 mb-4 font-inter">
          You scored {score} out of {questions.length}!
        </p>
        {questions.length > 0 && (
          <p className="text-xl font-semibold text-gray-700 mb-8 font-inter">
            Percentage: {percentage}%
          </p>
        )}
        {/*
          The section below that displayed the detailed list of questions and answers
          has been removed as per the requirement for the Real Exam.
        */}
        {/*
        <div className="text-left">
          {questions.map((q, index) => (
            <div key={q.id} className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
              <p className="text-lg font-semibold text-gray-800 mb-2 font-inter">
                {index + 1}. {q.questionText}
              </p>
              <ul className="list-disc list-inside text-gray-700 font-inter">
                {q.options.map((option, optIndex) => (
                  <li
                    key={optIndex}
                    className={`${optIndex === q.correctAnswerIndex ? 'text-green-600 font-bold' : ''}
                      ${userAnswers[q.id] === optIndex && optIndex !== q.correctAnswerIndex ? 'text-red-600 line-through' : ''}`}
                  >
                    {option}
                    {optIndex === q.correctAnswerIndex && (
                      <span className="ml-2 text-green-600 font-bold">(Correct Answer)</span>
                    )}
                    {userAnswers[q.id] === optIndex && optIndex !== q.correctAnswerIndex && (
                      <span className="ml-2 text-red-600 font-bold">(Your Answer)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        */}
        <button
          onClick={onBackToHome}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-8 font-inter"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ExamResults;
