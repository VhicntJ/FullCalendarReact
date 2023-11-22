import './Crud.css';
import React, { useState, useEffect } from 'react';
import  Axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

function App() {
  const [rut, setRut] = useState(''); // El primer valor es el estado, el segundo es la función que lo actualiza
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [id_alumno, setId_alumno] = useState('');
  const [password, setPassword] = useState('');

  const [editar, setEditar] = useState(false);
  const[AlumnosList, setAlumnosList] = useState([]);

  const [opcionesCarreras, setOpcionesCarreras] = useState([]);
  

  const add = () => {
    Axios.post('http://localhost:3001/createAlu', {
      rut: rut,
      nombre: nombre,
      correo: correo,
      password: password,
      carrera: carrera,

    }).then(() => {
      getAlumnos();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: "<i>El alumno <strong>"+nombre+"</strong> fue registrado con éxito.</i>",
        icon: 'success',
        timer:3000
      })
    });
  }

  const getAlumnos = () => {
    Axios.get('http://localhost:3001/alumnos').then((response) => {
      setAlumnosList(response.data);
    });
  }

  useEffect(() => {
    getAlumnos();
  });
  
  useEffect(() => {
    // Hacer una solicitud para obtener las opciones de carreras desde el servidor
    Axios.get('http://localhost:3001/obtener-carreras')
      .then(response => {
        setOpcionesCarreras(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las opciones de carreras:', error);
      });
  }, []);


  const editarAlumno = (val) => {
    setRut(val.rut);
    setNombre(val.nombre);
    setCorreo(val.correo);
    setCarrera(val.carrera);
    setId_alumno(val.id_alumno);
    setPassword(val.password);
    setEditar(true);
  }

  const updateAlumno = () => {
    Axios.put('http://localhost:3001/updateAlu', {
      id_alumno: id_alumno,
      rut: rut,
      nombre: nombre,
      correo: correo,
      carrera: carrera,
      password: password,

    }).then(() => {
      getAlumnos();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i>El alumno <strong>"+nombre+"</strong> fue actualizado con éxito.</i>",
        icon: 'success',
        timer:3000
      })
    }); 
  }

  const limpiarCampos = () => {
    setRut('');
    setNombre('');
    setCorreo('');
    setCarrera('');
    setPassword('');
    setEditar(false);
  }

  const deleteAlumno = (val)=>{
    Swal.fire({
      icon: 'warning',
      title: 'Confirmar eliminado?',
      html: "<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong>?</i>",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteAlu/${val.id_alumno}`).then((res)=>{
        getAlumnos();
        limpiarCampos();
        Swal.fire({
          icon: 'success',
          title: val.nombre+' fue eliminado.',
          showConfirmButton: false,
          timer: 2000
        });
      });
    }});
  }

  const exportarCSV = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/exportar-alumnos', {
        responseType: 'blob',
        timeout: 10000,
      });
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'text/csv' });
        saveAs(blob, 'alumnos_exportados.csv');
      } else {
        console.error('Error en la exportación CSV:', response.status);
      }
    } catch (error) {
      console.error('Error en la exportación CSV:', error);
    }
  };

        
  return (
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
      
    </head>
    <body> 
      <header>
        <h1>Gestion de Alumnos</h1>
      </header>
      <div className="formulario">
        <label>Rut<input type ='text' class='form-control' value = {rut}placeholder='Ingrese rut' onChange={(event)=> {setRut(event.target.value);}}/></label>
        <label>Nombre<input type="text" class='form-control'value = {nombre} placeholder="Ingrese nombre" onChange={(event) => {setNombre(event.target.value);}} /></label>
        <label>Correo<input type='text' class='form-control' value = {correo}placeholder= 'Ingrese correo' onChange={(event)=>{setCorreo(event.target.value);}} /></label>
        <label>Contraseña<input type='text' class='form-control' value = {password}placeholder= 'Ingrese contraseña' onChange={(event)=>{setPassword(event.target.value);}} /></label>    
        <label>Carrera <select className="form-control"  value={carrera} onChange={(event) => { setCarrera(event.target.value); }}> 
        <option>Seleccionar Carrera</option>{opcionesCarreras.map((carrera) => ( <option key={carrera.id_carrera} value={carrera.id_carrera}> {carrera.nombre}</option>))}
        
  </select>
</label>
      </div>
      <div class="botones">
        {
          editar ? 
            <div>
              <button onClick={updateAlumno}>Actualizar</button>
              <button onClick={limpiarCampos}>Cancelar</button>
            </div>
           : 
           <div>
            <button onClick={add}>Agregar</button>
            <button className='btn-exportar' onClick={exportarCSV}>Exportar CSV</button>

          </div>
        }
      
      </div>

      <table class= "table table-striped">
        <thead>
          <tr>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Carrera</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {AlumnosList.map((val, key) => {
            return (
              <tr>
                <td>{val.rut}</td>
                <td>{val.nombre}</td>
                <td>{val.correo}</td>
                <td>{val.password}</td>
                <td>{val.carrera}</td>
                
              <td>
                  <button className='btn-editar' onClick={()=>{editarAlumno(val); } }>Editar</button>
                  <button className= 'btn-eliminar' onClick={()=>{deleteAlumno(val); } }>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>    
    </body>
    </html>
  );
}

export default App;
