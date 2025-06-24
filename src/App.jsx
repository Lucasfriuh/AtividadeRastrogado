import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import AnimalListPage from '@/pages/AnimalListPage';
import AnimalDetailPage from '@/pages/AnimalDetailPage';
import MapPage from '@/pages/MapPage';
import TutorialsPage from '@/pages/TutorialsPage';
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';

const AppContent = () => {
  // Simulação de autenticação - MODIFICADO PARA SEMPRE AUTENTICAR
  const isAuthenticated = () => {
    // return localStorage.getItem('rastroGadoUserToken') !== null; // Lógica original
    return true; // Permite acesso direto para visualização
  };

  return (
    <div className="min-h-screen bg-brand-beige text-brand-green font-sans">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="animals" element={<AnimalListPage />} />
          <Route path="animals/:animalId" element={<AnimalDetailPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="tutorials" element={<TutorialsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
      <Toaster />
    </Router>
  );
}

export default App;