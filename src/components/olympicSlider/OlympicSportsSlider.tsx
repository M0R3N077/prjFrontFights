
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Loader } from '@react-three/drei';
import { olympicCombatSports } from '../../data/OlympicSportsData';
import SportScene from './SportScene';
import SportInfo from './SportInfo';
import { ArrowLeft, ArrowRight, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from "../ui/buttonSlider";
import { Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';

const OlympicSportsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadErrors, setLoadErrors] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const activeSport = olympicCombatSports[activeIndex];

  // Safely try to preload all models upfront to improve loading performance
  useEffect(() => {
    const preloadModels = async () => {
      try {
        // Create a promise for each model load attempt
        const loadPromises = olympicCombatSports.map(sport => {
          return new Promise<void>((resolve) => {
            try {
              // Try to preload the model
              useGLTF.preload(sport.modelPath);
              console.log(`Preloaded model: ${sport.modelPath}`);
            } catch (err) {
              // Log error but continue - our Model3D component will handle the fallback
              const errorMessage = `Failed to preload model for ${sport.name}`;
              console.warn(`${errorMessage}: ${err.message}`);
              setLoadErrors(prev => [...prev, errorMessage]);
            }
            resolve();
          });
        });

        // Wait for all preload attempts to complete
        await Promise.all(loadPromises);
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error during model preloading:", error);
        // Consider models "loaded" even if there were errors, so the app can proceed
        setModelsLoaded(true);
      }
    };

    preloadModels();

    // Clean up on component unmount - safely try to clear models
    return () => {
      olympicCombatSports.forEach(sport => {
        try {
          useGLTF.clear(sport.modelPath);
        } catch (err) {
          console.warn(`Could not clear model ${sport.modelPath}: ${err.message}`);
        }
      });
    };
  }, []);

  const goNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => 
      prev === olympicCombatSports.length - 1 ? 0 : prev + 1
    );
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const goPrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => 
      prev === 0 ? olympicCombatSports.length - 1 : prev - 1
    );
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, isTransitioning]);

  // Handle zoom controls
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  return (
    <div className="scene-container">
      <Navbar />
      {/* Glassmorphic Title */}
      <div className="absolute top-8 left-0 right-0 z-10 text-center">
        <div className="inline-block backdrop-blur-md bg-white/10 px-8 py-4 rounded-xl border border-white/20 shadow-lg">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Modalidades Olímpicas de Luta
          </h1>
          
          {/* Model status notice */}
          {loadErrors.length > 0 && (
            <div className="mt-2 text-amber-300 text-sm">
              <p className="text-red-300 mt-1">
                Alguns modelos ou texturas não foram carregados corretamente. 
                Verifique se todos os arquivos estão nas pastas corretas.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* 3D Canvas with improved settings */}
      <div className="canvas-container" style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s ease' }}>
        <Canvas 
          shadows 
          style={{ 
            transition: 'opacity 0.5s',
            width: '100%',
            height: '100vh',
            background: 'transparent',
          }}
          camera={{ position: [0, 0, 10], fov: 50 }}
          dpr={[1, 2]}
          onError={(error) => {
            console.error("Canvas error:", error);
            setLoadErrors(prev => [...prev, "Canvas error encountered"]);
          }}
        >
          <Suspense fallback={null}>
            {olympicCombatSports.map((sport, index) => (
              <SportScene 
                key={sport.id} 
                sport={sport} 
                isActive={index === activeIndex}
              />
            ))}
          </Suspense>
        </Canvas>
      </div>
      
      {/* Loading indicator */}
      {/* <Loader /> */}
      
      {/* Info Panel with glassmorphism */}
      <SportInfo sport={activeSport} isActive={!isTransitioning}  />
      
      {/* Navigation Arrows - made larger and more visible */}
      <button 
        className="navigation-arrow left" 
        onClick={goPrev}
        disabled={isTransitioning}
      >
        <ArrowLeft size={32}  className="text-white" />
      </button>
      
      <button 
        className="navigation-arrow right" 
        onClick={goNext}
        disabled={isTransitioning}
      >
        <ArrowRight size={32} className="text-white" />
      </button>
      
      {/* Control Panel */}
      <div className="control-panel">
        <Button onClick={zoomIn} variant="outline" size="icon" className="control-btn">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button onClick={zoomOut} variant="outline" size="icon" className="control-btn">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Pagination indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {olympicCombatSports.map((sport, index) => (
          <button
            key={sport.id}
            className={`w-4 h-4 rounded-full transition-all ${
              index === activeIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setActiveIndex(index);
                setTimeout(() => setIsTransitioning(false), 1000);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OlympicSportsSlider;
