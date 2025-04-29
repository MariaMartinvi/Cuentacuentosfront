import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './Success.css';

const Success = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine API URL the same way as in your other services
  const isProduction = window.location.hostname !== 'localhost';
  const API_URL = isProduction 
    ? 'https://backmielda.onrender.com'
    : 'http://localhost:5001';

  useEffect(() => {
    const verifySubscription = async () => {
      const sessionId = new URLSearchParams(location.search).get('session_id');
      
      if (!sessionId) {
        console.error("No session ID found in URL params");
        setError(t('subscription.noSessionId') || "Missing session ID");
        setLoading(false);
        return;
      }

      try {
        console.log('Verifying subscription with session ID:', sessionId);
        console.log('Using API URL:', API_URL);
        
        const response = await axios.get(`${API_URL}/api/stripe/success`, {
          params: { session_id: sessionId },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log('Subscription verification response:', response.data);
        
        if (response.data.success) {
          // Update local storage with new user data
          const currentUser = JSON.parse(localStorage.getItem('user'));
          if (currentUser) {
            currentUser.subscriptionStatus = 'active';
            currentUser.storiesRemaining = 30; // 30 stories for subscribers
            currentUser.subscriptionType = 'premium';
            localStorage.setItem('user', JSON.stringify(currentUser));
          }

          // Refresh user data to get updated subscription status
          await refreshUser();
          setLoading(false);
          
          // Redirect after 3 seconds
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          throw new Error('Subscription verification failed');
        }
      } catch (err) {
        console.error('Error verifying subscription:', err);
        console.error('Error details:', err.response?.data || err.message);
        setError(t('subscription.verificationError') || 'Error verifying subscription');
        setLoading(false);
      }
    };

    verifySubscription();
  }, [location, navigate, t, refreshUser, API_URL]);

  // If user data is still loading, show a loading indicator
  if (!user) {
    return (
      <div className="success-container">
        <h1>{t('subscription.paymentSuccess')}</h1>
        <p>{t('subscription.loading')}</p>
      </div>
    );
  }

  return (
    <div className="success-container">
      <h1>{t('subscription.paymentSuccess')}</h1>
      <p>{t('subscription.thankYou')}</p>
      {loading && <p>{t('subscription.processing')}</p>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && (
        <p>{t('subscription.redirecting')}</p>
      )}
    </div>
  );
};

export default Success;