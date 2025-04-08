// src/components/pages/AboutPage.js
import React from 'react';
import '../../styles/about.css';
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8916688102365664"
     crossorigin="anonymous"></script>
function AboutPage() {
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1>Sobre Nosotros</h1>
          <p>El sentido de esta web </p>
        </div>
      </div>
      
      <div className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZAPXyhn2F-0_r5_gYfbrOC6LGqDk7wP2qKw&s" alt="Libros y creatividad" />
            </div>
            <div className="about-text">
              <h2>Nuestra Historia</h2>
              <p>Estamos aprendiendo a generar webs y apps con diferentes editores.</p>
              <p>Arrancamos en abril de 2025 y tenemos muchas ideas en mente. Si alguien tiene una propuesta, por favor, enviar al formulario de contacto.</p>
              
              <h2>Nuestra Idea</h2>
              <p>Nuestra idea es aprender e inspirar la creatividad y fomentar el amor por  la tecnología. Queremos que nuestras herramientas ayuden a:</p>
              <ul>
          
                <li>Padres que desean historias únicas para sus hijos</li>
                <li>Niños que quieren probar nuevas herramientas</li>
                <li>Entusiastas de la tecnología interesados en el potencial de la IA</li>
              </ul>
              
              <h2>Tecnología</h2>
              <p>Utilizamos modelos avanzados de inteligencia artificial, específicamente diseñados para comprender y generar texto en español con matices culturales y lingüísticos apropiados. Nuestro sistema está en constante evolución para ofrecer historias cada vez más coherentes y personalizadas.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="team-section">
        <div className="container">
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <img src="https://www.kissfm.es/wp-content/uploads/2023/01/raw-pixel.jpg" alt="María López" />
              </div>
              <h3>Eva Martín</h3>
              <p className="member-role">Fundadora & CEO</p>
              <p>Con ganas de aprender.</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;