
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

interface EarthProps {
  autoRotate?: boolean;
}

const Earth = ({ autoRotate = true }: EarthProps) => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Use a more reliable and commonly used Earth texture URL
  const colorMap = useTexture('https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg');
  
  useEffect(() => {
    if (colorMap) {
      // Configure texture with proper wrapping for complete sphere coverage
      colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
      // Removed encoding since it's not needed for this texture
    }
  }, [colorMap]);
  
  useFrame(({ clock }) => {
    if (earthRef.current && autoRotate) {
      // Smooth automatic rotation
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <mesh ref={earthRef} >
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial 
        map={colorMap}
        roughness={0.7}
        metalness={0.2}
      />
    </mesh>
  );
};

export default Earth;
