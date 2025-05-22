
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/buttonSlider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import { MapPin } from 'lucide-react';

// Função para converter coordenadas lat/lng para posição no globo 3D
const latLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

// Componente para o seletor de localização no globo
const GlobeLocationSelector = ({ 
  onLocationSelect 
}: { 
  onLocationSelect: (lat: number, lng: number) => void 
}) => {
  const globeRadius = 2;
  const [marker, setMarker] = useState<THREE.Vector3 | null>(null);
  
  // Função para converter posição 3D para coordenadas lat/lng
  const vector3ToLatLng = (position: THREE.Vector3, radius: number) => {
    const phi = Math.acos(position.y / radius);
    const theta = Math.atan2(position.z, -position.x);
    
    const lat = 90 - (phi * (180 / Math.PI));
    let lng = (theta * (180 / Math.PI)) - 180;
    
    // Normalizar longitude para o intervalo -180 a 180
    if (lng < -180) lng += 360;
    if (lng > 180) lng -= 360;
    
    return { lat, lng };
  };
  
  const handleGlobeClick = (event: any) => {
    event.stopPropagation();
    
    // Obter o ponto de intersecção no globo
    if (event.intersections && event.intersections.length > 0) {
      const hitPoint = event.intersections[0].point;
      
      // Normalizar para a superfície do globo
      const normalized = hitPoint.clone().normalize().multiplyScalar(globeRadius);
      setMarker(normalized);
      
      // Converter para lat/lng e notificar o componente pai
      const { lat, lng } = vector3ToLatLng(normalized, globeRadius);
      onLocationSelect(parseFloat(lat.toFixed(2)), parseFloat(lng.toFixed(2)));
    }
  };
  
  return (
    <group>
      <mesh onPointerDown={handleGlobeClick}>
        <sphereGeometry args={[globeRadius, 64, 64]} />
        <meshStandardMaterial 
          map={new THREE.TextureLoader().load('https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg')}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      
      {marker && (
        <mesh position={marker}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#FF3A3A" />
        </mesh>
      )}
    </group>
  );
};

const AddMartialArt = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [origin, setOrigin] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Verificar se o usuário está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Acesso negado",
        description: "Você precisa fazer login para adicionar uma arte marcial",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);
  
  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !country || !description || !location) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos e selecione uma localização no globo",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      toast({
        title: "Arte marcial adicionada",
        description: `${name} foi adicionada ao mapa com sucesso!`,
      });
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Adicionar Nova Arte Marcial</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Informações</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Arte Marcial</Label>
                  <Input 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Capoeira"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">País de Origem</Label>
                  <Input 
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Ex: Brasil"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="origin">Período/Ano de Origem</Label>
                  <Input 
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Ex: Século XVI"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva a arte marcial, sua história e características principais..."
                    rows={5}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-martial hover:bg-martial-dark"
                    disabled={isLoading || !location}
                  >
                    {isLoading ? "Adicionando..." : "Adicionar Arte Marcial"}
                  </Button>
                </div>
              </form>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-martial" />
                Selecione a Localização no Globo
              </h2>
              
              <div className="bg-black/20 rounded-xl overflow-hidden h-[400px] shadow-lg border border-muted">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} intensity={1.2} />
                  <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
                  <GlobeLocationSelector onLocationSelect={handleLocationSelect} />
                  <OrbitControls 
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={8}
                    autoRotate={!location}
                    autoRotateSpeed={0.5}
                  />
                </Canvas>
              </div>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                {location ? (
                  <div className="text-center">
                    <p className="font-medium flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4 text-martial" />
                      Localização selecionada
                    </p>
                    <p className="text-lg font-semibold">
                      {location.lat.toFixed(2)}° N, {location.lng.toFixed(2)}° E
                    </p>
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground">
                    Clique no globo para selecionar a localização da arte marcial
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMartialArt;
