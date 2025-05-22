
import { useState, useEffect } from 'react';
import { OlympicSport } from '../../data/OlympicSportsData';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/cardSlider';

interface SportInfoProps {
  sport: OlympicSport;
  isActive: boolean;
}

const SportInfo = ({ sport, isActive }: SportInfoProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay to the appearance for a nice transition
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
      "info-panel transition-all duration-500 transform ",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}>
      <Card className="bg-black/30 border-white/10 backdrop-blur-md text-white overflow-hidden ml-16">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold mb-0 text-white flex items-center justify-between">
            {sport.name}
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">
              Desde {sport.olympicYear}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-4">
            <p className="text-gray-200 mb-3 leading-relaxed">{sport.description}</p>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white border-l-4 border-red-500 pl-3">História Olímpica</h3>
              <p className="text-gray-300 leading-relaxed">{sport.history}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SportInfo;
