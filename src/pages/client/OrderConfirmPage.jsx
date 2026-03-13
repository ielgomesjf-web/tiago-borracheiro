import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Car, Bike, Truck, Clock, QrCode, CreditCard, Banknote } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import TopBar from '../../components/shared/TopBar';

const vehicleIcons = { moto: Bike, carro: Car, van: Truck };

const paymentOptions = [
  { id: 'pix', label: 'Pix', icon: QrCode, desc: 'Transferencia instantanea' },
  { id: 'cartao', label: 'Cartao', icon: CreditCard, desc: 'Credito ou debito' },
  { id: 'dinheiro', label: 'Dinheiro', icon: Banknote, desc: 'Pagamento em especie' },
];

export default function OrderConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { startOrder } = useApp();
  const [selectedPayment, setSelectedPayment] = useState('pix');

  const { vehicleType, service } = location.state || {
    vehicleType: 'carro',
    service: { name: 'Troca de pneu', price: 80, duration: '30 min' },
  };

  const VehicleIcon = vehicleIcons[vehicleType] || Car;

  const handleConfirm = () => {
    startOrder({
      service,
      vehicleType,
      payment: selectedPayment,
      address: 'Av. Paulista, 1578 - Sao Paulo',
    });
    navigate('/client/tracking');
  };

  return (
    <div className="min-h-screen bg-bg pb-28">
      <TopBar title="Confirmar Pedido" onBack={() => navigate(-1)} />

      <div className="pt-16 px-4 max-w-lg mx-auto space-y-4">
        {/* Order summary card */}
        <div className="bg-surface rounded-2xl p-5 border border-surface-lighter/20 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <VehicleIcon size={28} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-text-primary font-semibold">{service.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={13} className="text-text-secondary" />
                <span className="text-text-secondary text-xs">{service.duration}</span>
              </div>
            </div>
            <span className="text-primary font-bold text-lg">
              R$ {service.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {/* Location section */}
        <div
          className="bg-surface rounded-2xl p-5 border border-surface-lighter/20 animate-fade-in"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <h4 className="text-text-secondary text-xs font-medium uppercase tracking-wider mb-3">
            Local
          </h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <MapPin size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-text-primary text-sm font-medium">
                Av. Paulista, 1578 - Sao Paulo
              </p>
              <p className="text-text-secondary text-xs mt-0.5">
                Bela Vista, SP
              </p>
            </div>
          </div>
        </div>

        {/* Payment section */}
        <div
          className="bg-surface rounded-2xl p-5 border border-surface-lighter/20 animate-fade-in"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <h4 className="text-text-secondary text-xs font-medium uppercase tracking-wider mb-3">
            Pagamento
          </h4>
          <div className="space-y-2">
            {paymentOptions.map(({ id, label, icon: Icon, desc }) => {
              const isActive = selectedPayment === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedPayment(id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/5 border-primary'
                      : 'bg-surface-light border-transparent hover:bg-surface-lighter'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-primary/15' : 'bg-surface-lighter'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={isActive ? 'text-primary' : 'text-text-secondary'}
                    />
                  </div>
                  <div className="text-left">
                    <p
                      className={`text-sm font-medium ${
                        isActive ? 'text-primary' : 'text-text-primary'
                      }`}
                    >
                      {label}
                    </p>
                    <p className="text-text-secondary text-xs">{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Total */}
        <div
          className="bg-surface rounded-2xl p-5 border border-surface-lighter/20 animate-fade-in"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">Total</span>
            <span className="text-text-primary font-bold text-2xl">
              R$ {service.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg/90 backdrop-blur-xl border-t border-surface-lighter/20 z-30">
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-primary to-primary-dark text-white active:scale-[0.98] transition-transform glow-primary"
        >
          Solicitar Borracheiro
        </button>
      </div>
    </div>
  );
}
