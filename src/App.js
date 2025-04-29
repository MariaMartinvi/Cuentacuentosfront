import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Subscribe from './components/Subscribe';
import Profile from './components/Profile';
import Footer from './components/Footer';
import AboutPage from './components/pages/AboutPage';
import ServicesPage from './components/pages/ServicesPage';
import ContactPage from './components/pages/ContactPage';
import TerminosPage from './components/pages/TerminosPage';
import PoliticaPage from './components/pages/PoliticaPage';
import ComoFuncionaPage from './components/pages/ComoFuncionaPage';
import { AuthProvider } from './contexts/AuthContext';
import { getCurrentUser } from './services/authService';

const PrivateRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const user = getCurrentUser();
  return !user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terminos" element={<TerminosPage />} />
                <Route path="/politica" element={<PoliticaPage />} />
                <Route path="/como-funciona" element={<ComoFuncionaPage />} />
                <Route path="/login" element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } />
                <Route path="/register" element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } />
                <Route path="/subscribe" element={
                  <PrivateRoute>
                    <Subscribe />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;