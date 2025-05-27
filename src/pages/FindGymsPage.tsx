import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Search, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import GymMap from '@/components/findGym/GymMap';
import GymCard from '@/components/findGym/GymCard';
import { searchNearbyPlaces, getPhotoUrl, calculateDistance } from '@/services/placesService';
import Navbar from '@/components/layout/Navbar';
import Footer from "@/components/layout/Footer";

// Definição temporária para martialArts até que o arquivo real esteja disponível
const martialArts = [
  { id: "1", name: "Capoeira" },
  { id: "2", name: "Kung Fu" },
  { id: "3", name: "Muay Thai" },
  { id: "4", name: "Taekwondo" },
  { id: "5", name: "Jiu-Jitsu" },
  { id: "6", name: "Krav Maga" },
  { id: "7", name: "Boxe" },
  { id: "8", name: "Judô" },
  { id: "9", name: "Karatê" },
  { id: "10", name: "Kickboxing" },
  { id: "11", name: "Luta Livre" },
  { id: "12", name: "MMA" },
  { id: "13", name: "Sumô" },
  { id: "14", name: "Wrestling" },
];

interface Gym {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating?: number;
  phone?: string;
  website?: string;
  image?: string;
  location: {
    lat: number;
    lng: number;
  };
}

const FindGymsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const martialArt = martialArts.find(art => art.id === id);

  const getUserLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          searchGymsNearby(userPos, searchQuery);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setIsLoading(false);
          toast({
            title: "Erro de localização",
            description: "Não foi possível obter sua localização. Verifique as permissões do navegador.",
            variant: "destructive"
          });
        }
      );
    } else {
      setIsLoading(false);
      toast({
        title: "Navegador não suportado",
        description: "Seu navegador não suporta geolocalização.",
        variant: "destructive"
      });
    }
  };

  const searchGymsNearby = async (location: { lat: number; lng: number }, query: string = '') => {
    try {
      setIsLoading(true);
      const keyword = `${martialArt?.name || 'arte marcial'} ${query}`.trim();
      const results = await searchNearbyPlaces({
        lat: location.lat,
        lng: location.lng,
        type: 'gym',
        keyword,
        radius: 10000
      });

      const processedGyms = results.map(place => {
        const distance = calculateDistance(
          location.lat,
          location.lng,
          place.geometry.location.lat,
          place.geometry.location.lng
        );

        const imageUrl = place.photos && place.photos.length > 0
          ? getPhotoUrl(place.photos[0].photo_reference)
          : undefined;

        return {
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          distance,
          rating: place.rating,
          phone: place.international_phone_number,
          website: place.website,
          image: imageUrl,
          location: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
          }
        };
      });

      setGyms(processedGyms);

      if (processedGyms.length > 0) {
        setSelectedGymId(processedGyms[0].id);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar academias:', error);
      setIsLoading(false);
      toast({
        title: "Erro ao buscar academias",
        description: "Não foi possível encontrar academias próximas. Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userLocation) {
      searchGymsNearby(userLocation, searchQuery);
    } else {
      getUserLocation();
    }
  };

  const getDirections = (gym: Gym) => {
    if (!userLocation) return;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${gym.location.lat},${gym.location.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const mapMarkers = gyms.map(gym => ({
    id: gym.id,
    position: gym.location,
    title: gym.name
  }));

  if (!martialArt) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-28 text-center">
          <h1 className="text-3xl font-bold mb-4">Arte marcial não encontrada</h1>
          <Link to="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto pt-36 sm:pt-24 pb-16 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Link to={`/martial-art/${id}`} className="hover:bg-black/20 p-2 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Academias de {martialArt.name} próximas</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="w-full h-[400px] lg:h-[600px] rounded-xl border border-martial/30">
              {userLocation ? (
                <GymMap 
                  userLocation={userLocation}
                  markers={mapMarkers}
                  onMarkerClick={(id) => setSelectedGymId(id)}
                />
              ) : (
                <div className="bg-secondary/20 rounded-lg flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <div className="mb-4">
                      <MapPin size={48} />
                    </div>
                    <p>Permitir acesso à localização para ver o mapa</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-martial/30 hover:bg-martial/10"
                      onClick={getUserLocation}
                    >
                      <MapPin size={16} className="mr-2" />
                      Permitir localização
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-black/20 rounded-xl border border-martial/30 p-4 mb-6">
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <Input
                  placeholder="Buscar academia..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/30 border-martial/30"
                />
                <Button type="submit" className="bg-martial hover:bg-martial/80">
                  <Search size={16} />
                </Button>
              </form>
              
              <Button 
                variant="outline"
                className="w-full border-martial/30 hover:bg-martial/10 mb-2"
                onClick={getUserLocation}
              >
                <MapPin size={16} className="mr-2" />
                Usar minha localização atual
              </Button>
              
              <p className="text-xs opacity-70 text-center">
                Mostrando academias de {martialArt.name} próximas à sua localização
              </p>
            </div>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-black/20 rounded-xl border border-martial/30 p-4 animate-pulse">
                    <div className="h-4 bg-gray-600 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-600 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-600 rounded w-1/2 mb-4" />
                    <div className="h-20 bg-gray-600 rounded w-full" />
                  </div>
                ))
              ) : gyms.length > 0 ? (
                gyms.map(gym => (
                  <GymCard
                    key={gym.id}
                    id={gym.id}
                    name={gym.name}
                    address={gym.address}
                    distance={gym.distance}
                    rating={gym.rating}
                    phone={gym.phone}
                    website={gym.website}
                    image={gym.image}
                    isActive={selectedGymId === gym.id}
                    onClick={() => setSelectedGymId(gym.id)}
                    onDirectionsClick={() => getDirections(gym)}
                  />
                ))
              ) : (
                <div className="bg-black/20 rounded-xl border border-martial/30 p-6 text-center">
                  <MapPin size={32} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-1">Nenhuma academia encontrada</h3>
                  <p className="text-sm opacity-70">
                    Tente mudar sua busca ou localização para encontrar academias de {martialArt.name} na sua região
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindGymsPage;
