import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface Props {
  title: string;
  showBack?: boolean;
  backTo?: string;
  right?: React.ReactNode;
}

export default function TopBar({ title, showBack = true, backTo, right }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center px-4 py-3 bg-bg-surface/80 backdrop-blur-md border-b border-border relative z-20">
      {showBack && (
        <button onClick={() => backTo ? navigate(backTo) : navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-surface-light transition-colors">
          <ChevronLeft size={22} />
        </button>
      )}
      <h1 className="flex-1 text-center text-base font-semibold text-text-primary">{title}</h1>
      <div className="w-9">{right}</div>
    </div>
  );
}
