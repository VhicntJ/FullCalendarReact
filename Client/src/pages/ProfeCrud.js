import './Crud.css';
import React, { useState, useEffect } from 'react';
import  Axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

function App() {
  const [id_profesor, setId_profesor] = useState(''); // El primer valor es el estado, el segundo es la función que lo actualiza
  const [rut_profesor, setRut_profesor] = useState(); 
  const [nombre, setNombre] = useState('');
  const [contrato, setContrato] = useState('');
  const [password, setPassword] = useState('');
  const[editar, setEditar] = useState(false);
  const [profesoresList, setProfesoresList] = useState([]);

  const add = () => {
  Axios.post('http://localhost:3001/createProfe', {
    rut_profesor: rut_profesor,
    nombre: nombre,
    contrato: contrato,
    password: password,
  }).then(() => {
    getProfesores();
    limpiarCampos();
    Swal.fire({
      title: "<strong>Registro exitoso</strong>",
      html: "<i>El profesor <strong>"+nombre+"</strong> fue registrado con éxito.</i>",
      icon: 'success',
      timer:3000
    })
  });
  }
  
  const getProfesores = () => {
    Axios.get("http://localhost:3001/profesores2").then ((response) => {
      setProfesoresList(response.data);
    });
  }

  useEffect(() => {
    // Llamar a getProfesores cuando el componente se monta
    getProfesores();
  }, []); // El segundo argumento (un array vacío) significa que useEffect se ejecuta solo una vez al montar el componente.

  const editarProfesores = (val) => {
    setRut_profesor(val.rut_profesor);
    setNombre(val.nombre);
    setContrato(val.contrato);
    setId_profesor(val.id_profesor);
    setPassword(val.password);
    setEditar(true);
    
  }


  const update = () => {
    Axios.put('http://localhost:3001/updateProfe', {
      id_profesor: id_profesor,
      rut_profesor: rut_profesor,
      nombre: nombre,
      contrato: contrato,
      password: password,
    }).then(() => {
      getProfesores();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i>El profesor <strong>"+nombre+"</strong> fue actualizado con éxito.</i>",
        icon: 'success',
        timer:3000
      })
    });
  }

  const hideProfesor = (val)=> {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmar ocultar?',
      html: "<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong>?</i>",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then ((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:3001/hideProfe/${val.id_profesor}`).then((res) => {
          getProfesores();
          limpiarCampos();
          Swal.fire({
            title: "<strong>Eliminación exitosa!!!</strong>",
            html: "<i>El profesor <strong>"+val.nombre+"</strong> fue eliminado con éxito.</i>",
            icon: 'success',
            timer:2000
          });
        });
      }});
}
  const limpiarCampos = () => {
    setNombre('');
    setContrato('');
    setRut_profesor('');
    setPassword('');
    setId_profesor('');
    setEditar(false);
  }


  const exportarCSV = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/exportar-profesores', {
        responseType: 'blob',
        timeout: 10000,
      });
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'text/csv' });
        saveAs(blob, 'profesores_exportados.csv');
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
        <h1>Gestion de Profesores</h1>
      </header>
      <div className="formulario">
        <label>Rut <input type="text" name="rut" value={rut_profesor} onChange={(event) => {setRut_profesor(event.target.value)}}/> </label>
        <label>Nombre <input type="text" name="nombre" value={nombre} onChange={(event) => {setNombre(event.target.value)}}/> </label>
        <label>Contrato <input type="text" name="contrato" value={contrato} onChange={(event) => {setContrato(event.target.value)}}/> </label>
        <label>Contraseña <input type="text" name="password" value={password} onChange={(event) => {setPassword(event.target.value)}}/> </label>
      </div>
      <div className="botones">
        {
        editar ? 
          <div>
          <button onClick={update}>Actualizar</button>
          <button onClick={limpiarCampos}>Cancelar</button>
          </div>
         : 
         <div>
          <button className='btn-exportar' onClick={exportarCSV}>Exportar CSV</button>
          <button onClick={add}>Registrar</button>
         </div>
        }
      </div>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Contrato</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {profesoresList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.rut_profesor}</td>
                  <td>{val.nombre}</td>
                  <td>{val.contrato}</td>
                  <td>{val.password}</td>
                  <td>
                    {val.estado ? (
                      <div>
                        <button className='btn-editar' onClick={() => {editarProfesores(val)}}>Editar</button>
                        <button className='btn-eliminar' onClick={() => {hideProfesor(val)}}>Ocultar</button>
                      </div>
                    ) : (
                      <span>Inactivo</span>
                    )}
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
