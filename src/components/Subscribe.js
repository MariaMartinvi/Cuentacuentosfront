import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { createCheckoutSession, loadStripe } from '../services/subscriptionService';
import './Subscribe.css';

const Subscribe = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.email) {
        throw new Error(t('subscribe.error.noEmail'));
      }

      console.log('Creating checkout session for user:', user.email);
      const session = await createCheckoutSession(user.email);
      
      if (!session?.id) {
        console.error('Invalid session response:', session);
        throw new Error(t('subscribe.error.noSession'));
      }

      console.log('Loading Stripe with session:', session.id);
      const stripe = await loadStripe();
      
      if (!stripe) {
        throw new Error(t('subscribe.error.stripeLoad'));
      }

      console.log('Redirecting to Stripe checkout with session ID:', session.id);
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        throw new Error(stripeError.message);
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err.message || t('subscribe.error.general'));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="subscribe-container">
      <h1>{t('subscribe.title')}</h1>
      
      <div className="subscription-features">
        <h2>{t('subscribe.features.title')}</h2>
        <ul>
          <li>{t('subscribe.features.unlimited')}</li>
          <li>{t('subscribe.features.priority')}</li>
          <li>{t('subscribe.features.support')}</li>
        </ul>
      </div>

      <div className="subscription-price">
        <h2>{t('subscribe.price.title')}</h2>
        <p>{t('subscribe.price.amount')}</p>
      </div>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button 
            className="close-error" 
            onClick={() => setError(null)}
            aria-label={t('subscribe.closeError')}
          >
            ×
          </button>
        </div>
      )}

      <button
        className={`subscribe-button ${loading ? 'loading' : ''}`}
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? '' : t('subscribe.button')}
      </button>
    </div>
  );
};

export default Subscribe; 