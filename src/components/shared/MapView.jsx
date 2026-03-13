import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

const SAO_PAULO_CENTER = [-23.5630, -46.6545];

function createMarkerIcon(type) {
  if (type === 'provider') {
    return L.divIcon({
      className: '',
      html: `
        <div style="
          width:36px;height:36px;
          background:#F97316;border:3px solid #EA580C;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 2px 8px rgba(249,115,22,0.4);
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -22],
    });
  }

  if (type === 'emergency') {
    return L.divIcon({
      className: '',
      html: `
        <div style="
          width:40px;height:40px;
          background:#EF4444;border:3px solid #DC2626;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 20px rgba(239,68,68,0.6),0 0 50px rgba(239,68,68,0.25);
          animation:emergPulse 1s ease-in-out infinite;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <style>
          @keyframes emergPulse {
            0%,100%{transform:scale(1);box-shadow:0 0 20px rgba(239,68,68,0.6),0 0 50px rgba(239,68,68,0.25)}
            50%{transform:scale(1.1);box-shadow:0 0 35px rgba(239,68,68,0.8),0 0 70px rgba(239,68,68,0.35)}
          }
        </style>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -24],
    });
  }

  // Default: client - blue pulsing dot
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:24px;height:24px;
        background:#0EA5E9;border:3px solid #0284C7;border-radius:50%;
        box-shadow:0 0 12px rgba(14,165,233,0.5),0 0 24px rgba(14,165,233,0.2);
        animation:clientPulse 2s ease-in-out infinite;
      "></div>
      <style>
        @keyframes clientPulse {
          0%,100%{box-shadow:0 0 12px rgba(14,165,233,0.5),0 0 24px rgba(14,165,233,0.2)}
          50%{box-shadow:0 0 20px rgba(14,165,233,0.7),0 0 40px rgba(14,165,233,0.3)}
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -16],
  });
}

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export default function MapView({
  center = SAO_PAULO_CENTER,
  zoom = 15,
  markers = [],
  className = '',
  children,
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={`w-full h-full ${className}`}
      zoomControl={false}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <RecenterMap center={center} />

      {markers.map((marker, idx) => (
        <Marker
          key={`marker-${idx}-${marker.lat}-${marker.lng}`}
          position={[marker.lat, marker.lng]}
          icon={createMarkerIcon(marker.type || 'client')}
        >
          {marker.label && (
            <Popup>
              <span className="text-sm font-medium">{marker.label}</span>
            </Popup>
          )}
        </Marker>
      ))}

      {children}
    </MapContainer>
  );
}
