
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

// Definição temporária para martialArts até que o arquivo real esteja disponível
const martialArts = [
  { id: "1", name: "Jiu-Jitsu" },
  { id: "2", name: "Karatê" },
  { id: "3", name: "Judô" },
  { id: "4", name: "Muay Thai" },
  { id: "5", name: "Boxe" },
  { id: "6", name: "Taekwondo" }
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
  
  // Encontrar a arte marcial com base no ID
  const martialArt = martialArts.find(art => art.id === id);

  // Função para obter a localização do usuário
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

  // Busca academias próximas usando a API do Google Places
  const searchGymsNearby = async (location: { lat: number; lng: number }, query: string = '') => {
    try {
      setIsLoading(true);
      
      // Montando a palavra-chave de busca combinando o tipo de arte marcial com a consulta do usuário
      const keyword = `${martialArt?.name || 'arte marcial'} ${query}`.trim();
      
      console.log("Buscando academias com a palavra-chave:", keyword);
      
      // Chamada à API do Google Places através do nosso serviço
      const results = await searchNearbyPlaces({
        lat: location.lat,
        lng: location.lng,
        type: 'gym', // Filtrando por academias/gyms
        keyword,
        radius: 10000 // 10km de raio
      });
      
      console.log("Resultados da busca:", results);
      
      // Processando os resultados para o formato esperado pelo componente
      const processedGyms = results.map(place => {
        // Calculando a distância entre o usuário e a academia
        const distance = calculateDistance(
          location.lat,
          location.lng,
          place.geometry.location.lat,
          place.geometry.location.lng
        );
        
        // Preparando a URL da imagem se houver foto disponível
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
      
      // Se encontrou academias, seleciona a primeira por padrão
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

  // Efeito para obter a localização do usuário ao carregar a página
  useEffect(() => {
    getUserLocation();
  }, []);

  // Função para lidar com a busca manual
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userLocation) {
      searchGymsNearby(userLocation, searchQuery);
    } else {
      getUserLocation();
    }
  };

  // Função para abrir o Google Maps com direções para a academia selecionada
  const getDirections = (gym: Gym) => {
    if (!userLocation) return;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${gym.location.lat},${gym.location.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  // Preparando os marcadores para o mapa
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
          {/* Coluna do mapa */}
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
          
          {/* Coluna de academias */}
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
            
            {/* Lista de academias */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {isLoading ? (
                // Placeholders enquanto carregando
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
    </div>
  );
};

export default FindGymsPage;