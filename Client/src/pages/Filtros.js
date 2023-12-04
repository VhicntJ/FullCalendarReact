import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Filtros.css';
import logo from './Logo UCEN_.png';
import CalendarioDemo from './CalendarioDemo';
import CalendarioDemo_copy from './CalendarioDemo_copy';

function App() {
  const [salasList, setSalasList] = useState([]);
  const [selectedSala, setSelectedSala] = useState('');

  const [carrerasList, setCarrerasList] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');

  const [nivelesList, setNivelesList] = useState([]);
  const [selectedNivel, setSelectedNivel] = useState('');

  const [profesoresList, setProfesoresList] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState('');

  const [asignaturasList, setAsignaturasList] = useState([]);
  const [selectedAsignatura, setSelectedAsignatura] = useState('');

  const [facultadesList, setFacultadesList] = useState([]);
  const [selectedFacultad, setSelectedFacultad] = useState('');

  useEffect(() => {
    getSalas();
    getCarreras();
    getNiveles();
    getProfesores();
    getAsignaturas();
    getFacultades();
  }, []);

  const getSalas = () => {
    axios.get('http://localhost:3001/salas')
      .then((response) => {
        setSalasList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de salas:', error);
      });
  };

  const getCarreras = () => {
    axios.get('http://localhost:3001/carreras')
      .then((response) => {
        setCarrerasList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de carreras:', error);
      });
  };

  const getNiveles = () => {
    axios.get('http://localhost:3001/niveles')
      .then((response) => {
        setNivelesList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de niveles:', error);
      });
  };

  const getProfesores = () => {
    axios.get('http://localhost:3001/profesores')
      .then((response) => {
        setProfesoresList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de profesores:', error);
      });
  };

  const getAsignaturas = () => {
    axios.get('http://localhost:3001/asignaturas')
      .then((response) => {
        setAsignaturasList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de asignaturas:', error);
      });
  };

  const getFacultades = () => {
    axios.get('http://localhost:3001/facultades')
      .then((response) => {
        setFacultadesList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de facultades:', error);
      });
  };

  return (
    <div className='App'>
      <header>
        <div className='arriba'>
          <img className='imagen' src={logo} alt='logo' width={500} />
          <h1>Horario</h1>
        </div>
      </header>
      <main>
        <div className='filtros'>
          {/* Dropdown de salas */}
          <label htmlFor='salaDropdown'>Seleccionar Sala:</label>
          <select
            id='salaDropdown'
            onChange={(event) => setSelectedSala(event.target.value)}
            value={selectedSala}
          >
            <option value=''>Seleccione una sala</option>
            {salasList.map((sala) => (
              <option key={sala.id_sala} value={sala.id_sala}>
                {sala.id_sala}
              </option>
            ))}
          </select>

          {/* Dropdown de carreras */}
          <label htmlFor='carreraDropdown'>Seleccionar Carrera:</label>
          <select
            id='carreraDropdown'
            onChange={(event) => setSelectedCarrera(event.target.value)}
            value={selectedCarrera}
          >
            <option value=''>Seleccione una carrera</option>
            {carrerasList.map((carrera) => (
              <option key={carrera.id_carrera} value={carrera.id_carrera}>
                {carrera.nombre}
              </option>
            ))}
          </select>

          {/* Dropdown de niveles */}
          <label htmlFor='nivelDropdown'>Seleccionar Nivel:</label>
          <select
            id='nivelDropdown'
            onChange={(event) => setSelectedNivel(event.target.value)}
            value={selectedNivel}
          >
            <option value=''>Seleccione un nivel</option>
            {nivelesList.map((nivel) => (
              <option key={nivel.id_nivel} value={nivel.id_nivel}>
                {nivel.id_nivel}
              </option>
            ))}
          </select>

          {/* Dropdown de profesores */}
          <label htmlFor='profesorDropdown'>Seleccionar Profesor:</label>
          <select
            id='profesorDropdown'
            onChange={(event) => setSelectedProfesor(event.target.value)}
            value={selectedProfesor}
          >
            <option value=''>Seleccione un profesor</option>
            {profesoresList.map((profesor) => (
              <option key={profesor.id_profesor} value={profesor.id_profesor}>
                {profesor.nombre}
              </option>
            ))}
          </select>

          {/* Dropdown de asignaturas */}
          <label htmlFor='asignaturaDropdown'>Seleccionar Asignatura:</label>
          <select
            id='asignaturaDropdown'
            onChange={(event) => setSelectedAsignatura(event.target.value)}
            value={selectedAsignatura}
          >
            <option value=''>Seleccione una asignatura</option>
            {asignaturasList.map((asignatura) => (
              <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                {asignatura.nombre}
              </option>
            ))}
          </select>

          {/* Dropdown de facultades */}
          <label htmlFor='facultadDropdown'>Seleccionar Facultad:</label>
          <select
            id='facultadDropdown'
            onChange={(event) => setSelectedFacultad(event.target.value)}
            value={selectedFacultad}
          >
            <option value=''>Seleccione una facultad</option>
            {facultadesList.map((facultad) => (
              <option key={facultad.id_facultad} value={facultad.id_facultad}>
                {facultad.nombre_facultad}
              </option>
            ))}
          </select>
        </div>
        <CalendarioDemo_copy
          selectedSala={selectedSala}
          selectedCarrera={selectedCarrera}
          selectedNivel={selectedNivel}
          selectedProfesor={selectedProfesor}
          selectedAsignatura={selectedAsignatura}
          selectedFacultad={selectedFacultad}/>
      </main>
    </div>
  );
}

export default App;
