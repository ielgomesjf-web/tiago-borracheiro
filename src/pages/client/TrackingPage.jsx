import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Star, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { activeOrder as mockOrder } from '../../data/mockData';
import MapView from '../../components/shared/MapView';

const statusSteps = [
  { key: 'accepted', label: 'Aceito' },
  { key: 'en_route', label: 'A caminho' },
  { key: 'arrived', label: 'Chegou' },
  { key: 'in_service', label: 'Em servico' },
  { key: 'completed', label: 'Concluido' },
];

export default function TrackingPage() {
  const navigate = useNavigate();
  const { currentOrder } = useApp();
  const order = currentOrder || mockOrder;

  const [currentStep, setCurrentStep] = useState(1);
  const [providerPos, setProviderPos] = useState({
    lat: order.provider?.lat || -23.564,
    lng: order.provider?.lng || -46.653,
  });

  const clientPos = order.clientLocation || { lat: -23.563, lng: -46.6545 };

  // Simulate provider movement toward client
  useEffect(() => {
    const interval = setInterval(() => {
      setProviderPos((prev) => {
        const dlat = clientPos.lat - prev.lat;
        const dlng = clientPos.lng - prev.lng;
        const dist = Math.sqrt(dlat * dlat + dlng * dlng);

        if (dist < 0.0005) {
          clearInterval(interval);
          return prev;
        }

        return {
          lat: prev.lat + dlat * 0.08,
          lng: prev.lng + dlng * 0.08,
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [clientPos.lat, clientPos.lng]);

  // Auto-advance steps for demo
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(2), 5000),
      setTimeout(() => setCurrentStep(3), 12000),
      setTimeout(() => setCurrentStep(4), 18000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const markers = [
    { id: 'client', lat: clientPos.lat, lng: clientPos.lng, color: 'blue', label: 'Voce' },
    {
      id: 'provider',
      lat: providerPos.lat,
      lng: providerPos.lng,
      color: 'orange',
      label: order.provider?.name || 'Borracheiro',
    },
  ];

  const mapCenter = [
    (clientPos.lat + providerPos.lat) / 2,
    (clientPos.lng + providerPos.lng) / 2,
  ];

  return (
    <div className="h-screen w-full bg-bg relative overflow-hidden">
      {/* Full-screen map */}
      <div className="absolute inset-0" style={{ bottom: '280px' }}>
        <MapView center={mapCenter} zoom={15} markers={markers} recenter />
      </div>

      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-20 animate-slide-up">
        <div className="bg-surface/95 backdrop-blur-xl rounded-t-3xl border-t border-surface-lighter/20 p-5">
          {/* Handle */}
          <div className="w-10 h-1 bg-surface-lighter rounded-full mx-auto mb-4" />

          {/* Provider info */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {(order.provider?.name || 'R')[0]}
                </span>
              </div>
              <div>
                <h3 className="text-text-primary font-semibold">
                  {order.provider?.name || 'Borracheiro'}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={12} className="text-warning fill-warning" />
                  <span className="text-text-secondary text-xs">
                    {order.provider?.rating || 4.9}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center hover:bg-surface-lighter transition-colors">
                <Phone size={18} className="text-accent" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center hover:bg-surface-lighter transition-colors">
                <MessageCircle size={18} className="text-accent" />
              </button>
            </div>
          </div>

          {/* ETA */}
          <div className="flex items-center justify-center mb-5 py-3 bg-surface-light/60 rounded-xl">
            <span className="text-text-secondary text-sm mr-2">Chegada estimada:</span>
            <span className="text-primary font-bold text-xl">
              {currentStep >= 3 ? 'Chegou!' : `${6 - currentStep} min`}
            </span>
          </div>

          {/* Status steps */}
          <div className="flex items-center justify-between mb-5 px-1">
            {statusSteps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              return (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-500 mx-auto ${
                        isCompleted
                          ? 'bg-success'
                          : isCurrent
                            ? 'bg-primary animate-pulse'
                            : 'bg-surface-lighter'
                      }`}
                    >
                      {isCompleted && (
                        <CheckCircle size={10} className="text-white" />
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[9px] mt-1.5 text-center ${
                      isCompleted || isCurrent
                        ? 'text-text-primary font-medium'
                        : 'text-text-secondary'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress line */}
          <div className="relative h-0.5 bg-surface-lighter rounded-full mb-5 mx-4">
            <div
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Service info */}
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-text-secondary">
              {order.service?.name || 'Troca de pneu'}
            </span>
            <span className="text-text-primary font-semibold">
              R$ {(order.service?.price || 60).toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Complete button (visible at step 4+) */}
          {currentStep >= 4 && (
            <button
              onClick={() => navigate('/client/rating')}
              className="w-full py-3.5 rounded-2xl font-bold text-base bg-gradient-to-r from-success to-success-dark text-white active:scale-[0.98] transition-transform glow-success animate-fade-in"
            >
              Servico Concluido
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
