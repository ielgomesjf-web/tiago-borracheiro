import { orderHistory } from '../../data/mockData';
import BottomNav from '../../components/shared/BottomNav';
import TopBar from '../../components/shared/TopBar';
import StarRating from '../../components/shared/StarRating';
import { Car, Bike } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="h-full flex flex-col">
      <TopBar title="Meu Historico" backTo="/client" />
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="flex flex-col gap-3">
          {orderHistory.map((order, i) => (
            <div key={order.id}
              className="animate-fade-in bg-bg-surface rounded-xl border border-border p-4"
              style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center text-accent flex-shrink-0">
                  {order.vehicleType === 'moto' ? <Bike size={18} /> : <Car size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-text-primary">{order.service}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      order.status === 'completed'
                        ? 'bg-success/15 text-success'
                        : 'bg-danger/15 text-danger'
                    }`}>
                      {order.status === 'completed' ? 'Concluido' : 'Cancelado'}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{order.provider}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted">{order.date}</span>
                      {order.rating > 0 && <StarRating rating={order.rating} size={12} />}
                    </div>
                    <p className="font-bold text-sm text-text-primary">
                      R$ {order.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav variant="client" />
    </div>
  );
}
