
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, BoxGeometry, MeshStandardMaterial, Box3 } from 'three';

interface Model3DProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// This component must only be used within a Canvas component from @react-three/fiber
const Model3D = ({ modelPath, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: Model3DProps) => {
  const modelRef = useRef<Mesh>(null);
  
  // Try to load the 3D model, and handle loading errors
  let object;
  try {
    // Load the 3D model using useGLTF hook from drei (safely within Canvas)
    const { scene } = useGLTF(modelPath);
    
    // Clone the scene to avoid sharing materials between instances
    object = scene.clone();
    
    // Log successful model loading
    console.log(`Successfully loaded model: ${modelPath}`);
  } catch (error) {
    console.warn(`Could not load model at ${modelPath}. Using fallback geometry.`);
    console.error(error);
    
    // Create a fallback geometry (a simple colored box)
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ 
      color: 0x007bff,
      wireframe: true,
    });
    
    object = new Mesh(geometry, material);
  }

  return (
    <primitive 
      ref={modelRef}
      object={object} 
      position={position} 
      rotation={rotation} 
      scale={scale} 
      dispose={null}
    />
  );
};

export default Model3D;

// Preloading is now managed in the OlympicSportsSlider component with proper error handling
