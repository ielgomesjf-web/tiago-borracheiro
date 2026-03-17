import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Car, UserPlus, ArrowRight } from 'lucide-react';
import TireIcon from '../components/shared/TireIcon';

export default function RoleSelectPage() {
  const { switchRole } = useApp();
  const navigate = useNavigate();

  const goClient = () => { switchRole('client'); navigate('/client'); };
  const goRegister = () => { switchRole('client'); navigate('/client/profile'); };
  const goProvider = () => { switchRole('provider'); navigate('/provider'); };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-[80px]" />

      {/* Provider link */}
      <button onClick={goProvider}
        className="absolute top-6 right-6 flex items-center gap-1 text-text-secondary text-sm hover:text-primary transition-colors">
        Borracheiro <ArrowRight size={14} />
      </button>

      {/* Logo */}
      <div className="animate-fade-in mb-6">
        <TireIcon size={80} spinning />
      </div>

      <h1 className="text-2xl font-bold text-text-primary mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        Nome da Sua Empresa Aqui
      </h1>
      <p className="text-text-secondary text-sm mb-10 animate-fade-in" style={{ animationDelay: '0.15s' }}>
        Socorro na estrada, rapido e seguro
      </p>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-4 max-w-xs">
        <button onClick={goClient}
          className="animate-fade-in w-full py-4 px-6 bg-gradient-to-r from-accent to-accent-dark rounded-xl text-white font-bold text-base flex items-center justify-center gap-3 hover:shadow-[0_4px_25px_rgba(249,115,22,0.4)] transition-all active:scale-[0.98]"
          style={{ animationDelay: '0.2s' }}>
          <Car size={22} />
          <div className="text-left">
            <div>Sou Cliente</div>
            <div className="text-xs font-normal opacity-80">Pedir socorro</div>
          </div>
        </button>

        <button onClick={goRegister}
          className="animate-fade-in w-full py-4 px-6 bg-gradient-to-r from-success to-success-dark rounded-xl text-white font-bold text-base flex items-center justify-center gap-3 hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] transition-all active:scale-[0.98]"
          style={{ animationDelay: '0.3s' }}>
          <UserPlus size={22} />
          <div className="text-left">
            <div>Cadastro</div>
            <div className="text-xs font-normal opacity-80">Novo cliente</div>
          </div>
        </button>
      </div>

      <p className="absolute bottom-6 text-text-muted text-xs">v1.0 — Nome da Sua Empresa Aqui</p>
    </div>
  );
}
