"use client";

import { motion } from 'framer-motion';
import { foodData } from '@/data/foodData';

interface DiseaseSelectorProps {
  onSelect: (diseaseId: string) => void;
}

export default function DiseaseSelector({ onSelect }: DiseaseSelectorProps) {
  const diseases = Object.entries(foodData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Health Quest</span>
          </h1>
          <p className="text-gray-300 text-xl">
            Select a condition to explore foods in the FoodVerse
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diseases.map(([id, disease], index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(id)}
              className="cursor-pointer group"
            >
              <div
                className="relative h-64 rounded-2xl p-6 backdrop-blur-xl border border-white/20 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${disease.color}40 0%, ${disease.color}10 100%)`
                }}
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                  <motion.div
                    className="text-7xl mb-4"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {disease.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {disease.name}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {disease.description}
                  </p>
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                  style={{ background: disease.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
