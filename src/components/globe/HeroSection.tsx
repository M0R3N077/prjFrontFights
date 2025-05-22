
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    // Animação com GSAP
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }).from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");
  }, []);
  
  return (
    <div className="hero-overlay">
      <h1 
        ref={titleRef} 
        className="hero-title"
      >
        Descubra as <span className="text-martial">Lutas</span> ao Redor do Mundo
      </h1>
      <p 
        ref={subtitleRef} 
        className="hero-subtitle" 
      >
        Explore a rica herança cultural das lutas em diferentes países. 
        Clique nos pontos vermelhos para aprender mais.
      </p>
    </div>
  );
};

export default HeroSection;
