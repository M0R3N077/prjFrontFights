import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/martialCard';
import { Badge } from '@/components/ui/badge';
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
  const fighters = martialArt.famousFighters || [
    { name: "Fighter 1", record: "20-2", country: "Brasil" },
    { name: "Fighter 2", record: "18-4", country: "EUA" }
  ];

  // Extract additional data with fallbacks
  const origin = martialArt.origin || 'Origem desconhecida';
  const foundedBy = martialArt.foundedBy || ['Desconhecido'];
  const parentArts = martialArt.parentArts || ['Nenhuma'];
  const beltSystem = martialArt.beltSystem;
  const philosophy = martialArt.philosophy || 'Não disponível';
  const howFight = martialArt.howFight || 'Não disponível';
  const competitionFormats = martialArt.competitionFormats || ['Não disponível'];
  const governingBodies = martialArt.governingBodies || ['Não disponível'];
  const influence = martialArt.influence || { cultura: 'Não disponível', educação: 'Não disponível', internacional: 'Não disponível' };
  const curiosities = martialArt.curiosities || ['Não disponível'];

   // Extract influence data properly
  const influenceData = typeof influence === 'string' 
    ? { cultura: influence, educação: 'Não disponível', internacional: 'Não disponível' }
    : {
         cultura: influence.cultura || 'Não disponível',
        educação: influence.educação || 'Não disponível', 
        internacional: influence.internacional || 'Não disponível'
      };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
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
        <div className="relative z-10 text-center mt-28 sm:mt-0 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{martialArt.name}</h1>
          <p className="text-xl text-white  opacity-90">{martialArt.country} • {origin}</p>
        </div>
      </div>
      
      <div className="container mx-auto py-16 px-4" ref={contentRef}>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed mb-12 text-center">{martialArt.description}</p>
          
          {/* Informações Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Origem e Fundação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-semibold text-muted-foreground">Local:</span>
                  <p className="text-foreground">{origin}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Fundada por:</span>
                  <ul className="list-disc list-inside">
                    {foundedBy.map((founder, index) => (
                      <li key={index} className="text-foreground">{founder}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Artes Parentes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {parentArts.map((art, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-foreground">{art}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Sistema de Graduação */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">Sistema de Graduação</CardTitle>
            </CardHeader>
            <CardContent>
              {typeof beltSystem === 'string' ? (
                <p className="text-lg leading-relaxed">{beltSystem}</p>
               ) : beltSystem && typeof beltSystem === 'object' ? (
                <div>
                  {beltSystem.capoeiraRegional && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Capoeira Regional:</h4>
                      <div className="flex flex-wrap gap-2">
                        {beltSystem.capoeiraRegional.map((belt, index) => (
                          <Badge key={index} variant="secondary">
                            {belt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )} 
                  {beltSystem.everyone && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Para Todos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {beltSystem.everyone.map((belt, index) => (
                          <Badge key={index} variant="secondary">
                            {belt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                   {beltSystem.adult && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Para Adultos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {beltSystem.adult.map((belt, index) => (
                          <Badge key={index} variant="secondary">
                            {belt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                   {beltSystem.kids && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Para Crianças:</h4>
                      <div className="flex flex-wrap gap-2">
                        {beltSystem.kids.map((belt, index) => (
                          <Badge key={index} variant="secondary">
                            {belt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {beltSystem.everyoneWithObs && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {beltSystem.everyoneWithObs.map((belt, index) => (
                          <Badge key={index} variant="secondary">
                            {belt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {beltSystem.observação && (
                    <p className="text-muted-foreground italic mt-4">{beltSystem.observação}</p>
                  )}
                </div>
                   ) : (
                <p className="text-lg leading-relaxed">Sistema de graduação não especificado</p>
              )}
            </CardContent>
          </Card>
          
          {/* Principais Lutadores */}
          <h2 className="text-3xl font-bold mb-6 text-primary">Principais Lutadores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {fighters.map((fighter, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {fighter.image && (
                      <img 
                        src={fighter.image} 
                        alt={fighter.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-2">{fighter.name}</h3>
                      <p className="text-muted-foreground mb-1">
                        <span className="font-semibold">Cartel:</span> {fighter.record}
                      </p>
                      <p className="text-muted-foreground mb-2">
                        <span className="font-semibold">País:</span> {fighter.country}
                      </p>
                      {fighter.titles && (
                        <div>
                          <span className="font-semibold text-muted-foreground">Títulos:</span>
                          <ul className="list-disc list-inside text-sm text-foreground">
                            {fighter.titles.map((title, titleIndex) => (
                              <li key={titleIndex}>{title}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Principais Técnicas */}
          <h2 className="text-3xl font-bold mb-6 text-primary">Principais Técnicas</h2>
          <div ref={techniquesRef} className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techniques.map((technique, index) => (
                <Card 
                  key={index} 
                  className="hover:bg-accent transition-colors cursor-pointer"
                >
                  <CardContent className="p-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-foreground">{technique}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Filosofia com design melhorado */}
          <Card className="mb-12 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-3xl text-primary flex items-center">
                <span className="mr-3">🧘</span>
                Filosofia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-muted pl-6 italic text-lg leading-relaxed text-foreground">
                {philosophy}
              </blockquote>
            </CardContent>
          </Card>
          
          {/* Como Lutar com design melhorado */}
          <Card className="mb-12 border-l-4 border-l-destructive">
            <CardHeader>
              <CardTitle className="text-3xl text-primary flex items-center">
                <span className="mr-3">⚔️</span>
                Como se Luta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-lg">
                <p className="text-lg leading-relaxed text-foreground">{howFight}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* História com design melhorado */}
          <Card className="mb-12 border-l-4 border-l-secondary" ref={historyRef}>
            <CardHeader>
              <CardTitle className="text-3xl text-primary flex items-center">
                <span className="mr-3">📜</span>
                História
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-secondary/20 via-transparent to-primary/10 p-6 rounded-lg">
                <p className="text-lg leading-relaxed text-foreground first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                  {history}
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Formatos de Competição e Organizações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Formatos de Competição</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {competitionFormats.map((format, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-foreground">{format}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-primary">Organizações Governamentais</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {governingBodies.map((body, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-foreground">{body}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Influência Mundial corrigida */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">Influência Mundial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-primary">🎭 Cultural</h4>
                  <p className="text-foreground leading-relaxed">{influenceData.cultura}</p>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-primary">📚 Educacional</h4>
                  <p className="text-foreground leading-relaxed">{influenceData.educação}</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-primary">🌍 Internacional</h4>
                  <p className="text-foreground leading-relaxed">{influenceData.internacional}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Curiosidades */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">Curiosidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {curiosities.map((curiosity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <p className="text-foreground leading-relaxed">{curiosity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Botões de Ação */}
          <div className="w-full px-4 mx-auto space-y-4 mb-12 flex flex-col">
  <Link to={`/fight-social/${id}`}>
    <Button 
      variant="default" 
      className="w-full h-full py-3 text-base sm:text-lg break-words whitespace-normal"
    >
      Vote em enquetes e descubra a opinião dos outros usuários
    </Button>
  </Link>

  <Link to={`/find-gyms/${id}`}>
    <Button 
      variant="outline" 
      className="w-full h-full py-3 text-base sm:text-lg break-words whitespace-normal"
    >
      Encontrar Academias Próximas
    </Button>
  </Link>
</div>

          
          <div className="text-center">
            <Link to="/">
              <Button 
                variant="outline"
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