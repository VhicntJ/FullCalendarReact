import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Filtros.css';
import logo from './Logo UCEN_.png';
import CalendarioDemo from './CalendarioDemo';
import { useParams } from 'react-router-dom';


function App() {

    const { idAlumno } = useParams();
    const { nombre } = useParams();


  return (
    
    <div className='App'>
        <div>
      <h1>Página del Alumno</h1>
      <p>ID del Alumno: {idAlumno}</p>
        <p>Nombre del Alumno: {nombre}</p>
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
      <CalendarioDemo idAlumno={idAlumno} nombreAlumno={nombre}/>
    </div>
  );
}

export default App;
