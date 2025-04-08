import React from 'react';
import '../../styles/comofunciona.css';
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8916688102365664"
     crossorigin="anonymous"></script>
function ComoFuncionaPage() {
  return (
    <div className="page como-funciona-page">
      <h1 className="page-title">Cómo Funciona</h1>
      <p className="page-description">
        Aprende cómo nuestra herramienta de generación de cuentos puede ayudarte a crear historias únicas y personalizadas.
      </p>

      <div className="steps">
        <div className="step">
          <h2>Paso 1: Elige un Tema</h2>
          <p>Introduce un tema o idea para tu historia. Puede ser cualquier cosa: aventuras, fantasía, ciencia ficción, ¡lo que quieras!</p>
        </div>

        <div className="step">
          <h2>Paso 2: Personaliza</h2>
          <p>Selecciona el género, la longitud y el nivel de creatividad para que la historia se adapte a tus necesidades.</p>
        </div>

        <div className="step">
          <h2>Paso 3: Genera y Disfruta</h2>
          <p>Haz clic en "Generar Historia" y deja que nuestra inteligencia artificial haga la magia. ¡Incluso puedes escucharla en audio!</p>
        </div>
      </div>
    </div>
  );
}

export default ComoFuncionaPage;