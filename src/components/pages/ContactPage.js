import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import './ContactPage.css';

function ContactPage() {
  const form = useRef();
  const { t } = useTranslation();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_xcq64id',
        'template_9ib4dun',
        form.current,
        'PmEP-vrauOJhVTHt0'
      )
      .then(
        (result) => {
          console.log(result.text);
          alert(t('contact.form.success'));
        },
        (error) => {
          console.log(error.text);
          alert(t('contact.form.error'));
        }
      );

    e.target.reset();
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.description')}</p>
        </div>
      </div>
      
      <div className="contact-container">
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">{t('contact.form.name')}</label>
            <input 
              type="text" 
              id="name" 
              name="user_name" 
              placeholder={t('contact.form.namePlaceholder')} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('contact.form.email')}</label>
            <input 
              type="email" 
              id="email" 
              name="user_email" 
              placeholder={t('contact.form.emailPlaceholder')} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">{t('contact.form.subject')}</label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              placeholder={t('contact.form.subjectPlaceholder')} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">{t('contact.form.message')}</label>
            <textarea 
              id="message" 
              name="message" 
              placeholder={t('contact.form.messagePlaceholder')} 
              rows="5" 
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            {t('contact.form.submit')}
          </button>
        </form>

        <div className="contact-info">
          <h2>{t('contact.info.title')}</h2>
          <div className="info-item">
            <h3>{t('contact.info.email')}</h3>
            <p>{t('contact.info.emailText')}</p>
          </div>
          <div className="info-item">
            <h3>{t('contact.info.location')}</h3>
            <p>{t('contact.info.locationText')}</p>
          </div>
          <div className="info-item">
            <h3>{t('contact.info.hours')}</h3>
            <p>{t('contact.info.hoursText')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;