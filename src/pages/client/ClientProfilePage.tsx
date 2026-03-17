import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNav from '../../components/shared/BottomNav';
import Avatar from '../../components/shared/Avatar';
import { ArrowRightLeft, LogOut, Car, Bike } from 'lucide-react';

export default function ClientProfilePage() {
  const { client, switchRole, logout } = useApp();
  const navigate = useNavigate();

  const handleSwitch = () => { switchRole('provider'); navigate('/provider'); };
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-8 pb-20">
        {/* Avatar & Info */}
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <Avatar name={client.name} size="lg" color="accent" />
          <h2 className="text-xl font-bold mt-4">{client.name}</h2>
          <p className="text-text-secondary text-sm mt-1">{client.phone}</p>
          <p className="text-text-muted text-sm">{client.email}</p>
        </div>

        {/* Vehicles */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Meus Veiculos</h3>
          <div className="flex flex-col gap-3">
            {client.vehicles.map((v, i) => (
              <div key={i} className="flex items-center gap-3 bg-bg-surface rounded-xl border border-border p-4">
                <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
                  {v.type === 'moto' ? <Bike size={18} /> : <Car size={18} />}
                </div>
                <div>
                  <p className="font-medium text-sm text-text-primary">{v.model}</p>
                  <p className="text-xs text-text-muted">{v.plate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <button onClick={handleSwitch}
            className="w-full py-3.5 rounded-xl border border-primary text-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors">
            <ArrowRightLeft size={18} /> Trocar para Borracheiro
          </button>
          <button onClick={handleLogout}
            className="w-full py-3.5 rounded-xl border border-danger text-danger font-semibold flex items-center justify-center gap-2 hover:bg-danger/10 transition-colors">
            <LogOut size={18} /> Sair
          </button>
        </div>
      </div>
      <BottomNav variant="client" />
    </div>
  );
}
