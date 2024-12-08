import { useGameStore } from '../store/gameStore';
import { DoubleSide } from 'three';
import { useState } from 'react';

export default function Grid() {
  const placeToken = useGameStore((state) => state.placeToken);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const [hoveredPole, setHoveredPole] = useState<[number, number] | null>(null);

  const getPlayerColor = (isHovered: boolean) => {
    if (!isHovered) return '#e2e8f0';
    return currentPlayer === 1 ? '#f43f5e' : '#3b82f6';
  };

  const getPlayerEmissiveColor = (isHovered: boolean) => {
    if (!isHovered) return '#000000';
    return currentPlayer === 1 ? '#ef4444' : '#60a5fa';
  };

  return (
    <group position={[0, -1, 0]}>
      {/* Base platform */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4, 0.2, 32]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* Grid poles - 4x4 grid */}
      {Array.from({ length: 4 }).map((_, x) =>
        Array.from({ length: 4 }).map((_, z) => {
          const posX = (x - 1.5) * 1.5;
          const posZ = (z - 1.5) * 1.5;
          const isHovered = hoveredPole?.[0] === x && hoveredPole?.[1] === z;
          
          return (
            <group key={`grid-${x}-${z}`} position={[posX, 0, posZ]}>
              {/* Vertical pole */}
              <mesh castShadow receiveShadow position={[0, 2, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 4, 16]} />
                <meshStandardMaterial
                  color={getPlayerColor(isHovered)}
                  metalness={0.4}
                  roughness={0.3}
                  emissive={getPlayerEmissiveColor(isHovered)}
                  emissiveIntensity={isHovered ? 0.8 : 0}
                />
              </mesh>
              {/* Hover indicator ring */}
              {isHovered && (
                <mesh position={[0, 3.8, 0]}>
                  <torusGeometry args={[0.15, 0.02, 16, 32]} />
                  <meshStandardMaterial
                    color={getPlayerColor(true)}
                    emissive={getPlayerEmissiveColor(true)}
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.9}
                  />
                </mesh>
              )}
              {/* Clickable area */}
              <mesh
                position={[0, 2, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  placeToken(x, z);
                }}
                onPointerEnter={() => setHoveredPole([x, z])}
                onPointerLeave={() => setHoveredPole(null)}
              >
                <cylinderGeometry args={[0.3, 0.3, 4, 16]} />
                <meshStandardMaterial
                  transparent
                  opacity={0}
                  side={DoubleSide}
                />
              </mesh>
            </group>
          );
        })
      )}
    </group>
  );
}