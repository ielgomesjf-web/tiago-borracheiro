import { useApp } from '../../context/AppContext';
import { providerProfile, weeklyEarnings } from '../../data/mockData';
import BottomNav from '../../components/shared/BottomNav';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DollarSign, Wrench, Clock, Star } from 'lucide-react';

const stats = [
  { icon: <DollarSign size={18} />, value: `R$ ${providerProfile.todayEarnings.toFixed(0)}`, label: 'Ganhos Hoje', color: 'text-success' },
  { icon: <Wrench size={18} />, value: String(providerProfile.todayServices), label: 'Servicos', color: 'text-accent' },
  { icon: <Clock size={18} />, value: `${providerProfile.hoursOnline}h`, label: 'Horas Online', color: 'text-info' },
  { icon: <Star size={18} />, value: `${providerProfile.rating}`, label: 'Avaliacao', color: 'text-warning' },
];

export default function ProviderDashboardPage() {
  const { providerOnline, setProviderOnline } = useApp();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-20">
        {/* Online Toggle */}
        <div className="animate-fade-in bg-bg-surface rounded-xl border border-border p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${providerOnline ? 'bg-success animate-pulse' : 'bg-text-muted'}`} />
                <p className="font-semibold text-text-primary">
                  Voce esta {providerOnline ? 'Online' : 'Offline'}
                </p>
              </div>
              <p className="text-xs text-text-secondary mt-1">Ative para receber chamados</p>
            </div>
            <button onClick={() => setProviderOnline(!providerOnline)}
              className={`w-14 h-7 rounded-full relative transition-colors ${providerOnline ? 'bg-success' : 'bg-bg-surface-lighter'}`}>
              <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all ${providerOnline ? 'left-7.5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="animate-fade-in bg-bg-surface rounded-xl border border-border p-4"
              style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className="text-xl font-bold text-text-primary">{s.value}</p>
              <p className="text-xs text-text-secondary mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div className="animate-fade-in bg-bg-surface rounded-xl border border-border p-4" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-semibold text-sm text-text-primary mb-4">Ganhos da Semana</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F9FAFB' }}
                formatter={(v) => [`R$ ${v}`, 'Ganhos']} />
              <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Waiting indicator */}
        {providerOnline && (
          <div className="mt-6 text-center animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm">Aguardando chamados...</span>
            </div>
          </div>
        )}
      </div>
      <BottomNav variant="provider" />
    </div>
  );
}
