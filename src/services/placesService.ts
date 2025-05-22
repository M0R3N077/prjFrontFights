
interface NearbySearchOptions {
  lat: number;
  lng: number;
  type: string;
  keyword?: string;
  radius?: number;
}

interface PlacePhoto {
  photo_reference: string;
  height: number;
  width: number;
}

interface Place {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  international_phone_number?: string;
  website?: string;
  photos?: PlacePhoto[];
}

// Função para buscar lugares próximos
export async function searchNearbyPlaces(options: NearbySearchOptions): Promise<Place[]> {
  try {
    const { lat, lng, type, keyword, radius = 5000 } = options;
    
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('API key não encontrada');
    }

    // Como o Google Places não permite CORS direto, precisamos usar um proxy ou backend
    // Vamos usar uma abordagem simulada para desenvolvimento, mas em produção você precisa de um backend
    
    console.log('Buscando academias com os parâmetros:', {
      apiKey: `${apiKey.substring(0, 6)}...`, // Não mostre a chave completa no log
      location: `${lat},${lng}`,
      type,
      keyword,
      radius
    });

    // Em produção, isso seria uma chamada para seu backend, que faria a chamada para a API do Google
    // Por exemplo: const url = `https://seu-backend.com/api/places?lat=${lat}&lng=${lng}&type=${type}&keyword=${encodeURIComponent(keyword || '')}&radius=${radius}`;
    
    // Como não podemos chamar diretamente do frontend, vamos simular uma resposta para teste
    // Essa implementação é apenas para desenvolvimento e teste!
    
    // Simulação de atraso de rede - remover em produção
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Em um ambiente real, você faria uma chamada fetch() para seu backend
    // const response = await fetch(url);
    // const data = await response.json();
    // return data.results;
    
    // Para desenvolvimento, retornamos dados simulados baseados na localização
    return generateMockGyms(lat, lng, keyword || '');
  } catch (error) {
    console.error('Erro ao buscar lugares:', error);
    throw error;
  }
}

// Função para obter URL da foto do local
export function getPhotoUrl(photoReference: string): string {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  
  // Em produção, você usaria:
  // return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  
  // Como é apenas para desenvolvimento e teste, vamos retornar uma imagem aleatória
  return `https://source.unsplash.com/400x300/?gym,fitness`;
}

// Função para calcular a distância entre dois pontos usando a fórmula de Haversine
export function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): string {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distância em km
  
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`; // Converter para metros se < 1km
  }
  return `${distance.toFixed(1)} km`; // Distância em km com uma casa decimal
}

// Função auxiliar para gerar academias simuladas para teste
function generateMockGyms(lat: number, lng: number, keyword: string): Place[] {
  console.log(`Gerando academias simuladas próximas a ${lat},${lng} com keyword: ${keyword}`);
  
  // Conversão de keyword para minúsculo para facilitar a comparação
  const lowerKeyword = keyword.toLowerCase();
  
  // Lista base de academias simuladas
  const baseGyms = [
    {
      name: "Academia Power Jiu-Jitsu",
      martial_arts: ["jiu-jitsu"]
    },
    {
      name: "Centro de Karatê Tradicional",
      martial_arts: ["karatê", "karate"]
    },
    {
      name: "Arena Muay Thai & Boxe",
      martial_arts: ["muay thai", "boxe", "box"]
    },
    {
      name: "Espaço Judô Elite",
      martial_arts: ["judô", "judo"]
    },
    {
      name: "Centro de Taekwondo Olímpico",
      martial_arts: ["taekwondo"]
    },
    {
      name: "MMA Fight Center",
      martial_arts: ["mma", "jiu-jitsu", "muay thai", "boxe"]
    },
    {
      name: "Academia Completa Lutas",
      martial_arts: ["jiu-jitsu", "karatê", "judô", "muay thai", "boxe", "taekwondo"]
    },
    {
      name: "Espaço Zen Aikido",
      martial_arts: ["aikido"]
    },
    {
      name: "Centro de Kung Fu Tradicional",
      martial_arts: ["kung fu", "kung-fu"]
    }
  ];
  
  // Filtra academias baseadas na keyword (se fornecida)
  const filteredGyms = keyword 
    ? baseGyms.filter(gym => 
        gym.name.toLowerCase().includes(lowerKeyword) || 
        gym.martial_arts.some(art => lowerKeyword.includes(art))
      )
    : baseGyms;
    
  if (filteredGyms.length === 0) {
    console.log("Nenhuma academia encontrada com a keyword, usando lista completa");
    return generateRandomGyms(baseGyms, lat, lng);
  }
  
  console.log(`Encontradas ${filteredGyms.length} academias compatíveis com o filtro`);
  return generateRandomGyms(filteredGyms, lat, lng);
}

// Gera academias aleatórias com base na lista filtrada
function generateRandomGyms(gyms: Array<{name: string; martial_arts: string[]}>, baseLat: number, baseLng: number): Place[] {
  return gyms.map((gym, index) => {
    // Gera posições aleatórias próximas à localização do usuário
    const randomLat = baseLat + (Math.random() - 0.5) * 0.05; // ±0.05 graus ~ 5km
    const randomLng = baseLng + (Math.random() - 0.5) * 0.05;
    
    const hasPhotos = Math.random() > 0.3; // 70% de chance de ter fotos
    
    return {
      place_id: `place_${index}_${Date.now()}`,
      name: gym.name,
      vicinity: `Rua das Artes Marciais, ${Math.floor(Math.random() * 1000) + 1}, Cidade`,
      geometry: {
        location: {
          lat: randomLat,
          lng: randomLng
        }
      },
      rating: 3 + Math.random() * 2, // Rating entre 3 e 5
      international_phone_number: `+55 11 9${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`,
      website: `https://www.academia-${gym.name.toLowerCase().replace(/\s+/g, '-')}.com.br`,
      photos: hasPhotos ? [{
        photo_reference: `ref_${index}_${Date.now()}`,
        height: 400,
        width: 600
      }] : undefined
    };
  });
}