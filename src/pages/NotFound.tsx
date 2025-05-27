import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="text-center space-y-10 max-w-lg w-full"> {/* Aumentado space-y */}
        <AlertTriangle className="mx-auto text-red-600 animate-pulse" size={100} strokeWidth={1.5} /> {/* Cor e animação */}
        <div>
          <h1 className="text-9xl font-extrabold tracking-tighter bg-gradient-to-br from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent"> {/* Efeito de gradiente */}
            404
          </h1>
          <p className="text-4xl font-bold text-gray-100 mt-2">
            Página Não Encontrada
          </p>
          <p className="text-lg text-gray-400 mt-6 leading-relaxed"> {/* Cor do texto ajustada */}
            Oops! Parece que o caminho que você tentou acessar não existe ou foi movido.
            Verifique o endereço ou retorne à página inicial.
          </p>
        </div>
        <Link
          to="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-10 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-105"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;