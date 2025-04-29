import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Model() {
  const ref = useRef();
  const { scene } = useGLTF('/src/assets/Molecular_Network_Des_0429142419_texture.glb');
  // const { scene } = useGLTF('/src/assets/desktop_pc/scene.gltf');
  // Set initial rotation in useEffect
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.y = Math.PI; // 180 degrees
    }
  }, []);
  // Track elapsed time
  // Animate rotation with sine wave oscillation
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    ref.current.rotation.y = Math.PI + Math.sin(elapsed * 1) * 0.3; // base 180° + oscillation
  });

  return <primitive ref={ref} object={scene} scale={5} position={[0, 0, 0]} />;
}

const SplineObject = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] relative">
        <Canvas
          camera={{ position: [11, 2, 0], fov: 95 }}
          // camera={{ position: [10, 4, -5], fov: 95 }}
          className="w-full h-full"
        >
          {/* Main ambient light */}
          <ambientLight intensity={0.8} />

          {/* Directional white light */}
          <directionalLight position={[10, 10, 5]} intensity={1.5} />

          {/* Spotlight for depth */}
          {/* <spotLight
            position={[0, 10, 10]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
          /> */}

          {/* Teal glow light (custom) */}
          <pointLight
            position={[2, 5, 2]}
            intensity={1.5}
            color="#02ECD1"
          />

          <Model />
          <OrbitControls
            enableZoom={false}
            enablePan={true}
            enableRotate={true}
            // minDistance={5}
            // maxDistance={20}
          />
        </Canvas>

      </div>
    </Suspense>
  );
};

const LoadingFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-[#02ECD1] font-montserrat text-xl">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#02ECD1]"></div>
    </div>
  </div>
);

export default SplineObject;
