import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Subscribe.css';

const Subscribe = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/subscription/create-checkout-session`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        setError(t('subscription.error'));
      }
    } catch (err) {
      setError(err.response?.data?.message || t('subscription.error'));
    } finally {
      setLoading(false);
    }
  };

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

          {success && (
            <div className="success-message">
              {t('subscription.success')}
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