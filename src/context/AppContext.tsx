import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { clientProfile, providerProfile } from '../data/mockData';

type Role = 'client' | 'provider' | null;

interface OrderData {
  serviceId: number;
  serviceName: string;
  price: number;
  duration: number;
}

interface AppContextType {
  role: Role;
  switchRole: (r: Role) => void;
  logout: () => void;
  client: typeof clientProfile;
  provider: typeof providerProfile;
  providerOnline: boolean;
  setProviderOnline: (v: boolean) => void;
  currentOrder: OrderData | null;
  startOrder: (o: OrderData) => void;
  clearOrder: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('seq-role');
    return (saved as Role) || null;
  });
  const [providerOnline, setProviderOnlineState] = useState(() => {
    return localStorage.getItem('seq-online') === 'true';
  });
  const [currentOrder, setCurrentOrder] = useState<OrderData | null>(null);

  const switchRole = useCallback((r: Role) => {
    setRole(r);
    if (r) localStorage.setItem('seq-role', r);
    else localStorage.removeItem('seq-role');
  }, []);

  const logout = useCallback(() => {
    setRole(null);
    setCurrentOrder(null);
    localStorage.removeItem('seq-role');
  }, []);

  const setProviderOnline = useCallback((v: boolean) => {
    setProviderOnlineState(v);
    localStorage.setItem('seq-online', String(v));
  }, []);

  const startOrder = useCallback((o: OrderData) => setCurrentOrder(o), []);
  const clearOrder = useCallback(() => setCurrentOrder(null), []);

  return (
    <AppContext.Provider value={{
      role, switchRole, logout,
      client: clientProfile,
      provider: providerProfile,
      providerOnline, setProviderOnline,
      currentOrder, startOrder, clearOrder,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
