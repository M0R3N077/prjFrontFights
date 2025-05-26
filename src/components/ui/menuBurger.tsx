import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BurgerMenuProps {
  className?: string;
}

const BurgerMenu = ({ className = '' }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'JOGO', onClick: () => {} },
    { label: 'OLIMPÍADAS', onClick: () => navigate('/olympic-fighting') },
    { label: 'CURIOSIDADES', onClick: () => navigate('/curiosities') },
    { label: 'LINHA DO TEMPO', onClick: () => navigate('/timeline') }
  ];

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className={`${className}`}>
      {/* Burger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 z-50"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-80 max-w-[85vw] 
        bg-black/90 backdrop-blur-md 
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col pt-20 px-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item.onClick)}
              className="text-white font-semibold text-lg tracking-wider py-4 px-4 text-left border-b border-white/10 hover:bg-white/10 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;