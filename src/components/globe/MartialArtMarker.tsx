
import { useState, useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';

interface MartialArtMarkerProps {
  position: Vector3;
  name: string;
  id: string;
  country: string;
  description: string;
  onClick: (id: string) => void;
}

const MartialArtMarker = ({ position, name, id, country, description, onClick }: MartialArtMarkerProps) => {
  const [hovered, setHovered] = useState(false);
  const markerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handlePointerEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovered(true);
  };

  const handlePointerLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHovered(false);
    }, 300); // 300ms tolerance
  };

  // Glow effect
  useEffect(() => {
    if (!glowRef.current) return;
    glowRef.current.scale.set(hovered ? 1.5 : 1.0, hovered ? 1.5 : 1.0, hovered ? 1.5 : 1.0);
  }, [hovered]);

  return (
    <group position={position}>
      {/* White dot */}
      <mesh
        ref={markerRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          handlePointerEnter();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          handlePointerLeave();
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#ff3a3a" transparent opacity={0.9} />
      </mesh>

      {/* Red glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ff3a3a" transparent opacity={0.5} />
      </mesh>

      {/* Tooltip */}
      {hovered && (
        <Html
          position={[0.8, 0, 0]}
          center
          distanceFactor={5}
          sprite
        >
          <div
            className="w-[140px] rounded-md overflow-hidden bg-black/80 ring-[.8px] ring-red-600 text-white shadow-lg transition-all transform scale-90"
            onPointerEnter={(e) => {
              e.stopPropagation();
              handlePointerEnter();
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              handlePointerLeave();
            }}
          >
            <div className="p-1">
              <h3 className="text-xs font-bold">{name}</h3>
              <p className="text-xs opacity-90">{country}</p>
            </div>
            <div className="p-1">
              <p className="text-xs mb-1">
                {description.length > 40 ? `${description.substring(0, 40)}...` : description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(id);
                }}
                className="bg-martial text-white text-xs py-0.5 px-1 rounded text-left hover:bg-martial-dark transition-colors"
              >
                VER DETALHES E CHAT
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

export default MartialArtMarker;
