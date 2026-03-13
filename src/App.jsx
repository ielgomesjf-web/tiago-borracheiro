import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';

import RoleSelectPage from './pages/RoleSelectPage';
import ClientMapPage from './pages/client/ClientMapPage';
import ServiceSelectPage from './pages/client/ServiceSelectPage';
import OrderConfirmPage from './pages/client/OrderConfirmPage';
import TrackingPage from './pages/client/TrackingPage';
import RatingPage from './pages/client/RatingPage';
import HistoryPage from './pages/client/HistoryPage';
import ClientProfilePage from './pages/client/ClientProfilePage';
import ProviderDashboardPage from './pages/provider/ProviderDashboardPage';
import IncomingCallPage from './pages/provider/IncomingCallPage';
import NavigationPage from './pages/provider/NavigationPage';
import ServiceExecutionPage from './pages/provider/ServiceExecutionPage';
import WalletPage from './pages/provider/WalletPage';
import ProviderProfilePage from './pages/provider/ProviderProfilePage';

export default function App() {
  const { role } = useApp();

  return (
    <div className="max-w-lg mx-auto min-h-screen relative">
      <Routes>
        <Route path="/" element={<RoleSelectPage />} />

        {/* Client routes */}
        <Route path="/client" element={<ClientMapPage />} />
        <Route path="/client/services" element={<ServiceSelectPage />} />
        <Route path="/client/confirm" element={<OrderConfirmPage />} />
        <Route path="/client/tracking" element={<TrackingPage />} />
        <Route path="/client/rating" element={<RatingPage />} />
        <Route path="/client/history" element={<HistoryPage />} />
        <Route path="/client/profile" element={<ClientProfilePage />} />

        {/* Provider routes */}
        <Route path="/provider" element={<ProviderDashboardPage />} />
        <Route path="/provider/incoming" element={<IncomingCallPage />} />
        <Route path="/provider/navigation" element={<NavigationPage />} />
        <Route path="/provider/execution" element={<ServiceExecutionPage />} />
        <Route path="/provider/wallet" element={<WalletPage />} />
        <Route path="/provider/profile" element={<ProviderProfilePage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
