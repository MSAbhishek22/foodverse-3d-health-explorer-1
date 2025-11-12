"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Food } from '@/data/foodData';

interface QuizModeProps {
  foods: Food[];
  diseaseName: string;
  onClose: () => void;
}

export default function QuizMode({ foods, diseaseName, onClose }: QuizModeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  // Create quiz questions
  const questions = foods.slice(0, 5).map(food => ({
    food,
    question: `Is ${food.name} safe for ${diseaseName}?`,
    options: ['Safe', 'Moderate', 'Avoid'],
    correctAnswer: food.verdict,
  }));

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer.toLowerCase() === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
        if (score + (isCorrect ? 1 : 0) >= questions.length * 0.8) {
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 }
          });
        }
      }
    }, 2000);
  };

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-purple-900 to-black border border-purple-500/50 rounded-3xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
            className="text-8xl mb-6"
          >
            <Trophy className="w-24 h-24 mx-auto text-yellow-400" />
          </motion.div>

          <h2 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold text-white mb-4">
            {score}/{questions.length}
          </div>
          <p className="text-2xl text-purple-300 mb-8">
            {percentage >= 80 ? '🌟 Outstanding!' : percentage >= 60 ? '👍 Great Job!' : '💪 Keep Learning!'}
          </p>

          <button
            onClick={onClose}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform"
          >
            Back to FoodVerse
          </button>
        </motion.div>
      </motion.div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl p-8 max-w-2xl w-full"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <span className="text-sm text-gray-400">Question {currentQuestion + 1}/{questions.length}</span>
            <div className="text-2xl font-bold">Score: {score}</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-800 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center mb-8"
          >
            <div className="text-8xl mb-6">{currentQ.food.emoji}</div>
            <h3 className="text-3xl font-bold text-white mb-2">
              {currentQ.question}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="grid grid-cols-3 gap-4">
          {currentQ.options.map((option) => {
            const isSelected = selectedAnswer?.toLowerCase() === option.toLowerCase();
            const isCorrect = option.toLowerCase() === currentQ.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <motion.button
                key={option}
                whileHover={!showResult ? { scale: 1.05 } : {}}
                whileTap={!showResult ? { scale: 0.95 } : {}}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={`
                  relative py-6 px-4 rounded-xl font-bold text-lg transition-all
                  ${!showResult && 'hover:shadow-lg'}
                  ${showCorrect && 'bg-green-500 text-white'}
                  ${showWrong && 'bg-red-500 text-white'}
                  ${!showResult && 'bg-white/10 text-white hover:bg-white/20'}
                  ${showResult && !showCorrect && !showWrong && 'bg-white/5 text-gray-500'}
                `}
              >
                {option}
                {showCorrect && <Check className="w-6 h-6 inline ml-2" />}
                {showWrong && <X className="w-6 h-6 inline ml-2" />}
              </motion.button>
            );
          })}
        </div>

        {/* Result message */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-white text-lg">
              {selectedAnswer?.toLowerCase() === currentQ.correctAnswer ? (
                <span className="text-green-400">✅ Correct! {currentQ.food.reason}</span>
              ) : (
                <span className="text-red-400">❌ Not quite. {currentQ.food.reason}</span>
              )}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
