const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const crypto = require('crypto');
const path = require('path');
const os = require('os');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'planeacion'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

app.get('/salas', (req, res) => {
  const query = 'SELECT * FROM sala';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/carreras', (req, res) => {
  const query = 'SELECT * FROM carrera';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

// En tu archivo de servidor
app.get('/niveles', (req, res) => {
  const query = 'SELECT * FROM nivel';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/profesores', (req, res) => {
  const query = 'SELECT * FROM profesores';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/asignaturas', (req, res) => {
  const query = 'SELECT * FROM asignatura';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/facultades', (req, res) => {
  const query = 'SELECT * FROM facultad';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

// Agrega una nueva ruta para obtener eventos
app.get('/eventos', (req, res) => {
  const query = `
  SELECT eventos.id_evento, eventos.id_asignatura, horarios.start, horarios.end, eventos.id_sala, eventos.cupos, eventos.seccion, eventos.fecha
  FROM eventos
  JOIN horarios ON eventos.id_horario = horarios.id_horario;
`; // Ajusta según tu esquema de base de datos

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});


//TUFLA


//PROFESOR
app.post('/createProfe', (req, res) => {
  const rut_profesor = req.body.rut_profesor;
  const nombre = req.body.nombre;
  const contrato = req.body.contrato;
  const password = req.body.password;

  // Encripta el contrato usando SHA256
  const passwordProfe = crypto.createHash('sha256').update(password).digest('hex');
  console.log("Valor encriptado: ", passwordProfe); // Agrega esta línea para verificar el valor encriptado en la consola

  db.query('INSERT INTO profesor (rut_profesor,nombre, contrato, password) VALUES (?,?,?,?)', [rut_profesor ,nombre, contrato, passwordProfe], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send("profesor registrado correctamente");
      }
  });
});

app.get('/profesores2', (req, res) => {
  db.query('SELECT * FROM profesor' , 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.put('/updateProfe', (req, res) => {
  const id_profesor = req.body.id_profesor;
  const rut_profesor = req.body.rut_profesor;
  const nombre = req.body.nombre;
  const contrato = req.body.contrato;
  const password = req.body.password;

  // Encripta el contrato usando SHA256
  const passwordProfe = crypto.createHash('sha256').update(password).digest('hex');
  console.log("Valor encriptado: ", passwordProfe); // Agrega esta línea para verificar el valor encriptado en la consola
  db.query('UPDATE profesor SET rut_profesor=?, nombre = ?, contrato = ?, password = ? WHERE id_profesor = ?', [rut_profesor,nombre, contrato, passwordProfe, id_profesor],
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.put('/hideProfe/:id_profesor', (req, res) => {
  const id_profesor = req.params.id_profesor;
  const nuevoEstado = 0;  // Establece el nuevo estado (inactivo)

  db.query('UPDATE profesor SET estado = ? WHERE id_profesor = ?', [nuevoEstado, id_profesor], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error al ocultar al profesor' });
    } else {
      res.status(200).json({ success: true, message: 'Profesor ocultado exitosamente' });
    }
  });
});

app.get('/exportar-profesores', (req, res) => {
    
  const downloadsFolder = path.join(os.homedir(), 'Downloads');
  const outputPath = path.join(downloadsFolder, 'profesores_exportados.csv');

  db.query('SELECT * FROM profesor', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error en la exportación' });
    } else {
      if (result.length > 0) {
        const csvWriter = createCsvWriter({
          path: outputPath,
          header: Object.keys(result[0]).map((columnName) => ({ id: columnName, title: columnName })),
        });

        csvWriter.writeRecords(result)
          .then(() => {
            res.status(200).json({ success: true, message: 'Exportación exitosa' });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error en la exportación' });
          });
      } else {
        res.status(500).json({ success: false, message: 'No hay datos para exportar' });
      }
    }
  });
});


//ALUMNO

app.post('/createAlu', (req, res) => {
  const rut = req.body.rut;
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  const password = req.body.password;
  const id_carrera = req.body.id_carrera;

  // Encripta el contrato usando SHA256
  const passwordEncriptado = crypto.createHash('sha256').update(password).digest('hex');
  console.log("Valor encriptado: ", passwordEncriptado); // Agrega esta línea para verificar el valor encriptado en la consola
  
  db.query('INSERT INTO alumno (rut, nombre, correo, password, id_carrera) VALUES (?,?,?,?,?)', [rut, nombre, correo, passwordEncriptado, id_carrera], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send("Alumno registrado correctamente");
      }
  });
});

app.get('/alumnos', (req, res) => {
  db.query('SELECT * FROM alumno', (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.put('/updateAlu', (req, res) => {
  const id_alumno = req.body.id_alumno;
  const rut = req.body.rut;
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  const password = req.body.password;
  const id_carrera = req.body.id_carrera;

  // Encripta el contrato usando SHA256
  const passwordEncriptado = crypto.createHash('sha256').update(password).digest('hex');
  console.log("Valor encriptado: ", passwordEncriptado); // Agrega esta línea para verificar el valor encriptado en la consola
  
  db.query('UPDATE alumno SET rut = ?, nombre = ?, correo = ?, password = ? , id_carrera = ? WHERE id_alumno = ?', [rut, nombre, correo, passwordEncriptado, id_carrera, id_alumno], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.delete('/deleteAlu/:id_alumno', (req, res) => {
  const id_alumno = req.params.id_alumno;
  db.query('DELETE FROM alumno WHERE id_alumno = ?', id_alumno, (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  })
})

app.get('/obtener-carreras', (req, res) => {
  db.query('SELECT * FROM carrera', (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  })
});

app.get('/exportar-alumnos', (req, res) => {
  const downloadsFolder = path.join(os.homedir(), 'Downloads');
  const outputPath = path.join(downloadsFolder, 'alumnos_exportados.csv');

  db.query('SELECT * FROM alumno', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error en la exportación' });
    } else {
      if (result.length > 0) {
        const csvWriter = createCsvWriter({
          path: outputPath,
          header: Object.keys(result[0]).map((columnName) => ({ id: columnName, title: columnName })),
        });

        csvWriter.writeRecords(result)
          .then(() => {
            res.status(200).json({ success: true, message: 'Exportación exitosa' });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error en la exportación' });
          });
      } else {
        res.status(500).json({ success: false, message: 'No hay datos para exportar' });
      }
    }
  });
});

app.listen(3001, () => console.log("Servidor en localhost:3001"));
