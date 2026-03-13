import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Car, DollarSign, Navigation } from 'lucide-react';
import { incomingCall } from '../../data/mockData';
import CountdownTimer from '../../components/shared/CountdownTimer';

export default function IncomingCallPage() {
  const navigate = useNavigate();

  const handleExpire = () => {
    navigate('/provider');
  };

  const handleAccept = () => {
    navigate('/provider/navigation');
  };

  const handleReject = () => {
    navigate('/provider');
  };

  return (
    <div className="min-h-screen bg-bg/95 backdrop-blur-sm flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Background pulse effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-success/5 via-transparent to-emergency/5" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-success/5 rounded-full blur-3xl animate-pulse" />

      {/* Heading */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center animate-emergency-pulse">
            <Navigation size={32} className="text-success" />
          </div>
        </div>

        <h1
          className="text-2xl font-bold text-text-primary mb-1 animate-fade-in"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          Novo Chamado!
        </h1>
        <p
          className="text-text-secondary text-sm mb-8 animate-fade-in"
          style={{ animationDelay: '0.15s', opacity: 0 }}
        >
          Um cliente precisa de ajuda
        </p>

        {/* Call info card */}
        <div
          className="w-full max-w-sm bg-surface rounded-2xl p-5 border border-surface-lighter/20 mb-6 animate-fade-in"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <div className="space-y-4">
            {/* Service */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Car size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-text-primary font-semibold text-sm">
                  {incomingCall.service}
                </p>
                <p className="text-text-secondary text-xs">
                  {incomingCall.vehicleType === 'carro' ? 'Carro' : incomingCall.vehicleType}
                </p>
              </div>
            </div>

            {/* Distance + address */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <MapPin size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-text-primary text-sm font-medium">
                  {incomingCall.distance}
                </p>
                <p className="text-text-secondary text-xs">{incomingCall.address}</p>
              </div>
            </div>

            {/* Estimated earnings */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <DollarSign size={20} className="text-success" />
              </div>
              <div>
                <p className="text-success font-bold text-xl">
                  R$ {incomingCall.estimatedEarnings.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-text-secondary text-xs">Ganho estimado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown timer */}
        <div
          className="mb-8 animate-fade-in"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <CountdownTimer
            seconds={incomingCall.timeLimit || 30}
            onExpire={handleExpire}
            autoStart
          />
        </div>

        {/* Action buttons */}
        <div
          className="flex gap-3 w-full max-w-sm animate-fade-in"
          style={{ animationDelay: '0.35s', opacity: 0 }}
        >
          <button
            onClick={handleReject}
            className="flex-1 py-4 rounded-2xl font-bold text-base border-2 border-emergency text-emergency hover:bg-emergency/5 active:scale-[0.98] transition-all"
          >
            Recusar
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-success to-success-dark text-white active:scale-[0.98] transition-transform glow-success"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
