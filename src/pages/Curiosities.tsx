import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from 'react-router-dom';
import { curiosidades } from '@/data/curiositiesData';
import Navbar from "@/components/layout/Navbar";



export default function CuriosidadesPage() {
  const [aberto, setAberto] = useState<number | null>(null);

  const toggleDescricao = (id: number) => {
    setAberto((anterior) => (anterior === id ? null : id));
  };

  return (
    <div className="bg-background text-white min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <header className="text-center pt-36 sm:pt-24 md:pt-10 mb-10">
        <h1 className="text-[39px] font-extrabold text-white">CURIOSIDADES</h1>
        <p className="text-red-500 text-2xl font-semibold mt-1">VOCÊ SABIA?</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto overflow-hidden">
        {curiosidades.map((item) => (
          <div
            key={item.id}
            className="bg-black border-2 border-red-600 rounded-xl overflow-hidden shadow-red-900 shadow-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={item.imagem}
              alt={item.titulo}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-[20px] mb-2 text-center text-white">{item.titulo}</h2>
              <button
                onClick={() => toggleDescricao(item.id)}
                className="flex items-center justify-center w-full text-white hover:text-red-500 transition"
              >
                <ChevronDown className="h-6 w-6" />
              </button>
              {aberto === item.id && (
                <p className="mt-3 text-[18px] text-gray-300 text-center">{item.descricao}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
