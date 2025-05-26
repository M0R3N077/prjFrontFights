
import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Loader } from '@react-three/drei';
import { olympicCombatSports } from '../../data/OlympicSportsData';
import SportScene from './SportScene';
import SportInfo from './SportInfo';
import { ArrowLeft, ArrowRight, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from "../ui/buttonSlider";
import { Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import logo from '../../../public/logos/whiteLogo.png';
import './OlympicSportsSlider.css';

const OlympicSportsSlider = () => {
   const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadErrors, setLoadErrors] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const activeSport = olympicCombatSports[activeIndex];

  // Safely try to preload all models upfront to improve loading performance
  useEffect(() => {
  const errors: string[] = [];

  // Preload all models diretamente — sem promessas nem async
  olympicCombatSports.forEach((sport) => {
    try {
      useGLTF.preload(sport.modelPath);
      console.log(`Preloaded model: ${sport.modelPath}`);
    } catch (err: any) {
      const errorMessage = `Failed to preload model for ${sport.name}: ${err.message}`;
      console.warn(errorMessage);
      errors.push(errorMessage);
    }
  });

  // Salva erros, se houver
  if (errors.length > 0) {
    setLoadErrors(errors);
  }

  // Considera que os modelos foram carregados (mesmo que com erros)
  setModelsLoaded(true);

  // Cleanup quando o componente for desmontado
  return () => {
    olympicCombatSports.forEach((sport) => {
      try {
        useGLTF.clear(sport.modelPath);
      } catch (err: any) {
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

   const handleMarkerClick = (id: string) => {
    navigate(`/martial-art/${id}`);
  };


  return (
    <div className="olympic-scene-container">
      {/* Logo */}
      <div className="olympic-logo cursor-pointer"
      onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="w-20 sm:w-32" />
      </div>

      {/* Title */}
      <div className="olympic-title">
        <div className="olympic-title-content">
          <h1 className="olympic-title-text">
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
      
      {/* 3D Canvas */}
      <div className="olympic-canvas-container" style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s ease' }}>
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
      
      {/* Info Panel */}
      <SportInfo sport={activeSport} isActive={!isTransitioning}  />
      
      {/* Navigation Arrows */}
      <button 
        className="olympic-nav-arrow olympic-nav-left" 
        onClick={goPrev}
        disabled={isTransitioning}
      >
        <ArrowLeft size={24} className="text-white sm:w-8 sm:h-8" />
      </button>
      
      <button 
        className="olympic-nav-arrow olympic-nav-right" 
        onClick={goNext}
        disabled={isTransitioning}
      >
        <ArrowRight size={24} className="text-white sm:w-8 sm:h-8" />
      </button>
      
      {/* Control Panel */}
      <div className="olympic-control-panel">
        <Button onClick={zoomIn} variant="outline" size="icon" className="olympic-control-btn">
          <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <Button onClick={zoomOut} variant="outline" size="icon" className="olympic-control-btn">
          <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
      
      {/* Pagination indicator */}
      <div className="olympic-pagination">
        {olympicCombatSports.map((sport, index) => (
          <button
            key={sport.id}
            className={`olympic-pagination-dot ${
              index === activeIndex ? 'olympic-pagination-dot-active' : ''
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