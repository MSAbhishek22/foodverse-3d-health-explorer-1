"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LandingPage from '@/components/LandingPage';
import DiseaseSelector from '@/components/DiseaseSelector';
import InfoModal from '@/components/InfoModal';
import QuizMode from '@/components/QuizMode';
import MobileFallback from '@/components/MobileFallback';
import MusicToggle from '@/components/MusicToggle';
import { foodData } from '@/data/foodData';
import type { Food } from '@/data/foodData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gamepad2 } from 'lucide-react';

// Dynamically import FoodVerseScene to avoid SSR issues with Three.js
const FoodVerseScene = dynamic(() => import('@/components/FoodVerseScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white text-2xl">Loading FoodVerse...</div>
    </div>
  ),
});

type Screen = 'landing' | 'selector' | 'foodverse';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show mobile fallback on small screens
  if (isMobile) {
    return <MobileFallback />;
  }

  const handleDiseaseSelect = (diseaseId: string) => {
    setSelectedDisease(diseaseId);
    setCurrentScreen('foodverse');
  };

  const handleBackToSelector = () => {
    setCurrentScreen('selector');
    setSelectedDisease(null);
    setSelectedFood(null);
  };

  const currentFoods = selectedDisease ? foodData[selectedDisease].foods : [];
  const currentDiseaseName = selectedDisease ? foodData[selectedDisease].name : '';

  return (
    <>
      <AnimatePresence mode="wait">
        {currentScreen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onEnter={() => setCurrentScreen('selector')} />
          </motion.div>
        )}

        {currentScreen === 'selector' && (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DiseaseSelector onSelect={handleDiseaseSelect} />
          </motion.div>
        )}

        {currentScreen === 'foodverse' && selectedDisease && (
          <motion.div
            key="foodverse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FoodVerseScene
              foods={currentFoods}
              onFoodClick={setSelectedFood}
            />

            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onClick={handleBackToSelector}
              className="fixed top-8 left-8 z-40 flex items-center gap-2 px-6 py-3 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold transition-all hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              Change Disease
            </motion.button>

            {/* Disease info badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="fixed top-8 right-8 z-40 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{foodData[selectedDisease].icon}</span>
                <div>
                  <h3 className="text-white font-bold text-lg">{currentDiseaseName}</h3>
                  <p className="text-gray-300 text-sm">{currentFoods.length} foods to explore</p>
                </div>
              </div>
            </motion.div>

            {/* Quiz button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQuiz(true)}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full text-white font-bold shadow-2xl transition-all"
            >
              <Gamepad2 className="w-5 h-5" />
              Take the Quiz
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      {selectedFood && (
        <InfoModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}

      {/* Quiz Mode */}
      {showQuiz && selectedDisease && (
        <QuizMode
          foods={currentFoods}
          diseaseName={currentDiseaseName}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* Music Toggle */}
      {currentScreen !== 'landing' && <MusicToggle />}
    </>
  );
}