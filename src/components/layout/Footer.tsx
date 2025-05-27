import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent text-gray-300 py-12 px-4 sm:px-6 lg:px-8"> {/* ✅ Alterado aqui */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Seção da Marca */}
          <div>
            <h5 className="text-xl font-bold text-white mb-4 tracking-wide">BRAWL TECH</h5>
            <p className="text-sm text-gray-400">
              Sua fonte definitiva para o universo das artes marciais e esportes de combate.
            </p>
          </div>

          {/* Seção de Links Rápidos */}
          <div>
            <h5 className="text-lg font-semibold text-red-400 mb-4">Navegação</h5>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-red-400 transition-colors duration-300">Início</a></li>
              <li><a href="/olympic-fighting" className="hover:text-red-400 transition-colors duration-300">Olimpíadas</a></li>
              <li><a href="/curiosities" className="hover:text-red-400 transition-colors duration-300">Curiosidades</a></li>
              <li><a href="/timeline" className="hover:text-red-400 transition-colors duration-300">Linha do tempo</a></li>
              
            </ul>
          </div>

          {/* Seção Legal */}
          <div>
            <h5 className="text-lg font-semibold text-red-400 mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><a href="/termos" className="hover:text-red-400 transition-colors duration-300">Termos de Serviço</a></li>
              <li><a href="/privacidade" className="hover:text-red-400 transition-colors duration-300">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Seção de Redes Sociais */}
          <div>
            <h5 className="text-lg font-semibold text-red-400 mb-4">Siga-nos</h5>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-red-500 hover:scale-110 transform transition-all duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-red-500 hover:scale-110 transform transition-all duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-red-500 hover:scale-110 transform transition-all duration-300">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-red-500 hover:scale-110 transform transition-all duration-300">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-red-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Brawl Tech. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Desenvolvido com paixão por artes marciais.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
