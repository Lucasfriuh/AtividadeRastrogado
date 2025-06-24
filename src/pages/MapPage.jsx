import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  CircleMarker,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAll } from '@/lib/utils';
import L from 'leaflet';

// Corrigir os ícones do Leaflet (problema comum em Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

export default function MapPage() {
  const [positions, setPositions] = useState([]);
  const [movingCows, setMovingCows] = useState([
    { id: 1, lat: -15.9352, lng: -48.0784 },
    { id: 2, lat: -15.9353, lng: -48.0786 },
    { id: 3, lat: -15.9354, lng: -48.0785 },
    { id: 4, lat: -15.9355, lng: -48.0787 },
    { id: 5, lat: -15.9351, lng: -48.0783 },
    { id: 6, lat: -15.9356, lng: -48.0782 },
    { id: 7, lat: -15.9350, lng: -48.0781 },
  ]);

  // Carrega animais do banco
  useEffect(() => {
    const animais = getAll();
    const coords = animais
      .filter(a => a.lat && a.lng)
      .map(a => ({
        id: a.id,
        name: a.name,
        lat: parseFloat(a.lat),
        lng: parseFloat(a.lng),
        bpm: a.bpm,
        sex: a.sex,
        age: a.age,
        status: a.status,
      }));
    setPositions(coords);
  }, []);

  // Faz as vacas se moverem aleatoriamente
  useEffect(() => {
    const interval = setInterval(() => {
      setMovingCows(prev =>
        prev.map(cow => ({
          ...cow,
          lat: cow.lat + (Math.random() - 0.5) * 0.00005,
          lng: cow.lng + (Math.random() - 0.5) * 0.00005,
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fazendaArea = [
    [-15.9357, -48.0788],
    [-15.9357, -48.0775],
    [-15.9348, -48.0775],
    [-15.9348, -48.0788],
  ];

  const center = positions.length
    ? [
        positions.reduce((sum, p) => sum + p.lat, 0) / positions.length,
        positions.reduce((sum, p) => sum + p.lng, 0) / positions.length,
      ]
    : [-15.935308, -48.078149]; // Rancho (fallback)

  return (
    <div className="space-y-4">
      <Card className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 shadow-md">
        <CardHeader>
          <CardTitle>Simulação da Fazenda</CardTitle>
        </CardHeader>
        <CardContent>
          Este mapa é uma representação visual da área da fazenda e da posição estimada dos animais com base nas coordenadas registradas.
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader>
          <CardTitle>Mapa de Localização dos Animais</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100vh-12rem)]">
          <MapContainer
            center={center}
            zoom={18}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            <Polygon
              positions={fazendaArea}
              pathOptions={{ color: 'green', fillOpacity: 0.2 }}
            >
              <Popup>Área da Fazenda (Simulada - Brasília)</Popup>
            </Polygon>

            {/* Vacas em movimento com emoji 🐄 */}
            {movingCows.map(cow => (
              <Marker
                key={`cow-${cow.id}`}
                position={[cow.lat, cow.lng]}
                icon={L.divIcon({
                  className: '',
                  html: '🐄',
                  iconSize: [220000, 200000],     // Dobro do tamanho anterior
                  iconAnchor: [60, 40],   // Centralizado
                })}
              >
                <Popup>Vaca em movimento #{cow.id}</Popup>
              </Marker>
            ))}

            {/* Círculos para vacas reais do banco */}
            {positions.map(pos => (
              <CircleMarker
                key={pos.id}
                center={[pos.lat, pos.lng]}
                radius={6}
                pathOptions={{ color: 'orange', fillColor: 'red', fillOpacity: 0.8 }}
              >
                <Tooltip direction="top" offset={[0, -5]} opacity={1}>
                  <div className="text-sm">
                    <strong>{pos.name}</strong>
                    <br />
                    ID: {pos.id}
                    <br />
                    Sexo: {pos.sex}
                    <br />
                    Idade: {pos.age}
                    <br />
                    BPM: {pos.bpm} bpm
                    <br />
                    Status:{' '}
                    {pos.status === 'alerta_bpm'
                      ? 'BPM Alto'
                      : pos.status === 'alerta_area'
                      ? 'Fora da Área'
                      : 'Normal'}
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  );
}
