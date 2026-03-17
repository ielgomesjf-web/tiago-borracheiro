import { useApp } from '../../context/AppContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { nearbyProviders } from '../../data/mockData';
import MapView from '../../components/shared/MapView';
import SOSButton from '../../components/shared/SOSButton';
import BottomNav from '../../components/shared/BottomNav';

export default function ClientMapPage() {
  const { client } = useApp();
  const { position } = useGeolocation();
  const onlineProviders = nearbyProviders.filter(p => p.online);
  const firstName = client.name.split(' ')[0];

  const markers = [
    { id: 'me', lat: position.lat, lng: position.lng, label: 'Voce', color: 'blue' as const },
    ...onlineProviders.map(p => ({
      id: String(p.id), lat: p.lat, lng: p.lng,
      label: `${p.name} ★${p.rating}`, color: 'orange' as const,
    })),
  ];

  return (
    <div className="h-full flex flex-col relative">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-bg-deep via-bg-deep/80 to-transparent">
        <div className="animate-fade-in">
          <h2 className="text-lg font-bold">Ola, {firstName}</h2>
          <p className="text-text-secondary text-sm">Precisa de ajuda com pneu?</p>
        </div>
        <div className="mt-2 inline-flex items-center gap-2 bg-bg-surface/80 backdrop-blur px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-text-secondary font-medium">{onlineProviders.length} borracheiros perto</span>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapView center={[position.lat, position.lng]} markers={markers} />
      </div>

      {/* SOS Button */}
      <div className="absolute bottom-16 left-4 right-4 z-10 animate-slide-up">
        <SOSButton />
      </div>

      <BottomNav variant="client" />
    </div>
  );
}
