import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/buttonSlider';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`absolute top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled || location.pathname !== '/' 
        ? ' py-7' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo no canto esquerdo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logos/whiteLogo.png" 
            alt="Logo" 
            className="w-24 h-auto" 
          />
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/" 
                className="text-white hover:text-martial transition-colors"
              >
                Voltar
              </Link>
              <div className="text-white">Olá, {user?.name}</div>
              <Button 
                variant="outline"
                className="border-martial text-white hover:bg-martial"
                onClick={logout}
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className="text-white hover:text-martial transition-colors"
              >
                Voltar
              </Link>
              <Link 
                to="/login" 
                className="text-white hover:text-martial transition-colors"
              >
                Login
              </Link>
              <Link to="/register">
                <Button 
                  variant="outline" 
                  className="border-martial text-white hover:bg-martial"
                >
                  Cadastre-se
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
