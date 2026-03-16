import { useNavigate } from 'react-router-dom';
import { Car, Bike, UserPlus, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TireIcon from '../components/shared/TireIcon';

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const { switchRole } = useApp();

  const handleSelect = (role, path) => {
    switchRole(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-provider/5 rounded-full blur-3xl" />

      {/* Top bar with provider login */}
      <div className="w-full flex items-center justify-end px-5 pt-5 relative z-20">
        <button
          onClick={() => handleSelect('provider', '/provider')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface/80 backdrop-blur-sm border border-surface-lighter/30 hover:border-provider/50 active:scale-95 transition-all"
        >
          <LogIn size={18} className="text-provider" />
          <span className="text-sm font-semibold text-provider">Borracheiro</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Logo and branding */}
        <div className="flex flex-col items-center mb-14 animate-fade-in relative z-10">
          <div className="relative mb-6 animate-[spin_20s_linear_infinite]">
            <TireIcon size={110} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Nome da Sua Empresa Aqui
          </h1>
          <p className="text-text-secondary mt-2 text-center text-sm">
            Socorro na estrada, rapido e seguro
          </p>
        </div>

        {/* Client action cards */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-4 relative z-10">
          {/* Sou Cliente */}
          <button
            onClick={() => handleSelect('client', '/client')}
            className="animate-fade-in"
            style={{ animationDelay: '0.15s', opacity: 0 }}
          >
            <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-primary to-primary-dark hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 glow-primary aspect-square flex flex-col items-center justify-center gap-3">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Car size={24} className="text-white" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Bike size={24} className="text-white" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-base font-bold text-white">Sou Cliente</h2>
                <p className="text-white/60 text-xs mt-1">Pedir socorro</p>
              </div>
            </div>
          </button>

          {/* Cadastro */}
          <button
            onClick={() => handleSelect('client', '/client/profile')}
            className="animate-fade-in"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-emerald-500 to-emerald-700 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 aspect-square flex flex-col items-center justify-center gap-3"
              style={{ boxShadow: '0 4px 24px rgba(34,197,94,0.3)' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <UserPlus size={32} className="text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-base font-bold text-white">Cadastro</h2>
                <p className="text-white/60 text-xs mt-1">Novo cliente</p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p
          className="text-text-secondary/40 text-xs mt-16 animate-fade-in relative z-10"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          v1.0 - Nome da Sua Empresa Aqui
        </p>
      </div>
    </div>
  );
}
