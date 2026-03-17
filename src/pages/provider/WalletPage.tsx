import { providerProfile, transactions, weeklyEarnings } from '../../data/mockData';
import BottomNav from '../../components/shared/BottomNav';
import TopBar from '../../components/shared/TopBar';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { QrCode, CreditCard, Banknote } from 'lucide-react';

const methodIcons = {
  pix: <QrCode size={16} />,
  card: <CreditCard size={16} />,
  cash: <Banknote size={16} />,
};

export default function WalletPage() {
  return (
    <div className="h-full flex flex-col">
      <TopBar title="Carteira" backTo="/provider" />
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        {/* Balance */}
        <div className="text-center mb-6 animate-fade-in">
          <p className="text-3xl font-bold text-text-primary">
            R$ {providerProfile.todayEarnings.toFixed(2).replace('.', ',')}
          </p>
          <p className="text-sm text-text-secondary mt-1">
            {providerProfile.todayServices} servicos &bull; {providerProfile.hoursOnline}h online
          </p>
        </div>

        {/* Chart */}
        <div className="animate-fade-in bg-bg-surface rounded-xl border border-border p-4 mb-6" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-semibold text-sm text-text-primary mb-3">Ganhos Semanal</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={weeklyEarnings}>
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1F2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F9FAFB' }}
                formatter={(v) => [`R$ ${v}`, 'Ganhos']} />
              <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} fill="url(#purpleGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions */}
        <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <h3 className="font-semibold text-sm text-text-primary mb-3">Transacoes</h3>
          <div className="flex flex-col gap-2">
            {transactions.map((tx, i) => (
              <div key={tx.id} className="animate-fade-in bg-bg-surface rounded-xl border border-border p-3 flex items-center gap-3"
                style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
                <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                  {methodIcons[tx.method]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-text-primary truncate">{tx.service}</p>
                  <p className="text-xs text-text-muted">{tx.client} &bull; {tx.time}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm text-success">+R$ {tx.amount.toFixed(2).replace('.', ',')}</p>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    tx.status === 'received' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'
                  }`}>
                    {tx.status === 'received' ? 'Recebido' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav variant="provider" />
    </div>
  );
}
