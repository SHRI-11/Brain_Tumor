'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Brain3D from './Brain3D';

/**
 * DemoSection Component
 * Placeholder section for MRI upload and visualization
 * To be integrated with backend API later
 */
export default function DemoSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/') || file.name.endsWith('.dcm')) {
        setSelectedFile(file);
        // TODO: Upload to backend and process
        console.log('File selected:', file.name);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // TODO: Upload to backend and process
      console.log('File selected:', file.name);
    }
  };

  return (
    <section
      id="demo-section"
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
            Try the AI
          </h2>
          <p className="font-roboto text-neuro-gray text-lg md:text-xl max-w-2xl mx-auto">
            Upload an MRI scan to visualize predictions in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-neuro-cyan bg-neuro-cyan/10 scale-105'
                  : 'border-neuro-cyan/30 hover:border-neuro-cyan/50'
              }`}
            >
              <div className="mb-6">
                <svg
                  className="mx-auto h-16 w-16 text-neuro-cyan"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <h3 className="font-montserrat text-xl font-bold mb-2 text-neuro-cyan">
                Upload MRI Scan
              </h3>
              <p className="font-roboto text-neuro-gray mb-4">
                Drag and drop your DICOM file or click to browse
              </p>

              <input
                type="file"
                id="file-input"
                accept=".dcm,.dicom,.nii,.nii.gz,image/*"
                onChange={handleFileInput}
                className="hidden"
              />

              <label
                htmlFor="file-input"
                className="inline-block px-6 py-3 bg-neuro-cyan text-neuro-dark font-montserrat 
                         font-bold rounded-lg cursor-pointer hover:bg-cyan-400 transition-all duration-300
                         transform hover:scale-105"
              >
                Choose File
              </label>

              {selectedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-neuro-dark/50 rounded-lg border border-neuro-cyan/30"
                >
                  <p className="font-roboto text-sm text-neuro-gray">
                    Selected: <span className="text-neuro-cyan">{selectedFile.name}</span>
                  </p>
                  <p className="font-roboto text-xs text-neuro-gray mt-2">
                    Processing... (Backend integration pending)
                  </p>
                </motion.div>
              )}
            </div>

            {/* Info box */}
            <div className="bg-neuro-dark/50 border border-neuro-cyan/20 rounded-lg p-6">
              <h4 className="font-montserrat font-bold mb-2 text-neuro-cyan">
                Supported Formats
              </h4>
              <ul className="font-roboto text-sm text-neuro-gray space-y-1">
                <li>• DICOM (.dcm, .dicom)</li>
                <li>• NIfTI (.nii, .nii.gz)</li>
                <li>• Standard image formats (PNG, JPEG)</li>
              </ul>
            </div>
          </motion.div>

          {/* Visualization Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-neuro-dark/50 border border-neuro-cyan/20 rounded-xl p-6">
              <h3 className="font-montserrat text-xl font-bold mb-4 text-neuro-cyan">
                3D Visualization
              </h3>
              <div className="h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                <Brain3D />
              </div>
              <p className="font-roboto text-sm text-neuro-gray mt-4 text-center">
                Interactive 3D brain model — rotate and explore tumor predictions
              </p>
            </div>

            {/* Results placeholder */}
            <div className="bg-gradient-to-br from-neuro-dark/80 to-neuro-dark/40 border border-neuro-cyan/20 rounded-xl p-6">
              <h4 className="font-montserrat font-bold mb-4 text-neuro-cyan">
                Analysis Results
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-roboto text-neuro-gray">Tumor Detected:</span>
                  <span className="font-montserrat text-neuro-cyan">Pending...</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-roboto text-neuro-gray">Confidence:</span>
                  <span className="font-montserrat text-neuro-cyan">—</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-roboto text-neuro-gray">Location:</span>
                  <span className="font-montserrat text-neuro-cyan">—</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

