"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Food, Verdict } from '@/data/foodData';
import * as THREE from 'three';

interface FoodPlanetProps {
  food: Food;
  position: [number, number, number];
  onClick: () => void;
}

function FoodPlanet({ food, position, onClick }: FoodPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const getColor = (verdict: Verdict): string => {
    switch (verdict) {
      case 'safe':
        return '#22c55e'; // green
      case 'moderate':
        return '#eab308'; // yellow
      case 'avoid':
        return '#ef4444'; // red
    }
  };

  const getEmissive = (verdict: Verdict): string => {
    switch (verdict) {
      case 'safe':
        return '#15803d';
      case 'moderate':
        return '#a16207';
      case 'avoid':
        return '#991b1b';
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={getColor(food.verdict)}
            emissive={getEmissive(food.verdict)}
            emissiveIntensity={hovered ? 0.8 : 0.4}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        <Text
          position={[0, 0, 0]}
          fontSize={0.6}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {food.emoji}
        </Text>
        {hovered && (
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {food.name}
          </Text>
        )}
      </group>
    </Float>
  );
}

interface FoodVerseSceneProps {
  foods: Food[];
  onFoodClick: (food: Food) => void;
}

export default function FoodVerseScene({ foods, onFoodClick }: FoodVerseSceneProps) {
  // Arrange planets in a circular orbit
  const getPosition = (index: number, total: number): [number, number, number] => {
    const radius = 5;
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 2; // Random vertical position
    return [x, y, z];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-screen"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />

        {/* Stars background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Food planets */}
        {foods.map((food, index) => (
          <FoodPlanet
            key={food.id}
            food={food}
            position={getPosition(index, foods.length)}
            onClick={() => onFoodClick(food)}
          />
        ))}

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl p-4">
        <h3 className="text-white font-bold mb-3 text-sm">Health Verdict</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <span className="text-white text-sm">Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
            <span className="text-white text-sm">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <span className="text-white text-sm">Avoid</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3">
        <p className="text-white text-sm">
          🖱️ <span className="font-semibold">Click planets</span> to learn more • Drag to rotate • Scroll to zoom
        </p>
      </div>
    </motion.div>
  );
}