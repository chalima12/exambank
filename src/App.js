// src/App.js
// IMPORTANT: Please ensure your project's directory structure and file names EXACTLY match these imports.
// For example:
// - 'Home.js' MUST be located at 'src/components/Home.js'
// - 'PracticeTest.js' MUST be located at 'src/components/PracticeTest.js'
// - 'questions.js' MUST be located at 'src/data/questions.js'
// - 'helpers.js' MUST be located at 'src/utils/helpers.js'
// - 'AdminPanel.js' MUST be located at 'src/components/AdminPanel.js'
// Pay close attention to casing (e.g., 'components' vs 'Components', 'Home.js' vs 'home.js').

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Home from './components/Home.js';
import PracticeTest from './components/PracticeTest.js';
import PracticeResults from './components/PracticeResults.js';
import RealExam from './components/RealExam.js';
import ExamWaitingForResults from './components/ExamWaitingForResults.js';
import ExamResults from './components/ExamResults.js';
import AdminPanel from './components/AdminPanel.js';
import { allQuestions as hardcodedQuestions } from './data/questions.js'; // Renamed to hardcodedQuestions
// import { formatTime } from './utils/helpers.js';

// Removed all Firebase Imports as we are not using Firebase for local development
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

// Constants for exam duration and result display delay
const EXAM_DURATION_SECONDS = 60 * 60; // 1 hour
const RESULT_DELAY_SECONDS = 2 * 60; // 2 minutes

// Removed Firebase Configuration variables as they are no longer needed
// const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

function App() {
  // Removed Firebase states
  // const [db, setDb] = useState(null);
  // const [auth, setAuth] = useState(null);
  // const [userId, setUserId] = useState('local-user-id'); // Use a mock user ID for local development
  // const [isAuthReady, setIsAuthReady] = useState(false); // No longer needed

  // Practice test states
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [practiceUserAnswers, setPracticeUserAnswers] = useState({});
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCurrentQuestionIndex, setPracticeCurrentQuestionIndex] = useState(0);

  // Real exam states
  const [examQuestions, setExamQuestions] = useState([]);
  const [examUserAnswers, setExamUserAnswers] = useState({});
  const [examScore, setExamScore] = useState(0);
  const [examCurrentQuestionIndex, setExamCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [isExamActive, setIsExamActive] = useState(false); // Controls timer and exam submission
  const resultDelayTimerRef = useRef(null); // Ref to store the setTimeout ID

  // Overall page navigation
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'practice', 'practiceResults', 'exam', 'examWaitingForResults', 'examResults', 'adminPanel'

  // Initialize questions on component mount (always use hardcoded for now)
  useEffect(() => {
    setPracticeQuestions(hardcodedQuestions);
    setExamQuestions(hardcodedQuestions);
    // Mock authentication readiness for local development
    // setIsAuthReady(true); // No longer needed, userId is set directly
  }, []);

  // Handlers for Real Exam - Wrapped in useCallback for stability
  const handleSubmitExam = useCallback(async (autoSubmitted = false) => {
    setIsExamActive(false); // Stop the timer

    let correctCount = 0;
    examQuestions.forEach(q => {
      if (examUserAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    setExamScore(correctCount);

    console.log(`Exam submitted (${autoSubmitted ? 'automatically' : 'manually'}). Results will be displayed in ${RESULT_DELAY_SECONDS} seconds.`);
    setCurrentPage('examWaitingForResults');

    // Removed Firebase save logic
    console.log("Exam results are NOT saved to a backend as no Firebase account is configured.");


    // Make sure resultDelayTimerRef.current is cleared if already set to avoid multiple timeouts
    if (resultDelayTimerRef.current) {
        clearTimeout(resultDelayTimerRef.current);
    }
    resultDelayTimerRef.current = setTimeout(() => {
      setCurrentPage('examResults');
    }, RESULT_DELAY_SECONDS * 1000);
  }, [setIsExamActive, examQuestions, examUserAnswers, setExamScore, setCurrentPage, resultDelayTimerRef]); // Removed db, userId, appId from dependencies

  // Timer logic for the real exam
  useEffect(() => {
    let timerInterval;
    if (isExamActive && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isExamActive) {
      // Time's up, automatically submit exam
      console.log("Exam time's up! Submitting exam automatically.");
      handleSubmitExam(true); // <--- Now handleSubmitExam is stable
    }

    return () => clearInterval(timerInterval); // Cleanup on unmount or when dependencies change
  }, [isExamActive, timeLeft, handleSubmitExam]); // Added handleSubmitExam to dependencies

  // Handlers for Practice Test
  const handlePracticeAnswerSelect = (questionId, optionIndex) => {
    setPracticeUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitPractice = () => {
    let correctCount = 0;
    practiceQuestions.forEach(q => {
      if (practiceUserAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    setPracticeScore(correctCount);
    setCurrentPage('practiceResults');
  };

  const handleRetakePractice = () => {
    setPracticeUserAnswers({});
    setPracticeScore(0);
    setCurrentPage('practice');
    setPracticeCurrentQuestionIndex(0);
  };

  // Handlers for Real Exam
  const handleExamAnswerSelect = (questionId, optionIndex) => {
    if (isExamActive) {
      setExamUserAnswers(prev => ({
        ...prev,
        [questionId]: optionIndex,
      }));
    }
  };

  const handleStartExam = () => {
    setExamUserAnswers({});
    setExamScore(0);
    setExamCurrentQuestionIndex(0);
    setTimeLeft(EXAM_DURATION_SECONDS);
    setIsExamActive(true);
    // Clear any previous result delay timers if user starts a new exam
    clearTimeout(resultDelayTimerRef.current); // Cleared here as well for robustness
    setCurrentPage('exam');
  };

  // Render different pages based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            onStartPractice={() => setCurrentPage('practice')}
            onStartExam={handleStartExam}
            // userId={userId} // Pass userId to Home component (mocked)
            onGoToAdminPanel={() => setCurrentPage('adminPanel')} // New prop for admin panel
          />
        );
      case 'practice':
        return (
          <PracticeTest
            questions={practiceQuestions}
            userAnswers={practiceUserAnswers}
            onAnswerSelect={handlePracticeAnswerSelect}
            currentQuestionIndex={practiceCurrentQuestionIndex}
            onSetCurrentQuestionIndex={setPracticeCurrentQuestionIndex}
            onSubmitTest={handleSubmitPractice}
          />
        );
      case 'practiceResults':
        return (
          <PracticeResults
            questions={practiceQuestions}
            userAnswers={practiceUserAnswers}
            score={practiceScore}
            onRetakePractice={handleRetakePractice}
            onBackToHome={() => setCurrentPage('home')}
          />
        );
      case 'exam':
        return (
          <RealExam
            questions={examQuestions}
            userAnswers={examUserAnswers}
            onAnswerSelect={handleExamAnswerSelect}
            currentQuestionIndex={examCurrentQuestionIndex}
            onSetCurrentQuestionIndex={setExamCurrentQuestionIndex}
            onSubmitExam={handleSubmitExam}
            timeLeft={timeLeft}
            isExamActive={isExamActive}
          />
        );
      case 'examWaitingForResults':
        return <ExamWaitingForResults />;
      case 'examResults':
        return (
          <ExamResults
            questions={examQuestions}
            userAnswers={examUserAnswers}
            score={examScore}
            onBackToHome={() => setCurrentPage('home')}
          />
        );
      case 'adminPanel': // New case for AdminPanel
        return (
          <AdminPanel
            onBackToHome={() => setCurrentPage('home')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {renderPage()}
    </div>
  );
}

export default App;
