"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function BrainScene({ theme, onLoaded }) {
  const brainRef = useRef();
  const particlesRef = useRef();

  // Notify parent when loaded
  useMemo(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  // Create brain-like shape using multiple spheres
  const brainGeometry = useMemo(() => {
    const group = new THREE.Group();

    // Main brain shape - two hemispheres
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

    // Cerebellum (back bottom)
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

    // Brain stem
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

    // Add some bumps (gyri) for texture
    const bumpCount = 40;
    for (let i = 0; i < bumpCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.15 + Math.random() * 0.15;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 1.1;
      const z = radius * Math.cos(phi) * 1.2;

      // Only add bumps to upper hemisphere (brain area)
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

  // Create neural network particles
  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // Random positions in a sphere around the brain
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.8 + Math.random() * 1.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color variation
      const hue = 0.45 + Math.random() * 0.1; // Green-cyan range
      color.setHSL(hue, 0.6, theme === "dark" ? 0.5 : 0.4);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [theme]);

  // Animate brain rotation and particle movement
  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.002;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;

      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      particlesRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <group ref={brainRef} position={[0, 0.5, 0]}>
        <primitive object={brainGeometry} />
      </group>

      {/* Neural network particles */}
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
