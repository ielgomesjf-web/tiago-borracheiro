import { useNavigate } from 'react-router-dom';
import { Car, Wrench, Circle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const { switchRole } = useApp();

  const handleSelect = (role, path) => {
    switchRole(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-provider/5 rounded-full blur-3xl" />

      {/* Logo and branding */}
      <div className="flex flex-col items-center mb-12 animate-fade-in relative z-10">
        <div className="relative mb-6">
          <Circle size={64} className="text-primary" strokeWidth={1.5} />
          <Wrench
            size={32}
            className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Tiago Borracheiro
        </h1>
        <p className="text-text-secondary mt-2 text-center text-sm">
          Socorro na estrada, rapido e seguro
        </p>
      </div>

      {/* Role selection cards */}
      <div className="w-full max-w-sm space-y-4 relative z-10">
        {/* Client card */}
        <button
          onClick={() => handleSelect('client', '/client')}
          className="w-full animate-fade-in"
          style={{ animationDelay: '0.15s', opacity: 0 }}
        >
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-primary to-primary-dark group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 glow-primary">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Car size={28} className="text-white" />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-xl font-bold text-white">Sou Cliente</h2>
                <p className="text-white/70 text-sm mt-1">
                  Preciso de ajuda com meu pneu
                </p>
              </div>
            </div>
          </div>
        </button>

        {/* Provider card */}
        <button
          onClick={() => handleSelect('provider', '/provider')}
          className="w-full animate-fade-in"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-provider to-purple-800 group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 glow-provider">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Wrench size={28} className="text-white" />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-xl font-bold text-white">Sou Borracheiro</h2>
                <p className="text-white/70 text-sm mt-1">
                  Quero atender clientes
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <p
        className="text-text-secondary/40 text-xs mt-16 animate-fade-in relative z-10"
        style={{ animationDelay: '0.5s', opacity: 0 }}
      >
        v1.0 - Tiago Borracheiro
      </p>
    </div>
  );
}
