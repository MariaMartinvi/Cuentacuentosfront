import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCancelSubscription = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/subscription/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setSuccess(t('profile.subscriptionCancelled'));
        // Update user in localStorage
        const updatedUser = { ...user, subscriptionStatus: 'cancelled' };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      setError(err.response?.data?.message || t('profile.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">{t('profile.title')}</h1>
        
        <div className="profile-info">
          <div className="info-group">
            <label>{t('profile.name')}</label>
            <p>{user.name}</p>
          </div>
          
          <div className="info-group">
            <label>{t('profile.email')}</label>
            <p>{user.email}</p>
          </div>
          
          <div className="info-group">
            <label>{t('profile.subscriptionStatus')}</label>
            <p className={`status ${user.subscriptionStatus}`}>
              {t(`profile.status.${user.subscriptionStatus}`)}
            </p>
          </div>
        </div>

        {user.subscriptionStatus === 'active' && (
          <div className="subscription-actions">
            <button
              className="cancel-button"
              onClick={handleCancelSubscription}
              disabled={loading}
            >
              {loading ? t('profile.loading') : t('profile.cancelSubscription')}
            </button>
            <p className="cancel-info">{t('profile.cancelInfo')}</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 