import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { providerProfile, providerReviews } from '../../data/mockData';
import BottomNav from '../../components/shared/BottomNav';
import Avatar from '../../components/shared/Avatar';
import StarRating from '../../components/shared/StarRating';
import { ArrowRightLeft, LogOut, Wrench, TrendingUp, Clock } from 'lucide-react';

const profileStats = [
  { icon: <Wrench size={16} />, value: providerProfile.totalServices.toLocaleString(), label: 'Total Servicos' },
  { icon: <TrendingUp size={16} />, value: `${providerProfile.acceptanceRate}%`, label: 'Taxa Aceitacao' },
  { icon: <Clock size={16} />, value: `${providerProfile.avgResponseTime} min`, label: 'Tempo Medio' },
];

export default function ProviderProfilePage() {
  const { switchRole, logout } = useApp();
  const navigate = useNavigate();

  const handleSwitch = () => { switchRole('client'); navigate('/client'); };
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-8 pb-20">
        {/* Avatar & Info */}
        <div className="flex flex-col items-center mb-6 animate-fade-in">
          <Avatar name={providerProfile.name} size="lg" color="primary" />
          <h2 className="text-xl font-bold mt-4">{providerProfile.name}</h2>
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={Math.round(providerProfile.rating)} size={16} />
            <span className="text-sm font-semibold text-text-primary">{providerProfile.rating}</span>
          </div>
          <p className="text-xs text-text-muted mt-1">Membro desde {providerProfile.memberSince}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {profileStats.map((s, i) => (
            <div key={i} className="bg-bg-surface rounded-xl border border-border p-3 text-center">
              <div className="text-primary flex justify-center mb-1">{s.icon}</div>
              <p className="font-bold text-lg text-text-primary">{s.value}</p>
              <p className="text-[10px] text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wider mb-3">Avaliacoes Recentes</h3>
          <div className="flex flex-col gap-3">
            {providerReviews.map((review, i) => (
              <div key={review.id} className="animate-fade-in bg-bg-surface rounded-xl border border-border p-4"
                style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar name={review.client} size="sm" color="accent" />
                    <p className="font-medium text-sm text-text-primary">{review.client}</p>
                  </div>
                  <StarRating rating={review.rating} size={12} />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{review.comment}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-text-muted">{review.date}</span>
                  <span className="text-xs text-text-muted">{review.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <button onClick={handleSwitch}
            className="w-full py-3.5 rounded-xl border border-primary text-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors">
            <ArrowRightLeft size={18} /> Trocar para Cliente
          </button>
          <button onClick={handleLogout}
            className="w-full py-3.5 rounded-xl border border-danger text-danger font-semibold flex items-center justify-center gap-2 hover:bg-danger/10 transition-colors">
            <LogOut size={18} /> Sair
          </button>
        </div>
      </div>
      <BottomNav variant="provider" />
    </div>
  );
}
