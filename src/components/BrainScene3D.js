"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

function Brain({ theme }) {
  const brainRef = useRef();
  const particlesRef = useRef();

  const brainGeometry = useMemo(() => {
    const group = new THREE.Group();

    const leftHemisphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshStandardMaterial({
        color: theme === "dark" ? "#8fb5a8" : "#6ba89a",
        roughness: 0.4,
        metalness: 0.3,
        emissive: theme === "dark" ? "#2a4a3f" : "#1a3a2f",
        emissiveIntensity: 0.2,
      })
    );
    leftHemisphere.position.x = -0.3;
    leftHemisphere.scale.set(1, 1.1, 1.2);
    group.add(leftHemisphere);

    const rightHemisphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshStandardMaterial({
        color: theme === "dark" ? "#8fb5a8" : "#6ba89a",
        roughness: 0.4,
        metalness: 0.3,
        emissive: theme === "dark" ? "#2a4a3f" : "#1a3a2f",
        emissiveIntensity: 0.2,
      })
    );
    rightHemisphere.position.x = 0.3;
    rightHemisphere.scale.set(1, 1.1, 1.2);
    group.add(rightHemisphere);

    const cerebellum = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 32, 32),
      new THREE.MeshStandardMaterial({
        color: theme === "dark" ? "#7a9d91" : "#5a8a7d",
        roughness: 0.5,
        metalness: 0.3,
        emissive: theme === "dark" ? "#2a4a3f" : "#1a3a2f",
        emissiveIntensity: 0.15,
      })
    );
    cerebellum.position.set(0, -0.8, -0.3);
    group.add(cerebellum);

    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 0.8, 16),
      new THREE.MeshStandardMaterial({
        color: theme === "dark" ? "#6a8a7d" : "#4a7a6d",
        roughness: 0.6,
        metalness: 0.2,
      })
    );
    stem.position.set(0, -1.3, 0);
    group.add(stem);

    const bumpCount = 40;
    for (let i = 0; i < bumpCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.15 + Math.random() * 0.15;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 1.1;
      const z = radius * Math.cos(phi) * 1.2;

      if (y > -0.5) {
        const bump = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 8, 8),
          new THREE.MeshStandardMaterial({
            color: theme === "dark" ? "#a5c4b8" : "#7fb5a8",
            roughness: 0.3,
            metalness: 0.4,
          })
        );
        bump.position.set(x, y, z);
        group.add(bump);
      }
    }

    return group;
  }, [theme]);

  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.8 + Math.random() * 1.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const hue = 0.45 + Math.random() * 0.1;
      color.setHSL(hue, 0.6, theme === "dark" ? 0.5 : 0.4);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [theme]);

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.002;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      particlesRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <group ref={brainRef} position={[0, 0.5, 0]}>
        <primitive object={brainGeometry} />
      </group>

      <points ref={particlesRef} position={[0, 0.5, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export default function BrainScene3D({ theme }) {
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={theme === "dark" ? 0.3 : 0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={theme === "dark" ? 0.8 : 1}
          castShadow
        />
        <pointLight
          position={[-5, -5, -5]}
          intensity={theme === "dark" ? 0.4 : 0.6}
          color={theme === "dark" ? "#6ba89a" : "#8fb5a8"}
        />
        <Brain theme={theme} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Environment preset={theme === "dark" ? "night" : "sunset"} />
      </Suspense>
    </Canvas>
  );
}
