import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bike, Car, Truck, Clock, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { serviceCategories } from '../../data/mockData';
import TopBar from '../../components/shared/TopBar';

const vehicleTabs = [
  { key: 'moto', label: 'Moto', icon: Bike },
  { key: 'carro', label: 'Carro', icon: Car },
  { key: 'van', label: 'Van', icon: Truck },
];

export default function ServiceSelectPage() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState('carro');
  const [selectedService, setSelectedService] = useState(null);

  const currentServices = serviceCategories[selectedVehicle]?.services || [];
  const selected = currentServices.find((s) => s.id === selectedService);

  return (
    <div className="min-h-screen bg-bg pb-8">
      <TopBar title="Escolha o servico" onBack={() => navigate(-1)} />

      <div className="pt-16 px-4 max-w-lg mx-auto">
        {/* Vehicle type tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
          {vehicleTabs.map(({ key, label, icon: Icon }) => {
            const isActive = selectedVehicle === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedVehicle(key);
                  setSelectedService(null);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'bg-primary/10 text-primary border-2 border-primary'
                    : 'bg-surface-light text-text-secondary border-2 border-transparent hover:bg-surface-lighter'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Service list */}
        <div className="space-y-3">
          {currentServices.map((service, index) => {
            const isSelected = selectedService === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 animate-fade-in ${
                  isSelected
                    ? 'bg-primary/5 border-primary'
                    : 'bg-surface border-transparent hover:bg-surface-light'
                }`}
                style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-sm ${
                        isSelected ? 'text-primary' : 'text-text-primary'
                      }`}
                    >
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Clock size={13} className="text-text-secondary" />
                      <span className="text-text-secondary text-xs">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span
                      className={`font-bold text-lg ${
                        isSelected ? 'text-primary' : 'text-text-primary'
                      }`}
                    >
                      R$ {service.price.toFixed(2).replace('.', ',')}
                    </span>
                    {isSelected && (
                      <ChevronRight size={18} className="text-primary" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg/90 backdrop-blur-xl border-t border-surface-lighter/20 z-30">
        <button
          disabled={!selected}
          onClick={() =>
            navigate('/client/confirm', {
              state: { vehicleType: selectedVehicle, service: selected },
            })
          }
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
            selected
              ? 'bg-gradient-to-r from-primary to-primary-dark text-white active:scale-[0.98] glow-primary'
              : 'bg-surface-lighter text-text-secondary cursor-not-allowed'
          }`}
        >
          {selected
            ? `Continuar - R$ ${selected.price.toFixed(2).replace('.', ',')}`
            : 'Selecione um servico'}
        </button>
      </div>
    </div>
  );
}
