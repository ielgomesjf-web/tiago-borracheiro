import { useNavigate } from 'react-router-dom';
import { DollarSign, Wrench, Clock, Star, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useApp } from '../../context/AppContext';
import { providerEarnings, providerWeeklyEarnings } from '../../data/mockData';
import BottomNav from '../../components/shared/BottomNav';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-surface-lighter/30 rounded-xl px-3 py-2 text-xs">
        <p className="text-text-primary font-medium">
          R$ {payload[0].value.toFixed(2).replace('.', ',')}
        </p>
      </div>
    );
  }
  return null;
};

export default function ProviderDashboardPage() {
  const navigate = useNavigate();
  const { providerOnline, setProviderOnline, user } = useApp();
  const earnings = providerEarnings.today;

  const stats = [
    {
      label: 'Ganhos Hoje',
      value: `R$ ${earnings.total.toFixed(2).replace('.', ',')}`,
      icon: DollarSign,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'Servicos',
      value: earnings.services,
      icon: Wrench,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Horas Online',
      value: `${earnings.hours}h`,
      icon: Clock,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      label: 'Avaliacao',
      value: user?.rating || '4.8',
      icon: Star,
      color: 'text-warning',
      bg: 'bg-warning/10',
      suffix: <Star size={14} className="text-warning fill-warning ml-1" />,
    },
  ];

  return (
    <div className="min-h-screen bg-bg pb-20">
      <div className="pt-6 px-4 max-w-lg mx-auto">
        {/* Online toggle */}
        <div className="bg-surface rounded-2xl p-5 border border-surface-lighter/20 mb-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-text-primary font-semibold text-lg">
                {providerOnline ? 'Voce esta Online' : 'Voce esta Offline'}
              </h2>
              <p className="text-text-secondary text-xs mt-0.5">
                {providerOnline
                  ? 'Recebendo chamados agora'
                  : 'Ative para receber chamados'}
              </p>
            </div>
            <button
              onClick={() => setProviderOnline(!providerOnline)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                providerOnline ? 'bg-success' : 'bg-surface-lighter'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                  providerOnline ? 'left-9' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Stats grid 2x2 */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-surface rounded-2xl p-4 border border-surface-lighter/20 animate-fade-in"
                style={{ animationDelay: `${0.05 + index * 0.05}s`, opacity: 0 }}
              >
                <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <div className="flex items-center">
                  <span className="text-text-primary font-bold text-xl">{stat.value}</span>
                  {stat.suffix}
                </div>
                <p className="text-text-secondary text-xs mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Weekly chart */}
        <div
          className="bg-surface rounded-2xl p-5 border border-surface-lighter/20 mb-5 animate-fade-in"
          style={{ animationDelay: '0.25s', opacity: 0 }}
        >
          <h3 className="text-text-primary font-semibold text-sm mb-4">Ganhos da Semana</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={providerWeeklyEarnings} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#9CA3AF', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="earnings" radius={[6, 6, 0, 0]}>
                  {providerWeeklyEarnings.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.earnings > 0 ? '#8B5CF6' : '#374151'}
                      fillOpacity={entry.earnings > 300 ? 1 : 0.6}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Simulate incoming call button */}
        {providerOnline && (
          <button
            onClick={() => navigate('/provider/incoming')}
            className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-success to-success-dark text-white active:scale-[0.98] transition-transform glow-success mb-4 flex items-center justify-center gap-2 animate-fade-in"
          >
            <Zap size={20} />
            Simular Chamado
          </button>
        )}

        {/* Waiting status */}
        {providerOnline && (
          <div className="flex items-center justify-center py-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-text-secondary text-sm animate-pulse">
                Aguardando chamados...
              </span>
            </div>
          </div>
        )}
      </div>

      <BottomNav role="provider" />
    </div>
  );
}
