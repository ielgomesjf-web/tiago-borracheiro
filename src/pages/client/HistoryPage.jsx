import { useNavigate } from 'react-router-dom';
import { Car, Bike, Truck, Star, Calendar } from 'lucide-react';
import { orderHistory } from '../../data/mockData';
import TopBar from '../../components/shared/TopBar';
import BottomNav from '../../components/shared/BottomNav';

const vehicleIcons = { carro: Car, moto: Bike, van: Truck };

export default function HistoryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg pb-20">
      <TopBar title="Meu Historico" onBack={() => navigate('/client')} />

      <div className="pt-16 px-4 max-w-lg mx-auto">
        {orderHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
            <Calendar size={48} className="mb-4 opacity-30" />
            <p>Nenhum servico realizado ainda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orderHistory.map((order, index) => {
              const VIcon = vehicleIcons[order.vehicleType] || Car;
              const isCompleted = order.status === 'completed';
              const isCancelled = order.status === 'cancelled';

              return (
                <div
                  key={order.id}
                  className="bg-surface rounded-2xl p-4 border border-surface-lighter/20 animate-fade-in"
                  style={{ animationDelay: `${index * 0.06}s`, opacity: 0 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-surface-light flex items-center justify-center flex-shrink-0">
                      <VIcon
                        size={20}
                        className={isCompleted ? 'text-primary' : 'text-text-secondary'}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-text-primary font-semibold text-sm truncate">
                          {order.service}
                        </h3>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ml-2 ${
                            isCompleted
                              ? 'bg-success/10 text-success'
                              : 'bg-emergency/10 text-emergency'
                          }`}
                        >
                          {isCompleted ? 'Concluido' : 'Cancelado'}
                        </span>
                      </div>

                      <p className="text-text-secondary text-xs">
                        {typeof order.provider === 'object'
                          ? order.provider.name
                          : order.provider}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-text-secondary text-xs">
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </span>

                        <div className="flex items-center gap-3">
                          {isCompleted && order.rating && (
                            <div className="flex items-center gap-1">
                              <Star
                                size={12}
                                className="text-warning fill-warning"
                              />
                              <span className="text-text-secondary text-xs">
                                {order.rating}
                              </span>
                            </div>
                          )}
                          <span className="text-text-primary font-semibold text-sm">
                            R$ {order.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav role="client" />
    </div>
  );
}
