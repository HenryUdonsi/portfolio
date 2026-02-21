import { Routes, Route, Navigate } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import HomeScreen from './screens/HomeScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import VerifyScreen from './screens/VerifyScreen';
import SuccessScreen from './screens/SuccessScreen';
import TrackingScreen from './screens/TrackingScreen';
import HistoryScreen from './screens/HistoryScreen';

export default function ListamApp() {
  return (
    <OrderProvider>
      <Routes>
        <Route path="/listam" element={<HomeScreen />} />
        <Route path="/listam/confirm" element={<ConfirmScreen />} />
        <Route path="/listam/checkout" element={<CheckoutScreen />} />
        <Route path="/listam/verify" element={<VerifyScreen />} />
        <Route path="/listam/success" element={<SuccessScreen />} />
        <Route path="/listam/tracking" element={<TrackingScreen />} />
        <Route path="/listam/history" element={<HistoryScreen />} />
        <Route path="/listam/*" element={<Navigate to="/listam" replace />} />
      </Routes>
    </OrderProvider>
  );
}
