import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { incomingCall } from '../../data/mockData';
import MapView from '../../components/shared/MapView';

export default function NavigationPage() {
  const navigate = useNavigate();

  const clientPos = incomingCall.clientLocation || { lat: -23.563, lng: -46.6545 };
  const [providerPos, setProviderPos] = useState({
    lat: -23.5615,
    lng: -46.656,
  });
  const [distance, setDistance] = useState(1.2);
  const [eta, setEta] = useState(8);

  // Simulate provider movement toward client
  useEffect(() => {
    const interval = setInterval(() => {
      setProviderPos((prev) => {
        const dlat = clientPos.lat - prev.lat;
        const dlng = clientPos.lng - prev.lng;
        const dist = Math.sqrt(dlat * dlat + dlng * dlng);

        if (dist < 0.0003) {
          clearInterval(interval);
          return prev;
        }

        return {
          lat: prev.lat + dlat * 0.06,
          lng: prev.lng + dlng * 0.06,
        };
      });

      setDistance((prev) => Math.max(0.1, prev - 0.08));
      setEta((prev) => Math.max(1, prev - 0.3));
    }, 1500);

    return () => clearInterval(interval);
  }, [clientPos.lat, clientPos.lng]);

  const markers = [
    {
      id: 'provider',
      lat: providerPos.lat,
      lng: providerPos.lng,
      color: 'blue',
      label: 'Voce',
    },
    {
      id: 'client',
      lat: clientPos.lat,
      lng: clientPos.lng,
      color: 'red',
      label: incomingCall.client?.name || 'Cliente',
    },
  ];

  const mapCenter = [
    (providerPos.lat + clientPos.lat) / 2,
    (providerPos.lng + clientPos.lng) / 2,
  ];

  return (
    <div className="h-screen w-full bg-bg relative overflow-hidden">
      {/* Full-screen map */}
      <div className="absolute inset-0" style={{ bottom: '140px' }}>
        <MapView center={mapCenter} zoom={15} markers={markers} recenter />
      </div>

      {/* Top floating bar */}
      <div className="absolute top-4 left-4 right-4 z-20 animate-fade-in">
        <div className="bg-surface/90 backdrop-blur-xl rounded-2xl p-4 border border-surface-lighter/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Navigation size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-text-primary font-semibold text-sm">
                {incomingCall.client?.name || 'Cliente'}
              </p>
              <p className="text-text-secondary text-xs">
                {incomingCall.service} - {incomingCall.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom floating bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 animate-slide-up">
        <div className="bg-surface/95 backdrop-blur-xl rounded-t-3xl border-t border-surface-lighter/20 p-5">
          {/* Handle */}
          <div className="w-10 h-1 bg-surface-lighter rounded-full mx-auto mb-4" />

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <MapPin size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-text-primary font-bold text-lg">
                  {distance.toFixed(1)} km
                </p>
                <p className="text-text-secondary text-xs">Distancia</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-text-primary font-bold text-lg">
                  {Math.round(eta)} min
                </p>
                <p className="text-text-secondary text-xs">Tempo estimado</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/provider/execution')}
            className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-success to-success-dark text-white active:scale-[0.98] transition-transform glow-success"
          >
            Cheguei
          </button>
        </div>
      </div>
    </div>
  );
}
