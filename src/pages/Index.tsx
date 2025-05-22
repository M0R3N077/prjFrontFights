
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobeScene from '../components/globe/GlobeScene';
import LoadingScreen from '../components/loading/LoadingScreen';
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
    const foundArt = martialArts.find(
      art => art.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="search-container z-20">
            <form onSubmit={handleSearch} className="relative">
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
          
          {/* Login and profile buttons */}
          <div className="fixed top-7 right-12 flex items-center gap-4 z-50">
            {isAuthenticated ? (
            <>
              <div className="text-white">Olá, {user?.name}</div>
             <button 
              className="bg-red-700 py-2 px-7 font-semibold text-lg text-white rounded-full hover:bg-white hover:text-red-600 "
              onClick={logout}
            >
              Sair
            </button>
            <div 
              className=" p-2 font-semibold cursor-pointer rounded-full hover:bg-white"
              onClick={() => navigate('/profile')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="red" stroke="red"  strokeLinecap="round" strokeLinejoin="round" >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            </>
          ) : (
            <>
             <button 
              className="bg-red-700 py-2 px-7 font-semibold text-lg text-white rounded-full hover:bg-white hover:text-red-600 "
              onClick={() => navigate('/login')}
            >
              ENTRAR
            </button>
            <div 
              className=" p-2 font-semibold cursor-pointer rounded-full hover:bg-white"
              onClick={() => navigate('/profile')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="red" stroke="red"  strokeLinecap="round" strokeLinejoin="round" >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            </>
          )}
            

          </div>
          
          {/* Navigation options on right side */}

          <ul className="absolute right-20 top-1/2 transform -translate-y-1/2 flex flex-col gap-12 z-10">
            <NavButton label="JOGO" />
            <NavButton label="OLIMPÍADAS" onClick={() => navigate('/olympic-fighting')}/>
            <NavButton label="CURIOSIDADES" onClick={() => navigate('/curiosities')}/>
            <NavButton label="LINHA DO TEMPO" onClick={() => navigate('/timeline')} />
          </ul>
          
          {/* Logo at bottom right */}

          <div className="absolute right-12 bottom-8 z-10">
            <img src={logo} alt="Logo" className="w-32" />

          </div>
          
          <div className="instruction-hint z-20 pointer-events-none">
            Gire o globo com o mouse para explorar mais lutas
          </div>
        </div>
      </div>
  );
};

// Componente para os botões de navegação
const NavButton = ({ label, onClick }: { label: string; onClick?: () => void; }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <button 
      className="relative group"
      onClick={onClick}
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
