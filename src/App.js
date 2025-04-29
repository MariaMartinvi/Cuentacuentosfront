import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/authService';
import Login from './components/Login';
import Register from './components/Register';
import StoryForm from './components/StoryForm';
import StoryDisplay from './components/StoryDisplay';
import SubscriptionStatus from './components/SubscriptionStatus';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import HomePage from './components/pages/HomePage.js';
import AboutPage from './components/pages/AboutPage.js';
import ServicesPage from './components/pages/ServicesPage.js';
import ContactPage from './components/pages/ContactPage.js';
import TerminosPage from './components/pages/TerminosPage.js';
import PoliticaPage from './components/pages/PoliticaPage.js';
import ComoFuncionaPage from './components/pages/ComoFuncionaPage.js';
import Subscribe from './components/Subscribe';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Success from './components/Success';
import { useTranslation } from 'react-i18next';

const PrivateRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const user = getCurrentUser();
  return !user ? children : <Navigate to="/" />;
};

function App() {
  const [generatedStory, setGeneratedStory] = useState(null);
  const { t } = useTranslation();

  const handleStoryGenerated = (story) => {
    setGeneratedStory(story);
    console.log('Historia generada:', story);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage onStoryGenerated={handleStoryGenerated} />} />
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
              
              {/* Important: Success route that handles query parameters */}
              <Route path="/success" element={<Success />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;