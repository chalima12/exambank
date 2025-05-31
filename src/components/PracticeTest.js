// src/components/PracticeTest.js
import React from 'react';

function PracticeTest({ questions, userAnswers, onAnswerSelect, currentQuestionIndex, onSetCurrentQuestionIndex, onSubmitTest }) {
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full mt-8 mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center font-inter">Practice Test</h2>
        {questions.length === 0 ? (
          <p className="text-center text-gray-600 font-inter">Loading questions...</p>
        ) : (
          <>
            <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
              <p className="text-xl font-semibold text-gray-800 mb-4 font-inter">
                {currentQuestionIndex + 1}. {currentQuestion?.questionText}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion?.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200
                      ${userAnswers[currentQuestion?.id] === optIndex
                        ? 'bg-blue-200 border-blue-500'
                        : 'bg-white border-gray-300 hover:bg-gray-100'
                      } border`}
                  >
                    <input
                      type="radio"
                      name={`practice-question-${currentQuestion?.id}`}
                      value={optIndex}
                      checked={userAnswers[currentQuestion?.id] === optIndex}
                      onChange={() => onAnswerSelect(currentQuestion?.id, optIndex)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg text-gray-700 font-inter">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-center flex-wrap gap-2 mb-6">
              {questions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => onSetCurrentQuestionIndex(index)}
                  disabled={userAnswers[q.id] === undefined} // Only enable if answered
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-200
                    ${currentQuestionIndex === index ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                    ${userAnswers[q.id] !== undefined ? 'border-2 border-green-500' : ''}
                    ${userAnswers[q.id] === undefined ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  title={userAnswers[q.id] !== undefined ? 'Question answered' : 'Question not answered'}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => onSetCurrentQuestionIndex(prev => prev - 1)}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-inter"
              >
                Previous
              </button>
              <button
                onClick={() => onSetCurrentQuestionIndex(prev => prev + 1)}
                disabled={currentQuestionIndex === questions.length - 1 || questions.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-inter"
              >
                Next
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={onSubmitTest}
                disabled={Object.keys(userAnswers).length !== questions.length}
                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 font-inter
                  ${Object.keys(userAnswers).length !== questions.length ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                Submit Practice Test
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PracticeTest;
