'use client';

import { motion } from 'framer-motion';

/**
 * MissionSection Component
 * Displays the mission and vision of NeuroVision AI
 */
export default function MissionSection() {
  return (
    <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neuro-cyan/5 via-transparent to-neuro-cyan/5" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          data-aos="fade-up"
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-8 glow-text">
            Our Mission
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-roboto text-lg md:text-xl lg:text-2xl text-neuro-gray leading-relaxed mb-8"
          >
            Empowering clinicians and researchers with AI tools that visualize the invisible — 
            enabling earlier, more accurate detection of brain tumors.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-roboto text-base md:text-lg text-neuro-gray/80 leading-relaxed"
          >
            Through the fusion of deep learning and 3D visualization, we're making advanced 
            medical imaging analysis accessible to healthcare professionals worldwide, 
            accelerating diagnosis and improving patient outcomes.
          </motion.p>

          {/* Stats or additional content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-neuro-dark/50 border border-neuro-cyan/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="font-orbitron text-4xl font-bold text-neuro-cyan mb-2">AI-Powered</div>
              <div className="font-roboto text-neuro-gray">Deep Learning Models</div>
            </div>
            <div className="bg-neuro-dark/50 border border-neuro-cyan/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="font-orbitron text-4xl font-bold text-neuro-cyan mb-2">3D Precision</div>
              <div className="font-roboto text-neuro-gray">Interactive Visualization</div>
            </div>
            <div className="bg-neuro-dark/50 border border-neuro-cyan/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="font-orbitron text-4xl font-bold text-neuro-cyan mb-2">Clinical</div>
              <div className="font-roboto text-neuro-gray">Research & Practice</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated brain silhouette decoration */}
      <div className="absolute top-1/2 right-0 transform translate-y-1/2 opacity-10 pointer-events-none">
        <div className="w-96 h-96 border-2 border-neuro-cyan rounded-full animate-pulse" />
      </div>
      <div className="absolute top-1/2 left-0 transform translate-y-1/2 opacity-10 pointer-events-none">
        <div className="w-96 h-96 border-2 border-neuro-cyan rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
}

