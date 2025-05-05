import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Obtener el token de la URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
          // Guardar el token en localStorage
          localStorage.setItem('token', token);
          
          // Actualizar el estado de autenticación
          await login(token);
          
          // Redirigir al usuario a la página principal
          navigate('/');
        } else {
          console.error('No token received from Google');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error handling Google callback:', error);
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [location, navigate, login]);

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Iniciando sesión...</p>
    </div>
  );
};

export default GoogleCallback; 