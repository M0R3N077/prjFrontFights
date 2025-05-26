
import React, { useState } from "react";
import { TimelineItem, timelineData } from "@/data/timelineData";
import TimelineSlider from "./TimelineSlider";
import Navbar from "../layout/Navbar";

const MartialArtsTimeline: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem>(timelineData[0]);

  const handleSelect = (item: TimelineItem) => {
    setSelectedItem(item);
  };

  const getBackgroundStyleForItem = (item: TimelineItem) => {
    // Map background images to actual assets
    const backgroundMap: { [key: string]: string } = {
      "ancient-arena.jpg": "url('/timeline/backgrounds/ancient-arena.jpg')",
      "temple.jpg": "url('/timeline/backgrounds/temple.jpg')",
      "jj.jpg": "url('/timeline/backgrounds/jj.jpg')",
      "pancrariogr.jpg": "url('/timeline/backgrounds/pancrariogr.jpg')",
      "kungfu.jpg": "url('/timeline/backgrounds/kungfu.jpg')",
      "fencing.jpg": "url('/timeline/backgrounds/fencing.jpg')",
      "coliseu.jpg": "url('/timeline/backgrounds/coliseu.jpg')",
      "taekwondo.jpg": "url('/timeline/backgrounds/taekwondo.jpg')",
      "samurai.jpg": "url('/timeline/backgrounds/samurai.jpg')",
      "capoeira.jpg": "url('/timeline/backgrounds/capoeira.jpg')",
      "karate.jpg": "url('/timeline/backgrounds/karate.jpg')",
      "dojo-judo.jpg": "url('/timeline/backgrounds/dojo-judo.jpg')",
      "olympic.jpg": "url('/timeline/backgrounds/olympic.jpg')",
      "bartitsu.jpg": "url('/timeline/backgrounds/bartitsu.jpg')",
      "bjj.jpg": "url('/timeline/backgrounds/bjj.jpg')",
    };

    // Default gradient as fallback
    const defaultBackground = "linear-gradient(to bottom, #1a1a1a, #000)";
    
    return backgroundMap[item.backgroundImage] || defaultBackground;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative">
    <Navbar />
    <div className="text-white lg:mt-0 md:mt-14 mt-40 text-4xl z-20 md:text-6xl font-bold sm:pt-10 transition-all duration-700 ease-in-out animate-fade-in">
    <h1>LINHA DO TEMPO</h1>
    </div>
  {/* 🔹 Imagem de Fundo */}
  <div
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{
      backgroundImage: getBackgroundStyleForItem(selectedItem),
      transition: "background-image 1s ease-in-out",
    }}
  ></div>

  {/* 🔹 Camada Escura por cima da imagem */}
  <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

  {/* 🔹 Conteúdo acima de tudo */}
  <div className="relative z-20 w-full flex flex-col justify-center mt-10 sm:mt-20 items-center">
    <div className="max-w-3xl w-full px-4 md:px-8 flex flex-col ">
      <div className="bg-black/10 p-6 md:p-8 rounded-2xl border-[5px] border-gray-100/20 relative transition-all duration-700 ease-in-out">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex justify-center items-center col-span-1">
            <div className="w-32 h-32 bg-transparent rounded-lg flex items-center justify-center">
              <img src={selectedItem.fighter} alt="Lutador" className="h-full w-full rounded-sm" />
            </div>
          </div>
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 animate-fade-in">
              {selectedItem.title}
            </h3>
            <p className="text-white text-sm md:text-base animate-fade-in">
              {selectedItem.description}
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Data/ano */}
      <div className="flex justify-center mt-10 mb-6">
        <div className="text-white text-4xl md:text-6xl font-bold transition-all duration-700 ease-in-out animate-fade-in">
          {selectedItem.year}
        </div>
      </div>
    </div>
  </div>

  {/* 🔹 Timeline Slider */}
  <div className="relative z-20 w-full flex justify-center pb-16">
    <div className="max-w-3xl w-full px-6">
      <TimelineSlider 
        items={timelineData} 
        onSelect={handleSelect} 
        selectedItem={selectedItem} 
      />
    </div>
  </div>
</div>

  );
};

export default MartialArtsTimeline;
