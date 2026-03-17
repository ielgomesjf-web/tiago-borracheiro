import { Routes, Route, Navigate } from 'react-router-dom';
import RoleSelectPage from './pages/RoleSelectPage';
import ClientMapPage from './pages/client/ClientMapPage';
import ServiceSelectPage from './pages/client/ServiceSelectPage';
import TrackingPage from './pages/client/TrackingPage';
import HistoryPage from './pages/client/HistoryPage';
import ClientProfilePage from './pages/client/ClientProfilePage';
import ProviderDashboardPage from './pages/provider/ProviderDashboardPage';
import AIChatPage from './pages/provider/AIChatPage';
import WalletPage from './pages/provider/WalletPage';
import ProviderProfilePage from './pages/provider/ProviderProfilePage';

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<RoleSelectPage />} />
        <Route path="/client" element={<ClientMapPage />} />
        <Route path="/client/services" element={<ServiceSelectPage />} />
        <Route path="/client/tracking" element={<TrackingPage />} />
        <Route path="/client/history" element={<HistoryPage />} />
        <Route path="/client/profile" element={<ClientProfilePage />} />
        <Route path="/provider" element={<ProviderDashboardPage />} />
        <Route path="/provider/ai-chat" element={<AIChatPage />} />
        <Route path="/provider/wallet" element={<WalletPage />} />
        <Route path="/provider/profile" element={<ProviderProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
