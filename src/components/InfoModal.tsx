"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Activity } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import type { Food } from '@/data/foodData';
import { useState } from 'react';

interface InfoModalProps {
  food: Food | null;
  onClose: () => void;
}

export default function InfoModal({ food, onClose }: InfoModalProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (!food) return null;

  const getVerdictColor = () => {
    switch (food.verdict) {
      case 'safe':
        return 'from-green-500 to-emerald-500';
      case 'moderate':
        return 'from-yellow-500 to-orange-500';
      case 'avoid':
        return 'from-red-500 to-rose-500';
    }
  };

  const getVerdictBg = () => {
    switch (food.verdict) {
      case 'safe':
        return 'bg-green-500/20 border-green-500/50';
      case 'moderate':
        return 'bg-yellow-500/20 border-yellow-500/50';
      case 'avoid':
        return 'bg-red-500/20 border-red-500/50';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className={`relative p-8 bg-gradient-to-r ${getVerdictColor()} text-white`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-8xl mb-4"
            >
              {food.emoji}
            </motion.div>

            <h2 className="text-4xl font-bold mb-2">{food.name}</h2>
            <div className={`inline-block px-4 py-2 rounded-full border ${getVerdictBg()} backdrop-blur-sm font-semibold uppercase text-sm`}>
              {food.verdict === 'safe' && '✅ Safe to Consume'}
              {food.verdict === 'moderate' && '⚠️ Consume in Moderation'}
              {food.verdict === 'avoid' && '🚫 Best to Avoid'}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* AI Explanation */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-lg">AI Analysis</h3>
              </div>
              <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-4">
                {!showDetails ? (
                  <TypeAnimation
                    sequence={[
                      food.reason,
                      () => setShowDetails(true)
                    ]}
                    wrapper="p"
                    cursor={true}
                    className="text-gray-300 leading-relaxed"
                    speed={70}
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed">{food.reason}</p>
                )}
              </div>
            </div>

            {/* Nutritional Info */}
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-blue-400">
                  <Activity className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Nutritional Information</h3>
                </div>
                <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-gray-300 font-mono text-sm">
                    {food.nutritionalInfo}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Fun Facts */}
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-500/30 rounded-xl p-6"
              >
                <p className="text-center text-gray-300 italic">
                  "Let food be thy medicine and medicine be thy food" - Hippocrates
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
