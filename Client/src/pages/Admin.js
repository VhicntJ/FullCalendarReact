import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';
import axios from 'axios';
import ProfeCrud from './ProfeCrud';
import AlumnoCrud from './AlumnoCrud';
import filtro from './Filtros'

function Header() {
  const navigate = useNavigate();
  const [mostrarProfeCrud, setMostrarProfeCrud] = useState(false);
  const [mostrarAlumnoCrud, setMostrarAlumnoCrud] = useState(false);
  const [mostrarHorario, setMostrarHorario] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/logout');
      console.log(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const mostrarProfeCrudYVolver = () => {
    setMostrarProfeCrud(true);
  };

  const ocultarProfeCrud = () => {
    setMostrarProfeCrud(false);
  };

  const mostrarAlumnoCrudYVolver = () => {
    setMostrarAlumnoCrud(true);
  }

  const ocultarAlumnoCrud = () => {
    setMostrarAlumnoCrud(false);
  }

  const mostrarHorarioYVolver = () => {
    setMostrarHorario(true);
  }

  const ocultarHorario = () => {
    setMostrarHorario(false);
  }


  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <title>Admin</title>
      </head>
      <body>
        <header className="mb-4">
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container-fluid">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Logo_nuevo_ucen.png/1200px-Logo_nuevo_ucen.png" alt="logo" border="0" width="50" height="50"></img>
              <ul className="navbar-nav m-auto ">
                <li className="nav-item">
                  <Link class="nav-link" >Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link class="nav-link" onClick={handleLogout}>Cerrar sesion</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="container-fluid">
          <div className="row">
            {/* Notificaciones a la izquierda */}
            <div className="col-sm-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Notificaciones</h5>
                  {/* Contenido de las notificaciones */}
                </div>
              </div>
            </div>
  
            {/* Divs de los elementos existentes */}
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Mantenedor Profesores</h5>
                      <p className="card-text">Aqui podras ver los profesores que estan en la base de datos</p>
                      {!mostrarProfeCrud && (
                    <button className="btn btn-primary" onClick={mostrarProfeCrudYVolver}>Ir</button>
                    )}
                  {mostrarProfeCrud && (
                    <button className="btn btn-secondary mx-2" onClick={ocultarProfeCrud}>Volver</button>
                    )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Mantenedor Alumnos</h5>
                      <p className="card-text">Aqui podras ver los alumnos que estan en la base de datos</p>
                      {!mostrarAlumnoCrud && ( 
                    <button className="btn btn-primary" onClick={mostrarAlumnoCrudYVolver}>Ir</button>
                    )}
                  {mostrarAlumnoCrud && (
                    <button className="btn btn-secondary mx-2" onClick={ocultarAlumnoCrud}>Volver</button>
                    )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Horarios</h5>
                      <p className="card-text">Aqui podras ver los horarios de todas las carreras </p>
                      {!mostrarHorario && ( 
                        <button className="btn btn-primary" onClick={mostrarHorarioYVolver}>Ir</button>
                        )}
                      {mostrarHorario && (
                        <button className="btn btn-secondary mx-2" onClick={ocultarHorario}>Volver</button>
                        )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Solicitudes</h5>
                      <p className="card-text">Aqui podras ver las solicitudes existentes</p>
                      <Link to="/" className="btn btn-primary">Ir</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Div gigante con marco */}
              <div className="card mt-4">
                <div className="card-body">
                  {/* Renderiza el componente ProfeCrud fuera del Div Gigante pero condicionalmente */}
                  {mostrarProfeCrud && <ProfeCrud />}
                  {mostrarAlumnoCrud && <AlumnoCrud />}
                  {mostrarHorario && <filtro />}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </body>
    </html>
  );
  
}

export default Header;