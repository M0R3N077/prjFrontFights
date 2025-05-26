import { useState, useEffect } from 'react';
import { OlympicSport } from '../../data/OlympicSportsData';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/cardSlider';
import SportInfoModal from './SportInfoModal';

interface SportInfoProps {
  sport: OlympicSport;
  isActive: boolean;
}

const SportInfo = ({ sport, isActive }: SportInfoProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isActive]);

  if (!isActive) return null;
  
  return (
    <div className={cn(
      "info-panel transition-all duration-500 transform",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      {/* Desktop version - mantém o design original */}
      <div className="hidden md:block">
        <Card className="bg-black/30 ml-20 border-white/10 backdrop-blur-md text-white overflow-hidden">
          <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0 text-white flex flex-wrap items-center justify-between gap-2">
              <span className="flex-1 min-w-0">{sport.name}</span>
              <span className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs whitespace-nowrap flex-shrink-0">
                Desde {sport.olympicYear}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3 sm:pb-4 px-3 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-gray-200 mb-3 leading-relaxed text-sm sm:text-base">{sport.description}</p>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white border-l-4 border-red-500 pl-3">História Olímpica</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{sport.history}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile version - apenas título e botão */}
      <div className="block md:hidden">
        <Card className="bg-black/30 border-white/10 backdrop-blur-md text-white overflow-hidden mx-4">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-lg font-bold mb-2 text-white text-center">
              {sport.name}
            </CardTitle>
            <div className="flex justify-center">
              <SportInfoModal sport={sport} />
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default SportInfo;
