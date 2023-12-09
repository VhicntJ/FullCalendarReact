import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Filtros.css';
import logo from './Logo UCEN_.png';
import CalendarioDemo from './CalendarioDemo';
import CalendarioDemo_copy from './CalendarioDemo_copy';
import { useParams } from 'react-router-dom';

function App() { 

    const { idProfesor } = useParams();
    const { nombreProfesor } = useParams();	



  return (
    <div className='App'>
                <div>
    <h1>Página del Profesor</h1>
    <p>ID del Profesor: {idProfesor}</p>
    <p>Nombre del Profesor: {nombreProfesor}</p>

      {/* Otro contenido de la página del Alumno */}
    </div>
<header className='p-1' style={{ backgroundColor: '#FF5200' }}>
  <div className='container'>
    <div className='row align-items-center'>
      <div className='col'>
      <img className='img-fluid' src={logo} alt='logo' style={{ maxWidth: '100%', maxHeight: '130px', height: 'auto' }} />
      </div>
      <div className='col'>
        <h1 className='text-white fw-bold'>Horario</h1>
      </div>
    </div>
  </div>
</header>
<CalendarioDemo idProfesor={idProfesor} nombreProfesor={nombreProfesor}/>
</div>
  );
}
export default App;