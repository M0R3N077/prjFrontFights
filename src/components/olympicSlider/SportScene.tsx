import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';

import { OlympicSport } from '../../data/OlympicSportsData';
import Model3D from '../Model3D';

interface SportSceneProps {
  sport: OlympicSport;
  isActive: boolean;
}

const SportScene = ({ sport, isActive }: SportSceneProps) => {
  if (!isActive) return null;
  
  const modelRef = useRef<THREE.Group>(null);
  const floorRef = useRef<THREE.Mesh>(null);
  const [rotation, setRotation] = useState(0);

  const getModelConfig = () => {
    switch (sport.id) {
      case 'boxing':
        return { scale: 3, position: [0, -7, -10] as [number, number, number], floorColor: "#c82d2d" };
      case 'judo':
        return { scale: 0.021, position: [1, -3, 0] as [number, number, number], floorColor: "#3a5e8c" };
      case 'wrestling':
        return { scale: 0.08, position: [1, -2, -2] as [number, number, number], floorColor: "#4d3591" };
      case 'taekwondo':
        return { scale: 0.4, position: [0.5, 0.5, 0] as [number, number, number], floorColor: "#2c7873" };
      case 'fencing':
        return { scale: 3.2, position: [0, 0, 0] as [number, number, number], floorColor: "#c77f3e" };
      case 'karate':
        return { scale: 2.5, position: [0, -2, 0] as [number, number, number], floorColor: "#633e1c" };
      default:
        return { scale: 1.0, position: [0, -1.0, 0] as [number, number, number], floorColor: "#2d5c8c" };
    }
  };

  const modelConfig = getModelConfig();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05 + rotation;
    }
    
    if (floorRef.current) {
      floorRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.03 - 3;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
      
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.7} />
      <pointLight position={[0, 4, 0]} intensity={0.8} color={modelConfig.floorColor} />
 
      <group 
        ref={modelRef} 
        position={modelConfig.position}
      >
        <Model3D 
          modelPath={sport.modelPath}
          scale={modelConfig.scale}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
      </group>
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        enableRotate={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        dampingFactor={0.05}
        enableDamping={true}
        autoRotate={false}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
};

export default SportScene;
