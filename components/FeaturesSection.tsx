'use client';

import { motion } from 'framer-motion';

/**
 * FeaturesSection Component
 * Displays three main features of NeuroVision AI
 */
export default function FeaturesSection() {
  const features = [
    {
      icon: '🧠',
      title: 'AI Diagnosis',
      description: 'Detect abnormalities from MRI scans using advanced deep learning models trained on thousands of medical images.',
      delay: 0.1,
    },
    {
      icon: '🩻',
      title: '3D Visualization',
      description: 'Explore predictions in an interactive 3D brain model. Rotate, zoom, and analyze tumor locations with precision.',
      delay: 0.2,
    },
    {
      icon: '📊',
      title: 'Insights',
      description: 'Get detailed data on tumor size, region, confidence scores, and actionable insights for clinical decision-making.',
      delay: 0.3,
    },
  ];

  return (
    <section
      id="features-section"
      className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-4 glow-text">
            Powerful Features
          </h2>
          <p className="font-roboto text-neuro-gray text-lg md:text-xl max-w-2xl mx-auto">
            Leveraging cutting-edge AI to transform medical imaging analysis
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="feature-card bg-gradient-to-br from-neuro-dark/80 to-neuro-dark/40 
                       border border-neuro-cyan/20 rounded-xl p-8 backdrop-blur-sm"
            >
              {/* Icon */}
              <div className="text-6xl mb-6 text-center filter drop-shadow-lg">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-montserrat text-2xl font-bold mb-4 text-center text-neuro-cyan">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-roboto text-neuro-gray text-center leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-neuro-cyan to-transparent opacity-0 
                            transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neuro-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neuro-cyan/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

