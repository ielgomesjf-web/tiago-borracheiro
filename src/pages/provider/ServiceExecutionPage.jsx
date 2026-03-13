import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Play, Camera, User, Car } from 'lucide-react';
import { incomingCall } from '../../data/mockData';
import TopBar from '../../components/shared/TopBar';

const checklistItems = [
  { id: 1, label: 'Cheguei no local', icon: CheckCircle, required: true },
  { id: 2, label: 'Servico iniciado', icon: Play, required: true },
  { id: 3, label: 'Foto antes do servico', icon: Camera, required: false },
  { id: 4, label: 'Servico concluido', icon: CheckCircle, required: true },
  { id: 5, label: 'Foto depois do servico', icon: Camera, required: false },
];

export default function ServiceExecutionPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  const toggleItem = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = (completedCount / checklistItems.length) * 100;
  const canFinish = checked[1] && checked[2] && checked[4];

  const handleFinish = () => {
    navigate('/provider');
  };

  return (
    <div className="min-h-screen bg-bg pb-28">
      <TopBar title="Execucao do Servico" onBack={() => navigate(-1)} />

      <div className="pt-16 px-4 max-w-lg mx-auto">
        {/* Client info card */}
        <div className="bg-surface rounded-2xl p-5 border border-surface-lighter/20 mb-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <User size={24} className="text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-text-primary font-semibold">
                {incomingCall.client?.name || 'Cliente'}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Car size={13} className="text-text-secondary" />
                <span className="text-text-secondary text-xs">
                  {incomingCall.vehicleType === 'carro' ? 'Carro' : incomingCall.vehicleType}
                </span>
                <span className="text-text-secondary text-xs">-</span>
                <span className="text-text-secondary text-xs">
                  {incomingCall.service}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="mb-5 animate-fade-in"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary text-xs font-medium">Progresso</span>
            <span className="text-text-primary text-xs font-bold">
              {completedCount}/{checklistItems.length}
            </span>
          </div>
          <div className="h-2 bg-surface-lighter rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-provider to-purple-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {checklistItems.map((item, index) => {
            const isChecked = !!checked[item.id];
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 animate-fade-in ${
                  isChecked
                    ? 'bg-success/5 border-success/30'
                    : 'bg-surface border-transparent hover:bg-surface-light'
                }`}
                style={{ animationDelay: `${0.15 + index * 0.05}s`, opacity: 0 }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isChecked ? 'bg-success/15' : 'bg-surface-lighter'
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-colors ${
                      isChecked ? 'text-success' : 'text-text-secondary'
                    }`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <span
                    className={`text-sm font-medium transition-colors ${
                      isChecked ? 'text-success line-through' : 'text-text-primary'
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.required && !isChecked && (
                    <span className="text-primary text-[10px] ml-2">Obrigatorio</span>
                  )}
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isChecked
                      ? 'bg-success border-success'
                      : 'border-surface-lighter'
                  }`}
                >
                  {isChecked && (
                    <CheckCircle size={14} className="text-white" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg/90 backdrop-blur-xl border-t border-surface-lighter/20 z-30">
        <button
          disabled={!canFinish}
          onClick={handleFinish}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
            canFinish
              ? 'bg-gradient-to-r from-success to-success-dark text-white active:scale-[0.98] glow-success'
              : 'bg-surface-lighter text-text-secondary cursor-not-allowed'
          }`}
        >
          Finalizar Servico
        </button>
      </div>
    </div>
  );
}
