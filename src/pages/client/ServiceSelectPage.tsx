import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { services } from '../../data/mockData';
import TopBar from '../../components/shared/TopBar';
import { Clock, Wrench } from 'lucide-react';

export default function ServiceSelectPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { startOrder } = useApp();
  const navigate = useNavigate();

  const handleConfirm = () => {
    const svc = services.find(s => s.id === selectedId);
    if (!svc) return;
    startOrder({ serviceId: svc.id, serviceName: svc.name, price: svc.price, duration: svc.duration });
    navigate('/client/tracking');
  };

  return (
    <div className="h-full flex flex-col">
      <TopBar title="Escolha o servico" backTo="/client" />
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        <div className="flex flex-col gap-3">
          {services.map((svc, i) => (
            <button key={svc.id}
              onClick={() => setSelectedId(svc.id)}
              className={`animate-fade-in w-full p-4 rounded-xl border text-left transition-all ${
                selectedId === svc.id
                  ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                  : 'border-border bg-bg-surface hover:bg-bg-surface-light'
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedId === svc.id ? 'bg-accent/20 text-accent' : 'bg-bg-surface-light text-text-muted'
                  }`}>
                    <Wrench size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary">{svc.name}</p>
                    <div className="flex items-center gap-1 mt-1 text-text-secondary text-xs">
                      <Clock size={12} /> {svc.duration} min
                    </div>
                  </div>
                </div>
                <p className="font-bold text-base text-text-primary">
                  R$ {svc.price.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-bg-surface/90 backdrop-blur border-t border-border">
        <button onClick={handleConfirm} disabled={!selectedId}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
            selectedId
              ? 'bg-accent text-white hover:bg-accent-dark active:scale-[0.98]'
              : 'bg-bg-surface-lighter text-text-muted cursor-not-allowed'
          }`}>
          {selectedId ? 'Confirmar' : 'Selecione um servico'}
        </button>
      </div>
    </div>
  );
}
