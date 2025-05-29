
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import GlobeScene from '../components/globe/GlobeScene';
import LoadingScreen from '../components/loading/LoadingScreen';
import BurgerMenu from '../components/ui/menuBurger';
import { Search } from 'lucide-react';
import { martialArts } from '@/data/globeData';
import logo from '../../public/logos/whiteLogo.png';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [targetMartialArt, setTargetMartialArt] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  // Garantir que o carregamento seja encerrado corretamente
  useEffect(() => {
    console.log("Starting loading timer");
    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      console.log("Timer complete, setting loading to false");
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Função para garantir que saímos do estado de carregamento
  const handleLoadingComplete = () => {
    console.log("Loading complete callback triggered");
    setLoading(false);
  };

  const handleMarkerClick = (id: string) => {
    navigate(`/martial-art/${id}`);
  };

  const handleSearchFocus = () => {
    setSearchActive(true);
  };

  const handleSearchBlur = () => {
    if (!searchTerm) {
      setSearchActive(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Encontrar a arte marcial pelo nome
   const normalize = str =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const foundArt = martialArts.find(art =>
  normalize(art.name).includes(normalize(searchTerm))
);

    
    if (foundArt) {
      setTargetMartialArt(foundArt.id);
      // Limpar depois que o globo terminar de girar
      setTimeout(() => {
        setTargetMartialArt(null);
      }, 3000);
    }
    
    // Manter o foco no campo de pesquisa
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  // Renderizar a tela de carregamento enquanto loading for true
  if (loading) {
    console.log("Rendering loading screen");
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  console.log("Rendering main screen");
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="relative w-full h-screen">
        {/* Globe Scene - Garantindo que eventos do mouse sejam capturados */}
        <div className="absolute inset-0">
          <GlobeScene onMarkerClick={handleMarkerClick} targetMartialArtId={targetMartialArt} />
        </div>
        
        {/* Top bar with centered search and login */}
        <div className='w-full flex justify-start lg:justify-center pl-3 pt-5 '>
        <div className="w-1/3 z-20 ">
          <form onSubmit={handleSearch} className="relative ">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar luta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className={`search-input ${searchActive ? 'active' : ''}`}
            />
            <Search className="search-icon" size={18} />
          </form>
        </div>
        </div>
        
        {/* Login and profile buttons - Responsive */}
        <div className="fixed flex flex-row top-20 right-3 sm:top-7 md:top-6 sm:right-16  items-center gap-2 sm:gap-4 z-50">
          {isAuthenticated ? (
            <>
              <div className="text-white text-sm sm:text-base hidden sm:block">Olá, {user?.name}</div>
              <button 
                className="bg-red-700 py-1 px-3 sm:py-2 sm:px-7 font-semibold text-sm sm:text-lg text-white rounded-full hover:bg-white hover:text-red-600 transition-colors"
                onClick={logout}
              >
                Sair
              </button>
              <div 
                className="p-1 sm:p-2 font-semibold cursor-pointer rounded-full hover:bg-white transition-colors"
                onClick={() => navigate('/profile')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="red" stroke="red" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </>
          ) : (
            <>
              <button 
                className="bg-red-700 py-1 px-3 sm:py-2 sm:px-7 font-semibold text-sm sm:text-lg text-white rounded-full hover:bg-white hover:text-red-600 transition-colors"
                onClick={() => navigate('/login')}
              >
                ENTRAR
              </button>
              <div 
                className="p-1 sm:p-2 font-semibold cursor-pointer rounded-full hover:bg-white transition-colors"
                onClick={() => navigate('/profile')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="red" stroke="red" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </>
          )}
        </div>
        
        {/* Navigation options - Desktop only */}
        <ul className="absolute right-20 top-1/2 transform -translate-y-1/2 flex-col gap-12 z-10 hidden lg:flex">
          <NavButton 
            label="JOGO" 
            mobileLink="/mobile-game" 
            desktopLink="https://brawl-tec-jogo.netlify.app/"
          />
          <NavButton label="OLIMPÍADAS" onClick={() => navigate('/olympic-fighting')} />
          <NavButton label="CURIOSIDADES" onClick={() => navigate('/curiosities')} />
          <NavButton label="LINHA DO TEMPO" onClick={() => navigate('/timeline')} />
        </ul>

        {/* Mobile burger menu */}
        <div className="fixed top-6 right-2 z-50 lg:hidden">
          <BurgerMenu />
        </div>
        
        {/* Logo at bottom - Responsive */}
        <div className="absolute right-4 bottom-4 sm:right-12 sm:bottom-8 z-10">
          <img src={logo} alt="Logo" className="w-20 sm:w-32" />
        </div>
        
        {/* Instruction hint - Responsive */}
        <div className="instruction-hint z-20 pointer-events-none text-sm sm:text-base px-4 sm:px-0">
          Gire o globo com o mouse para explorar mais lutas
        </div>
      </div>
    </div>
  );
};

// Componente para os botões de navegação
const NavButton = ({ 
  label, 
  onClick, 
  mobileLink, 
  desktopLink, 
}: { 
  label: string; 
  onClick?: () => void; 
  mobileLink?: string; 
  desktopLink?: string; 
}) => {
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
  const checkScreen = () => {
    const mobile = window.innerWidth < 1024;
    console.log("📏 Width:", window.innerWidth, "→ isMobile:", mobile);
    setIsMobile(mobile);
  };
  checkScreen();
  window.addEventListener('resize', checkScreen);
  return () => window.removeEventListener('resize', checkScreen);
}, []);


  const handleClick = () => {
    console.log("clicou");
    
      if (isMobile) {
        console.log("Mobile detected 📱");
        navigate(mobileLink);
      } else {
        console.log("window");
        if (desktopLink.startsWith("http")) {
          window.location.href = desktopLink;
        } else {
          navigate(desktopLink);
        }
      }
    
  };
  
  return (
    <button 
      className="relative group"
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="text-white font-semibold text-[18px] tracking-wider p-4">
        {label}
      </span>

      {!hover && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-martial transition-all duration-300" />
      )}
      {hover && (
        <div className={`absolute -bottom-1 left-0 w-full h-8 border-2 border-martial rounded-full -z-10 transition-all duration-300 py-4`} />
      )}
    </button>
  );
};

export default Index;