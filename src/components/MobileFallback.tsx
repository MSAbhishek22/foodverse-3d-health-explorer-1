"use client";

import { motion } from 'framer-motion';
import { Smartphone, ExternalLink } from 'lucide-react';

export default function MobileFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-md"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mb-6"
        >
          <Smartphone className="w-24 h-24 mx-auto text-purple-400" />
        </motion.div>

        <h1 className="text-4xl font-bold text-white mb-4">
          FoodVerse is best experienced on desktop
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          Our immersive 3D experience requires a larger screen and more powerful hardware. 
          Please visit us on a desktop or laptop computer for the full cosmic journey!
        </p>

        <div className="bg-purple-900/30 border border-purple-500/50 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-white font-bold mb-3">Meanwhile, explore:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-2xl">🥦</span>
              <span>Research-backed nutrition insights</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-2xl">🩸</span>
              <span>Disease-specific food guidance</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-2xl">🌌</span>
              <span>Interactive 3D food planets</span>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-6">
          Bookmark this page and come back on desktop!
        </p>
      </motion.div>
    </div>
  );
}
