import { createContext, useContext, useState, useEffect } from 'react';
import { clientProfile, providerProfile, activeOrder as defaultActiveOrder } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('tb-role') || null;
  });

  const [currentOrder, setCurrentOrder] = useState(null);
  const [providerOnline, setProviderOnline] = useState(false);

  const user = role === 'client' ? clientProfile : role === 'provider' ? providerProfile : null;

  useEffect(() => {
    if (role) {
      localStorage.setItem('tb-role', role);
    } else {
      localStorage.removeItem('tb-role');
    }
  }, [role]);

  const switchRole = (newRole) => {
    setRole(newRole);
    setCurrentOrder(null);
    setProviderOnline(false);
  };

  const logout = () => {
    setRole(null);
    setCurrentOrder(null);
    setProviderOnline(false);
    localStorage.removeItem('tb-role');
  };

  const startOrder = (orderData) => {
    setCurrentOrder({
      ...orderData,
      id: 'ord-' + Date.now(),
      status: 'requested',
      createdAt: new Date().toISOString(),
    });
  };

  const updateOrderStatus = (status) => {
    setCurrentOrder(prev => prev ? { ...prev, status } : null);
  };

  const clearOrder = () => setCurrentOrder(null);

  return (
    <AppContext.Provider value={{
      role, switchRole, logout,
      user,
      currentOrder, startOrder, updateOrderStatus, clearOrder,
      providerOnline, setProviderOnline,
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
