import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { trackingProvider } from '../../data/mockData';
import MapView from '../../components/shared/MapView';
import Avatar from '../../components/shared/Avatar';
import StarRating from '../../components/shared/StarRating';
import { Phone, MessageCircle } from 'lucide-react';

export default function TrackingPage() {
  const { currentOrder, clearOrder } = useApp();
  const { position } = useGeolocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(trackingProvider.eta);
  const providerStart = useRef({ lat: position.lat + 0.008, lng: position.lng + 0.006 });

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + 0.08, 1);
        setEta(Math.max(0, Math.round(trackingProvider.eta * (1 - next))));
        return next;
      });
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  const provLat = providerStart.current.lat + (position.lat - providerStart.current.lat) * progress;
  const provLng = providerStart.current.lng + (position.lng - providerStart.current.lng) * progress;

  const markers = [
    { id: 'client', lat: position.lat, lng: position.lng, label: 'Voce', color: 'blue' as const },
    { id: 'provider', lat: provLat, lng: provLng, label: trackingProvider.name, color: 'orange' as const },
  ];

  const handleFinish = () => { clearOrder(); navigate('/client'); };

  if (!currentOrder) { navigate('/client'); return null; }

  return (
    <div className="h-full flex flex-col relative">
      {/* Map */}
      <div className="flex-1">
        <MapView center={[position.lat, position.lng]} zoom={14} markers={markers} />
      </div>

      {/* Bottom card */}
      <div className="absolute bottom-0 left-0 right-0 bg-bg-surface rounded-t-2xl border-t border-border p-4 animate-slide-up z-10">
        <div className="flex items-center gap-3 mb-4">
          <Avatar name={trackingProvider.name} size="md" />
          <div className="flex-1">
            <p className="font-bold text-text-primary">{trackingProvider.name}</p>
            <StarRating rating={trackingProvider.rating} size={14} />
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary">
              <Phone size={16} />
            </button>
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary">
              <MessageCircle size={16} />
            </button>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-text-secondary text-sm">Chegada estimada</p>
          <p className="text-2xl font-bold text-text-primary">
            {eta > 0 ? `${eta} min` : 'Chegou!'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-bg-surface-light rounded-full mb-4 overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${progress * 100}%` }} />
        </div>

        <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
          <span>{currentOrder.serviceName}</span>
          <span className="font-bold text-text-primary">R$ {currentOrder.price.toFixed(2).replace('.', ',')}</span>
        </div>

        {progress >= 0.9 && (
          <button onClick={handleFinish}
            className="w-full py-3 bg-success text-white font-bold rounded-xl hover:bg-success-dark transition-colors">
            Servico Concluido
          </button>
        )}
      </div>
    </div>
  );
}
