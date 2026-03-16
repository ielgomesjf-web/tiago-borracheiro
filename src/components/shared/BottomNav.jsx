import { NavLink } from 'react-router-dom';
import { MapPin, Clock, User, LayoutDashboard, Wallet, Bot } from 'lucide-react';

const clientTabs = [
  { path: '/client', icon: MapPin, label: 'Home' },
  { path: '/client/history', icon: Clock, label: 'Historico' },
  { path: '/client/profile', icon: User, label: 'Perfil' },
];

const providerTabs = [
  { path: '/provider', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/provider/ai-chat', icon: Bot, label: 'IA' },
  { path: '/provider/wallet', icon: Wallet, label: 'Carteira' },
  { path: '/provider/profile', icon: User, label: 'Perfil' },
];

export default function BottomNav({ role = 'client' }) {
  const tabs = role === 'provider' ? providerTabs : clientTabs;
  const activeColor = role === 'provider' ? 'text-provider' : 'text-primary';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl border-t border-surface-lighter/30"
      style={{ height: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div
        className="flex items-center justify-around h-16 max-w-lg mx-auto px-2"
      >
        {tabs.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/client' || path === '/provider'}
            className="flex flex-col items-center justify-center flex-1 h-full"
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-0.5">
                <Icon
                  size={22}
                  className={`transition-colors duration-200 ${
                    isActive ? activeColor : 'text-text-secondary'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? activeColor : 'text-text-secondary'
                  }`}
                >
                  {label}
                </span>
                {isActive && (
                  <div
                    className={`w-1 h-1 rounded-full mt-0.5 ${
                      role === 'provider' ? 'bg-provider' : 'bg-primary'
                    }`}
                  />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>
      {/* Safe area spacer */}
      <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
    </nav>
  );
}
