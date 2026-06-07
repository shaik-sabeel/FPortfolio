import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';

function FloatingShape({ shape = 'torus', position = [0, 0, 0], color = '#915EFF', size = 1, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;
    if (meshRef.current) {
      // Rotate shape
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      
      // Interactive parallax based on mouse
      meshRef.current.rotation.x += state.pointer.y * 0.05;
      meshRef.current.rotation.y += state.pointer.x * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {shape === 'torus' && <torusGeometry args={[size * 0.8, size * 0.25, 16, 64]} />}
      {shape === 'sphere' && <sphereGeometry args={[size * 0.9, 32, 32]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[size, 0]} />}
      {shape === 'cone' && <coneGeometry args={[size * 0.7, size * 1.5, 32]} />}
      
      <meshStandardMaterial
        color={color}
        roughness={0.15}
        metalness={0.85}
        wireframe={false}
      />
    </mesh>
  );
}

export default function Canvas3D() {
  return (
    <div className="canvas-container select-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D4FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#915EFF" />
        <directionalLight position={[0, 5, 0]} intensity={1} color="#F59E0B" />
        
        <Suspense fallback={null}>
          {/* Central Large Torus */}
          <FloatingShape
            shape="torus"
            position={[1.5, 0.5, 0]}
            color="#915EFF"
            size={1.3}
            speed={0.8}
          />
          
          {/* Secondary Sphere */}
          <FloatingShape
            shape="sphere"
            position={[-2, -1, 1]}
            color="#00D4FF"
            size={0.7}
            speed={1.2}
          />
          
          {/* Small Accent Octahedron */}
          <FloatingShape
            shape="octahedron"
            position={[2, -1.8, -1]}
            color="#F59E0B"
            size={0.5}
            speed={1.5}
          />

          {/* Upper Cone */}
          <FloatingShape
            shape="cone"
            position={[-1.5, 1.8, -1.5]}
            color="#ec4899"
            size={0.6}
            speed={0.9}
          />
        </Suspense>

        {/* Subtle controls, auto rotate disabled, user can interactively spin them slightly */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
