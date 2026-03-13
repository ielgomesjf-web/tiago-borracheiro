import { useNavigate } from 'react-router-dom';
import { Car, Bike, Truck, LogOut, ArrowRightLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../../components/shared/BottomNav';

const vehicleIcons = { carro: Car, moto: Bike, van: Truck };

export default function ClientProfilePage() {
  const navigate = useNavigate();
  const { user, switchRole, logout } = useApp();

  const initials = user?.name
    ? user.name
        .split(' ')
        .filter((_, i, arr) => i === 0 || i === arr.length - 1)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'CL';

  const handleSwitchRole = () => {
    switchRole('provider');
    navigate('/provider');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Header area */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent pt-12 pb-6 px-4">
        <div className="max-w-lg mx-auto flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-4 glow-primary animate-fade-in">
            <span className="text-white font-bold text-3xl">{initials}</span>
          </div>

          {/* Name & info */}
          <h1
            className="text-xl font-bold text-text-primary animate-fade-in"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            {user?.name || 'Cliente'}
          </h1>
          <p
            className="text-text-secondary text-sm mt-1 animate-fade-in"
            style={{ animationDelay: '0.15s', opacity: 0 }}
          >
            {user?.phone || '(11) 98765-4321'}
          </p>
          <p
            className="text-text-secondary text-xs mt-0.5 animate-fade-in"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            {user?.email || 'email@exemplo.com'}
          </p>
        </div>
      </div>

      <div className="px-4 max-w-lg mx-auto space-y-4">
        {/* Vehicles section */}
        <div
          className="animate-fade-in"
          style={{ animationDelay: '0.25s', opacity: 0 }}
        >
          <h3 className="text-text-secondary text-xs font-medium uppercase tracking-wider mb-3 px-1">
            Meus Veiculos
          </h3>
          <div className="space-y-2">
            {(user?.vehicles || []).map((vehicle) => {
              const VIcon = vehicleIcons[vehicle.type] || Car;
              return (
                <div
                  key={vehicle.id}
                  className="bg-surface rounded-2xl p-4 border border-surface-lighter/20 flex items-center gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <VIcon size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-primary font-semibold text-sm">
                      {vehicle.brand} {vehicle.model} {vehicle.year}
                    </p>
                    <p className="text-text-secondary text-xs mt-0.5">
                      {vehicle.plate}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Switch role */}
        <button
          onClick={handleSwitchRole}
          className="w-full bg-provider/10 border border-provider/20 rounded-2xl p-4 flex items-center gap-3 hover:bg-provider/15 transition-colors animate-fade-in"
          style={{ animationDelay: '0.35s', opacity: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-provider/15 flex items-center justify-center">
            <ArrowRightLeft size={20} className="text-provider" />
          </div>
          <span className="text-provider font-medium text-sm">
            Trocar para Borracheiro
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full border border-emergency/20 rounded-2xl p-4 flex items-center gap-3 hover:bg-emergency/5 transition-colors animate-fade-in"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-emergency/10 flex items-center justify-center">
            <LogOut size={20} className="text-emergency" />
          </div>
          <span className="text-emergency font-medium text-sm">Sair</span>
        </button>
      </div>

      <BottomNav role="client" />
    </div>
  );
}
