
import React, { useEffect, useRef } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface Marker {
  id: string;
  position: Location;
  title: string;
}

interface GymMapProps {
  userLocation: Location;
  markers: Marker[];
  onMarkerClick?: (id: string) => void;
}

// Definimos um tipo para os refs para evitar o erro específico
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const GymMap: React.FC<GymMapProps> = ({ userLocation, markers, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<GoogleMap | null>(null);
  const markersRef = useRef<GoogleMarker[]>([]);

  useEffect(() => {
    // Carrega o script do Google Maps
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Corrija a referência da chave da API
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!apiKey) {
        console.error("Chave da API do Google Maps não encontrada");
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    return () => {
      // Limpa os marcadores quando o componente é desmontado
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, []);

  // Inicializa o mapa quando o script é carregado
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 13,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    // Adiciona um marcador para a localização do usuário
    new window.google.maps.Marker({
      position: userLocation,
      map: googleMapRef.current,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
      title: "Sua localização"
    });

    // Adiciona os marcadores das academias
    updateMarkers();
  };

  // Atualiza os marcadores quando eles mudam
  useEffect(() => {
    if (googleMapRef.current && window.google) {
      updateMarkers();
    }
  }, [markers]);

  // Função para atualizar os marcadores no mapa
  const updateMarkers = () => {
    if (!googleMapRef.current || !window.google) return;

    // Remove os marcadores existentes
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Adiciona os novos marcadores
    markers.forEach((markerData) => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map: googleMapRef.current,
        title: markerData.title,
        animation: window.google.maps.Animation.DROP
      });

      // Adiciona o evento de clique para o marcador
      if (onMarkerClick) {
        marker.addListener('click', () => {
          onMarkerClick(markerData.id);
        });
      }

      markersRef.current.push(marker);
    });

    // Ajusta o zoom do mapa para mostrar todos os marcadores
    if (markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
      
      markers.forEach(marker => {
        bounds.extend(new window.google.maps.LatLng(marker.position.lat, marker.position.lng));
      });

      googleMapRef.current.fitBounds(bounds);
    }
  };

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-xl border border-martial/30"
      style={{ minHeight: "400px" }}
    />
  );
};

export default GymMap;