'use client';

import { useRef } from 'react';
import Brain3D from './Brain3D';
import { motion } from 'framer-motion';

/**
 * HeroSection Component
 * Main landing section with 3D brain visualization and call-to-action buttons
 */
export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    demoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neuro-dark via-neuro-dark to-transparent opacity-80" />
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 glow-text"
            >
              AI-Powered
              <br />
              <span className="text-neuro-cyan">Brain Tumor</span>
              <br />
              Detection
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-roboto text-lg sm:text-xl md:text-2xl text-neuro-gray mb-8 leading-relaxed"
            >
              Discover, Diagnose, and Visualize — in 3D precision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToDemo}
                className="px-8 py-4 bg-neuro-cyan text-neuro-dark font-montserrat font-bold rounded-lg 
                         hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105
                         shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80"
              >
                Try Demo
              </button>
              
              <button
                onClick={scrollToFeatures}
                className="px-8 py-4 border-2 border-neuro-cyan text-neuro-cyan font-montserrat font-bold rounded-lg 
                         hover:bg-neuro-cyan hover:text-neuro-dark transition-all duration-300 transform hover:scale-105
                         btn-glow"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* 3D Brain Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full"
          >
            <Brain3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-neuro-cyan rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-neuro-cyan rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

