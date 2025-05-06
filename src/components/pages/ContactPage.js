import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendContactMessage } from '../../services/contactService';
import './ContactPage.css';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await sendContactMessage(formData);
      setStatus({ type: 'success', message: t('contact.form.success') });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error al enviar el formulario de contacto:', error);
      setStatus({ type: 'error', message: t('contact.form.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.description')}</p>
      </div>

      <div className="contact-container">
        <div className="contact-content">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">{t('contact.form.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.form.namePlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('contact.form.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.form.emailPlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.form.messagePlaceholder')}
                required
              />
            </div>

            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? t('contact.form.loading') : t('contact.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;