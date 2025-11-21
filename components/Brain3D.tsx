'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Brain Model Component with GLTF loading
 * Loads and renders the 3D brain model with rotation animation
 * 
 * NOTE: To use your own brain model:
 * 1. Place brain.glb in /public/models/brain.glb
 * 2. Uncomment the useGLTF line below
 * 3. Comment out or remove the BrainModelFallback usage
 */
function BrainModelGLTF() {
  const meshRef = useRef<THREE.Group>(null);
  
  // Uncomment this line when you have a brain.glb file in /public/models/
  // const brainModel = useGLTF('/models/brain.glb', true);

  // Rotate the brain slowly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Uncomment this block when you have a brain model:
  // if (brainModel && brainModel.scene) {
  //   return (
  //     <primitive
  //       ref={meshRef}
  //       object={brainModel.scene.clone()}
  //       scale={[2, 2, 2]}
  //       position={[0, 0, 0]}
  //     />
  //   );
  // }

  return null;
}

/**
 * Fallback Brain Model Component
 * Creates a brain-like shape using geometries when GLTF is not available
 * This is shown by default until you add your own brain.glb model
 */
function BrainModelFallback() {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate the brain slowly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Left hemisphere */}
      <mesh position={[-0.5, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial
          color="#00FFFF"
          emissive="#00FFFF"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Right hemisphere */}
      <mesh position={[0.5, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial
          color="#00FFFF"
          emissive="#00FFFF"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Tumor highlight (example) */}
      <mesh position={[0.3, 0.5, 0.3]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#FF3B3F"
          emissive="#FF3B3F"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

/**
 * Brain Model Component
 * By default shows the fallback brain. 
 * When you add brain.glb, uncomment the GLTF loading code above.
 */
function BrainModel() {
  // For now, always show the fallback until user adds their model
  // To use your own model, modify BrainModelGLTF above and change this to:
  // return (
  //   <Suspense fallback={<BrainModelFallback />}>
  //     <BrainModelGLTF />
  //   </Suspense>
  // );
  
  return <BrainModelFallback />;
}

/**
 * Brain3D Component
 * Main wrapper for the Three.js brain visualization
 */
export default function Brain3D() {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-neuro-cyan/30 bg-gradient-to-br from-neuro-dark/50 to-neuro-dark">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00FFFF" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00CCFF" />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />

          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

          {/* Brain Model */}
          <BrainModel />

          {/* Controls - optional, can be disabled for auto-rotate only */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />

          {/* Environment for reflections */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the brain model (uncomment when you have the model file)
// useGLTF.preload('/models/brain.glb');
