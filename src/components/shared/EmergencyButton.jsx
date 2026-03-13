import { AlertTriangle } from 'lucide-react';

export default function EmergencyButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-[72px] mx-4 bg-gradient-to-r from-emergency to-emergency-dark rounded-2xl flex items-center justify-center gap-3 animate-emergency-pulse active:scale-95 transition-transform duration-150 cursor-pointer border border-emergency/30"
      style={{ width: 'calc(100% - 32px)' }}
    >
      <AlertTriangle size={24} className="text-white" strokeWidth={2.5} />
      <span className="text-white text-base font-bold tracking-wide">
        SOCORRO, PNEU FUROU!
      </span>
    </button>
  );
}
