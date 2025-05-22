
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GymCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating?: number;
  phone?: string;
  website?: string;
  image?: string;
  isActive?: boolean;
  onClick?: () => void;
  onDirectionsClick?: () => void;
}

const GymCard: React.FC<GymCardProps> = ({
  id,
  name,
  address,
  distance,
  rating,
  phone,
  website,
  image,
  isActive = false,
  onClick,
  onDirectionsClick
}) => {
  return (
    <div 
      className={`bg-black/20 rounded-xl border ${isActive ? 'border-martial' : 'border-martial/30'} p-4 transition-all cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{name}</h3>
        <div className="flex items-center bg-martial/10 px-2 py-1 rounded text-xs">
          <MapPin size={12} className="mr-1" />
          {distance}
        </div>
      </div>
      
      <p className="text-sm opacity-80 mb-1">{address}</p>
      
      {rating !== undefined && (
        <div className="flex items-center mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i} 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                stroke="currentColor" 
                className={i < Math.floor(rating) ? "text-yellow-500" : "text-gray-500"}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-xs ml-2">{rating.toFixed(1)}</span>
        </div>
      )}
      
      {image && (
        <div className="mb-3">
          <img 
            src={image} 
            alt={name}
            className="w-full h-32 object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mt-2">
        {phone && (
          <a 
            href={`tel:${phone}`} 
            className="text-xs bg-martial/20 hover:bg-martial/30 px-3 py-1 rounded-full transition-colors"
          >
            📞 {phone}
          </a>
        )}
        
        {website && (
          <a 
            href={website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs bg-martial/20 hover:bg-martial/30 px-3 py-1 rounded-full transition-colors"
          >
            🌐 Site
          </a>
        )}
        
        <Button 
          className="text-xs bg-martial hover:bg-martial/80 text-white px-3 py-1 rounded-full transition-colors ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            if (onDirectionsClick) onDirectionsClick();
          }}
        >
          Como chegar
        </Button>
      </div>
    </div>
  );
};

export default GymCard;