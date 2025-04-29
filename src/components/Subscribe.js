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
        throw new Error('User email is required');
      }

      console.log('Subscribe: Creating checkout session for user:', user.email);
      
      // Create checkout session
      const session = await createCheckoutSession(user.email);
      
      if (!session?.id) {
        console.error('Invalid session response:', session);
        throw new Error('Invalid session response from server');
      }

      console.log('Subscribe: Session created successfully with ID:', session.id);
      
      // Load Stripe
      console.log('Subscribe: Loading Stripe...');
      const stripe = await loadStripe();
      
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      
      console.log('Subscribe: Stripe loaded successfully');
      
      // Redirect to Checkout
      console.log('Subscribe: Redirecting to Stripe checkout...');
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        throw new Error(stripeError.message);
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err.message || 'An error occurred during subscription');
    } finally {
      setLoading(false);
    }
  };

  // If no user is logged in, show nothing until redirect happens
  if (!user) {
    return null;
  }

  const features = [
    t('subscription.features.0'),
    t('subscription.features.1'),
    t('subscription.features.2'),
    t('subscription.features.3'),
    t('subscription.features.4')
  ];

  return (
    <div className="subscribe-container">
      <div className="subscribe-card">
        <h1 className="subscribe-title">{t('subscription.title')}</h1>
        <p className="subscribe-subtitle">{t('subscription.subtitle')}</p>

        <div className="subscription-plan">
          <h2 className="plan-title">{t('subscription.planTitle')}</h2>
          <p className="plan-price">{t('subscription.price')}</p>
          <p className="plan-description">{t('subscription.planDescription')}</p>

          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="check-icon">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            className="subscribe-button"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? t('subscription.loading') : t('subscription.subscribeButton')}
          </button>

          <p className="cancel-info">{t('subscription.cancelInfo')}</p>
          <p className="payment-info">{t('subscription.paymentInfo')}</p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;