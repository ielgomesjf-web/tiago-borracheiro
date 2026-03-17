import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Clock, User, LayoutGrid, Bot, Wallet, UserCircle } from 'lucide-react';

interface Tab {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const clientTabs: Tab[] = [
  { path: '/client', label: 'Home', icon: <MapPin size={22} /> },
  { path: '/client/history', label: 'Historico', icon: <Clock size={22} /> },
  { path: '/client/profile', label: 'Perfil', icon: <User size={22} /> },
];

const providerTabs: Tab[] = [
  { path: '/provider', label: 'Dashboard', icon: <LayoutGrid size={22} /> },
  { path: '/provider/ai-chat', label: 'IA', icon: <Bot size={22} /> },
  { path: '/provider/wallet', label: 'Carteira', icon: <Wallet size={22} /> },
  { path: '/provider/profile', label: 'Perfil', icon: <UserCircle size={22} /> },
];

export default function BottomNav({ variant }: { variant: 'client' | 'provider' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = variant === 'client' ? clientTabs : providerTabs;
  const accentColor = variant === 'client' ? 'text-accent' : 'text-primary';

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-bg-surface border-t border-border flex z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${isActive ? accentColor : 'text-text-muted'}`}>
            {tab.icon}
            <span className="text-[10px] font-medium">{tab.label}</span>
            {isActive && (
              <div className={`w-1 h-1 rounded-full ${variant === 'client' ? 'bg-accent' : 'bg-primary'}`} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
