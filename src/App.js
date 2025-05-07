import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import i18n from './i18n';
import { AuthProvider } from './contexts/AuthContext';
import { CookieConsentProvider } from './contexts/CookieConsentContext';
import AppRoutes from './routes';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <CookieConsentProvider>
            <Router>
              <AppRoutes />
              <CookieConsent />
            </Router>
          </CookieConsentProvider>
        </AuthProvider>
      </I18nextProvider>
    </HelmetProvider>
  );
}

export default App;