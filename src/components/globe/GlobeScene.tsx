
import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Earth from './Earth';
import MartialArtMarker from './MartialArtMarker';
import { latLngToVector3, martialArts } from '@/data/globeData';
import * as THREE from 'three';

interface GlobeSceneProps {
  onMarkerClick: (id: string) => void;
  targetMartialArtId?: string | null;
}

const Scene = ({ onMarkerClick, targetMartialArtId }: { 
  onMarkerClick: (id: string) => void;
  targetMartialArtId?: string | null;
}) => {
  const globeRadius = 2.5;
  const controlsRef = useRef<any>(null);

  // Efeito para girar o globo até a arte marcial selecionada
  useEffect(() => {
    if (targetMartialArtId && controlsRef.current) {
      const targetArt = martialArts.find(art => art.id === targetMartialArtId);
      
      if (targetArt) {
        const { lat, lng } = targetArt.coords;
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        
        // Calcular a posição da câmera para olhar para o ponto
        const targetPosition = new THREE.Vector3(
          -Math.sin(phi) * Math.cos(theta) * 6,
          Math.cos(phi) * 6,
          Math.sin(phi) * Math.sin(theta) * 6
        );
        
        // Animação suave para a nova posição
        const startPosition = new THREE.Vector3().copy(controlsRef.current.object.position);
        const duration = 2000; // 2 segundos
        const startTime = Date.now();
        
        const animate = () => {
          const now = Date.now();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Interpolação suave
          const easedProgress = easeInOutCubic(progress);
          
          // Interpolar posição
          const newPosition = new THREE.Vector3().lerpVectors(startPosition, targetPosition, easedProgress);
          controlsRef.current.object.position.copy(newPosition);
          
          // Continuar animação se não estiver completa
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        // Iniciar animação
        animate();
      }
    }
  }, [targetMartialArtId]);

  // Função para suavizar a animação
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  return (
    <>
      {/* Enhanced lighting for better Earth texture visibility */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <directionalLight position={[-5, -3, -5]} intensity={1} color="white" />
      
      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      
      {/* Earth globe */}
      <Earth autoRotate={false} />
      
      {/* Martial art markers */}
      {martialArts.map((art) => (
        <MartialArtMarker
          key={art.id}
          position={latLngToVector3(art.coords.lat, art.coords.lng, globeRadius * 1.01)}
          name={art.name}
          id={art.id}
          country={art.country}
          description={art.description}
          onClick={onMarkerClick}
        />
      ))}
      
      {/* Orbit controls for interaction */}
      <OrbitControls 
        ref={controlsRef}
        enableZoom={true}
        minDistance={3.5}
        maxDistance={12}
        enablePan={false}
        autoRotate={false}
        autoRotateSpeed={0.5}
        rotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};

const GlobeContainer = ({ onMarkerClick, targetMartialArtId }: GlobeSceneProps) => {
  return (
    <div className="globe-container w-full h-full">
      <Canvas 
        camera={{ position: [-3, 2, 6], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={window.devicePixelRatio}
        style={{ position: 'absolute', width: '240%', height: '100%', right: '-45%' }}
      >
        <Suspense fallback={null}>
          <Scene onMarkerClick={onMarkerClick} targetMartialArtId={targetMartialArtId} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GlobeContainer;
