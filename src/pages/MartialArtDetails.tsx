
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/buttonSlider';
import { martialArts } from '@/data/globeData';
import { useAuth } from '@/contexts/AuthContext';

gsap.registerPlugin(ScrollTrigger);

const MartialArtDetails = () => {
  const { id } = useParams<{id: string}>();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const techniquesRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  
  // Find martial art from the data source
  const martialArt = martialArts.find(art => art.id === id);
  
  useEffect(() => {
    // Animations with GSAP
    const tl = gsap.timeline();
    
    tl.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }).from(contentRef.current?.querySelectorAll('p, h2'), {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");
    
    // Scroll animations
    if (techniquesRef.current) {
      gsap.from(techniquesRef.current.querySelectorAll('li'), {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: techniquesRef.current,
          start: "top 80%",
        }
      });
    }
    
    if (historyRef.current) {
      gsap.from(historyRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: historyRef.current,
          start: "top 80%",
        }
      });
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [id]);
  
  if (!martialArt) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-28 text-center">
          <h1 className="text-3xl font-bold mb-4">Arte marcial não encontrada</h1>
          <Link to="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Use a default image path if image property doesn't exist
  const imagePath = martialArt.image || '/martial-art-placeholder.jpg';
  // Use default techniques if techniques property doesn't exist
  const techniques = martialArt.techniques || ['Técnica 1', 'Técnica 2', 'Técnica 3', 'Técnica 4', 'Técnica 5'];
  // Use default history if history property doesn't exist
  const history = martialArt.history || 'Informações históricas sobre esta arte marcial estarão disponíveis em breve.';
  // Get fighters for this martial art
  const fighters = martialArt.fighters || [
    { name: "Fighter 1", record: "20-2", country: "Brasil" },
    { name: "Fighter 2", record: "18-4", country: "EUA" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div 
        ref={headerRef}
        className="h-[50vh] relative flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{martialArt.name}</h1>
          <p className="text-xl text-martial">{martialArt.country} • {martialArt.origin || 'Origem desconhecida'}</p>
        </div>
      </div>
      
      <div className="container mx-auto py-16 px-4" ref={contentRef}>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed mb-12">{martialArt.description}</p>
          
          <h2 className="text-3xl font-bold mb-6">Principais Lutadores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {fighters.map((fighter, index) => (
              <div key={index} className="bg-secondary p-4 rounded-lg">
                <h3 className="text-lg font-bold">{fighter.name}</h3>
                <p>Cartel: {fighter.record}</p>
                <p>País: {fighter.country}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-3xl font-bold mb-6">Principais Técnicas</h2>
          <div ref={techniquesRef} className="mb-12">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techniques.map((technique, index) => (
                <li 
                  key={index} 
                  className="bg-secondary p-4 rounded-lg flex items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-martial flex items-center justify-center mr-3 text-white">
                    {index + 1}
                  </div>
                  <span>{technique}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <h2 className="text-3xl font-bold mb-6">História</h2>
          <div ref={historyRef} className="bg-secondary/50 p-6 rounded-xl mb-12">
            <p className="leading-relaxed">{history}</p>
          </div>

           <h2 className="text-3xl font-bold mb-6">Folosfia</h2>
          <div ref={historyRef} className="bg-secondary/50 p-6 rounded-xl mb-12">
            <p className="leading-relaxed">{martialArt.philosofy}</p>
          </div>
          
          <div className="mb-12">
            <Link to={`/fight-social/${id}`}>
              <Button 
                variant="default" 
                className="bg-martial text-white hover:bg-martial/80 w-full py-6 text-lg"
              >
                Vote em enquetes e descubra a opinião dos outros usuários
              </Button>
            </Link>
          </div>
          
          <div className="mb-12">
            <Link to={`/find-gyms/${id}`}>
              <Button 
                variant="outline" 
                className="border-martial text-white hover:bg-martial w-full py-6 text-lg"
              >
                Encontrar Academias Próximas
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/">
              <Button 
                variant="outline" 
                className="border-martial text-white hover:bg-martial"
              >
                Voltar ao Mapa Mundial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MartialArtDetails;
