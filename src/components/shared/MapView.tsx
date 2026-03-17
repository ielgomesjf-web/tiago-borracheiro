import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  label: string;
  color?: 'blue' | 'orange' | 'red';
}

interface Props {
  center: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  className?: string;
}

function createIcon(color: string) {
  return L.divIcon({
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 8px ${color}"></div>`,
    className: '',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const icons = {
  blue: createIcon('#3B82F6'),
  orange: createIcon('#F97316'),
  red: createIcon('#EF4444'),
};

export default function MapView({ center, zoom = 15, markers = [], className = '' }: Props) {
  return (
    <MapContainer center={center} zoom={zoom} className={className}
      zoomControl={false} attributionControl={false}
      style={{ width: '100%', height: '100%' }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      {markers.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={icons[m.color || 'orange']}>
          <Popup><span className="text-sm font-medium">{m.label}</span></Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
