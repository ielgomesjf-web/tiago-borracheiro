import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function SOSButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/client/services')}
      className="w-full py-4 px-6 bg-danger hover:bg-danger-dark text-white font-bold text-base uppercase tracking-wide rounded-xl flex items-center justify-center gap-3 animate-emergency-pulse transition-colors">
      <AlertTriangle size={22} />
      SOCORRO, PNEU FUROU!
    </button>
  );
}
