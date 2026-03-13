import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, QrCode, CreditCard, Banknote, ArrowDownCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { providerEarnings, providerWeeklyEarnings, providerTransactions } from '../../data/mockData';
import TopBar from '../../components/shared/TopBar';
import BottomNav from '../../components/shared/BottomNav';

const periods = [
  { key: 'today', label: 'Hoje' },
  { key: 'week', label: 'Semana' },
  { key: 'month', label: 'Mes' },
];

const paymentIcons = {
  pix: QrCode,
  card: CreditCard,
  cash: Banknote,
};

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

export default function WalletPage() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const currentEarnings = providerEarnings[selectedPeriod];

  return (
    <div className="min-h-screen bg-bg pb-20">
      <TopBar title="Carteira" onBack={() => navigate('/provider')} />

      <div className="pt-16 px-4 max-w-lg mx-auto">
        {/* Period tabs */}
        <div className="flex gap-2 mb-5">
          {periods.map(({ key, label }) => {
            const isActive = selectedPeriod === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPeriod(key)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-provider text-white'
                    : 'bg-surface-light text-text-secondary hover:bg-surface-lighter'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Large earnings display */}
        <div className="bg-surface rounded-2xl p-6 border border-surface-lighter/20 mb-5 text-center animate-fade-in">
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">
            Ganhos - {periods.find((p) => p.key === selectedPeriod)?.label}
          </p>
          <p className="text-4xl font-bold text-text-primary">
            R$ {currentEarnings.total.toFixed(2).replace('.', ',')}
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="text-text-secondary text-xs">
              {currentEarnings.services} servicos
            </span>
            <span className="w-1 h-1 rounded-full bg-surface-lighter" />
            <span className="text-text-secondary text-xs">
              {currentEarnings.hours}h online
            </span>
          </div>
        </div>

        {/* Area chart */}
        <div
          className="bg-surface rounded-2xl p-5 border border-surface-lighter/20 mb-5 animate-fade-in"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <h3 className="text-text-primary font-semibold text-sm mb-4">Ganhos Semanal</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={providerWeeklyEarnings}>
                <defs>
                  <linearGradient id="walletGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#9CA3AF', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fill="url(#walletGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions list */}
        <div
          className="animate-fade-in"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <h3 className="text-text-primary font-semibold text-sm mb-3">Transacoes</h3>
          <div className="space-y-2">
            {providerTransactions.map((tx, index) => {
              const PayIcon = paymentIcons[tx.payment] || DollarSign;
              const isPending = tx.status === 'pending';
              const timeStr = tx.date.split(' ')[1] || '';
              return (
                <div
                  key={tx.id}
                  className="bg-surface rounded-2xl p-4 border border-surface-lighter/20 flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${0.25 + index * 0.04}s`, opacity: 0 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center">
                    <PayIcon size={18} className="text-text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-medium truncate">
                      {tx.service}
                    </p>
                    <p className="text-text-secondary text-xs">
                      {tx.client} - {timeStr}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-success font-bold text-sm">
                      +R$ {tx.amount.toFixed(2).replace('.', ',')}
                    </p>
                    <span
                      className={`text-[10px] font-medium ${
                        isPending ? 'text-warning' : 'text-success'
                      }`}
                    >
                      {isPending ? 'Pendente' : 'Recebido'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Withdraw button */}
        <button
          className="w-full mt-5 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-provider to-purple-700 text-white active:scale-[0.98] transition-transform glow-provider flex items-center justify-center gap-2 animate-fade-in"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          <ArrowDownCircle size={20} />
          Sacar
        </button>
      </div>

      <BottomNav role="provider" />
    </div>
  );
}
