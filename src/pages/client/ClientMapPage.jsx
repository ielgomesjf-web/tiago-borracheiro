import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { nearbyProviders } from '../../data/mockData';
import { useGeolocation } from '../../hooks/useGeolocation';
import MapView from '../../components/shared/MapView';
import EmergencyButton from '../../components/shared/EmergencyButton';
import BottomNav from '../../components/shared/BottomNav';

export default function ClientMapPage() {
  const navigate = useNavigate();
  const { user } = useApp();
  const { position } = useGeolocation();

  const onlineCount = nearbyProviders.filter((p) => p.online).length;

  const markers = nearbyProviders
    .filter((p) => p.online)
    .map((p) => ({
      id: p.id,
      lat: p.lat,
      lng: p.lng,
      color: 'orange',
      label: `${p.name} - ${p.rating}`,
    }));

  return (
    <div className="h-screen w-full bg-bg relative overflow-hidden">
      {/* Full-screen map */}
      <div className="absolute inset-0" style={{ bottom: '64px' }}>
        <MapView
          center={[position.lat, position.lng]}
          zoom={14}
          markers={markers}
        />
      </div>

      {/* Top floating bar */}
      <div className="absolute top-4 left-4 right-4 z-20 animate-fade-in">
        <div className="bg-surface/85 backdrop-blur-xl rounded-2xl p-4 border border-surface-lighter/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-text-primary font-semibold text-base">
                Ola, {user?.name?.split(' ')[0] || 'Cliente'}
              </h2>
              <p className="text-text-secondary text-xs mt-0.5">
                Precisa de ajuda com pneu?
              </p>
            </div>
            <div className="flex items-center gap-2 bg-surface-light/80 rounded-xl px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-success text-xs font-medium">
                {onlineCount} borracheiros perto
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom emergency button */}
      <div className="absolute bottom-20 left-4 right-4 z-20 animate-slide-up">
        <EmergencyButton onClick={() => navigate('/client/services')} />
      </div>

      {/* Bottom Navigation */}
      <BottomNav role="client" />
    </div>
  );
}
