import { useNavigate } from 'react-router-dom';
import { Star, Wrench, Clock, TrendingUp, LogOut, ArrowRightLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { providerReviews } from '../../data/mockData';
import StarRating from '../../components/shared/StarRating';
import BottomNav from '../../components/shared/BottomNav';

export default function ProviderProfilePage() {
  const navigate = useNavigate();
  const { user, switchRole, logout } = useApp();

  const initials = user?.name
    ? user.name
        .split(' ')
        .filter((_, i, arr) => i === 0 || i === arr.length - 1)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'TB';

  const stats = [
    { label: 'Total Servicos', value: user?.totalServices || 1247, icon: Wrench },
    { label: 'Taxa Aceitacao', value: `${user?.acceptanceRate || 94}%`, icon: TrendingUp },
    { label: 'Tempo Medio', value: user?.avgResponseTime || '8 min', icon: Clock },
  ];

  const memberDate = user?.memberSince
    ? new Date(user.memberSince).toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      })
    : 'junho 2023';

  const handleSwitchRole = () => {
    switchRole('client');
    navigate('/client');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* Header area */}
      <div className="bg-gradient-to-b from-provider/10 to-transparent pt-12 pb-6 px-4">
        <div className="max-w-lg mx-auto flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-provider to-purple-800 flex items-center justify-center mb-4 glow-provider animate-fade-in">
            <span className="text-white font-bold text-3xl">{initials}</span>
          </div>

          {/* Name */}
          <h1
            className="text-xl font-bold text-text-primary animate-fade-in"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            {user?.name || 'Nome da Sua Empresa Aqui'}
          </h1>

          {/* Rating */}
          <div
            className="flex items-center gap-2 mt-2 animate-fade-in"
            style={{ animationDelay: '0.15s', opacity: 0 }}
          >
            <StarRating rating={Math.round(user?.rating || 4.8)} size={20} readonly />
            <span className="text-warning font-bold text-sm">
              {user?.rating || 4.8}
            </span>
          </div>

          <p
            className="text-text-secondary text-xs mt-1 animate-fade-in"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            Membro desde {memberDate}
          </p>
        </div>
      </div>

      <div className="px-4 max-w-lg mx-auto space-y-4">
        {/* Stats row */}
        <div
          className="grid grid-cols-3 gap-2 animate-fade-in"
          style={{ animationDelay: '0.25s', opacity: 0 }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-surface rounded-2xl p-3 border border-surface-lighter/20 text-center"
              >
                <div className="w-8 h-8 rounded-lg bg-provider/10 flex items-center justify-center mx-auto mb-2">
                  <Icon size={16} className="text-provider" />
                </div>
                <p className="text-text-primary font-bold text-base">{stat.value}</p>
                <p className="text-text-secondary text-[10px] mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Reviews section */}
        <div
          className="animate-fade-in"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <h3 className="text-text-secondary text-xs font-medium uppercase tracking-wider mb-3 px-1">
            Avaliacoes Recentes
          </h3>
          <div className="space-y-2">
            {providerReviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-surface rounded-2xl p-4 border border-surface-lighter/20 animate-fade-in"
                style={{ animationDelay: `${0.35 + index * 0.05}s`, opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center">
                      <span className="text-text-secondary text-xs font-bold">
                        {review.client[0]}
                      </span>
                    </div>
                    <span className="text-text-primary text-sm font-medium">
                      {review.client}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < review.rating
                            ? 'text-warning fill-warning'
                            : 'text-surface-lighter'
                        }
                        strokeWidth={i < review.rating ? 0 : 1.5}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {review.comment}
                </p>
                <p className="text-text-secondary/50 text-[10px] mt-2">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                  {review.service ? ` - ${review.service}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Switch role */}
        <button
          onClick={handleSwitchRole}
          className="w-full bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3 hover:bg-primary/15 transition-colors animate-fade-in"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <ArrowRightLeft size={20} className="text-primary" />
          </div>
          <span className="text-primary font-medium text-sm">
            Trocar para Cliente
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full border border-emergency/20 rounded-2xl p-4 flex items-center gap-3 hover:bg-emergency/5 transition-colors animate-fade-in"
          style={{ animationDelay: '0.65s', opacity: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-emergency/10 flex items-center justify-center">
            <LogOut size={20} className="text-emergency" />
          </div>
          <span className="text-emergency font-medium text-sm">Sair</span>
        </button>
      </div>

      <BottomNav role="provider" />
    </div>
  );
}
