import React from 'react';
import '../../styles/services.css';

function ServicesPage() {
  return (
    <div className="page services-page">
      <div className="page-header">
        <div className="container">
          <h1>Nuestros Servicios</h1>
          <p>Descubre nuestras soluciones creativas impulsadas por inteligencia artificial. Personaliza, genera y disfruta de contenido único.</p>
        </div>
      </div>
  
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">📚</div>
          <h3>Generador de Cuentos</h3>
          <p>Crea historias personalizadas en español con diferentes géneros, longitudes y estilos.</p>
          <ul className="service-features">
            <li>Múltiples géneros literarios</li>
            <li>Personalización por edad</li>
            <li>Diferentes niveles de creatividad</li>
            <li>Conversión a audio</li>
          </ul>
          <button
            className="btn-service"
            onClick={() => (window.location.href = '/')}
        >
             Probar Ahora
           </button>
        </div>

        <div className="service-card">
          <div className="service-icon">🎓</div>
          <h3>Contenido Educativo</h3>
          <p>Generación de material didáctico personalizado para educadores y estudiantes.</p>
          <ul className="service-features">
            <li>Adaptado a diferentes niveles educativos</li>
            <li>Enfoque en temas específicos</li>
            <li>Ejercicios y actividades</li>
            <li>Material complementario</li>
          </ul>
          <span className="coming-soon">Próximamente</span>
        </div>

        <div className="service-card">
          <div className="service-icon">✍️</div>
          <h3>Asistente de Escritura</h3>
          <p>Herramientas para ayudar a escritores a superar el bloqueo creativo y desarrollar ideas.</p>
          <ul className="service-features">
            <li>Generación de ideas</li>
            <li>Desarrollo de personajes</li>
            <li>Construcción de escenarios</li>
            <li>Sugerencias de diálogo</li>
          </ul>
          <span className="coming-soon">Próximamente</span>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;