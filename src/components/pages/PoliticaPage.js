import React from 'react';
import '../../styles/politica.css';

function PoliticaPage() {
  return (
    <div className="page politica-page">
      <h1 className="page-title">Política de Privacidad</h1>

      <section className="section">
        <h2 className="section-title">1. Compromiso con la Privacidad del Usuario</h2>
        <p>
          Este sitio web se compromete a proteger la privacidad de sus usuarios. Nuestra política se basa en el principio de no recopilación de datos personales.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">2. No Recopilación de Datos Personales</h2>
        <p>
          <span className="highlight">Ausencia de Recopilación:</span> No recopilamos, almacenamos ni procesamos ningún dato personal de los usuarios.
        </p>
        <ul className="list">
          <li>No se requiere registro ni creación de cuentas de usuario.</li>
          <li>No se almacenan las historias generadas por los usuarios.</li>
          <li>El uso de este sitio web es completamente anónimo.</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">3. Información no personal</h2>
        <p>
          Debido al uso de herramientas y servicios de terceros, como librerías de código, es posible que se recabe información no personal, como:
        </p>
        <ul className="list">
          <li>La IP desde la que se accede a la web.</li>
          <li>Logs de errores.</li>
          <li>Información referente al dispositivo y navegador usado para acceder a la web.</li>
        </ul>
        <p>
          Esta información es de índole técnica y en ningún momento sirve para la identificación directa de los usuarios.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">4. Uso de Cookies</h2>
        <p>
          Es posible que el sitio web use cookies, pero en ningún caso estas cookies recabarán información personal ni serán utilizadas para identificar a los usuarios.
        </p>
      </section>
    </div>
  );
}

export default PoliticaPage;