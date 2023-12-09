const express = require('express');
const session = require('express-session');
const app = express();
const mysql = require('mysql');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');
const path = require('path');
const os = require('os');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  key: "userId",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 60 * 60 * 24,
  },
}));

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

app.get('/alumnos', (req, res) => {
  const query = 'SELECT * FROM alumno';

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
  SELECT eventos.id_evento, eventos.id_asignatura, asignatura.nombre AS nombre_asignatura, horarios.start, horarios.end,horarios.id_horario, eventos.id_sala, eventos.cupos, eventos.seccion, eventos.fecha,asignatura.id_nivel,profesor_asignatura.id_profesor,profesor.nombre AS nombre_profesor,alumno_asignatura.id_alumno,alumno.nombre AS nombre_alumno
  FROM eventos
  JOIN horarios ON eventos.id_horario = horarios.id_horario
  JOIN asignatura ON eventos.id_asignatura = asignatura.id_asignatura
  JOIN profesor_asignatura ON asignatura.id_asignatura = profesor_asignatura.id_asignatura
  JOIN profesor ON profesor_asignatura.id_profesor = profesor.id_profesor
  JOIN alumno_asignatura ON asignatura.id_asignatura = alumno_asignatura.id_asignatura
  JOIN alumno ON alumno_asignatura.id_alumno = alumno.id_alumno;
    `;

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      console.log('Resultados de la consulta:', results); // Agrega esta línea para imprimir los resultados en la consola del servidor
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

  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query('INSERT INTO profesor (rut_profesor,nombre, contrato, password) VALUES (?,?,?,?)', [rut_profesor ,nombre, contrato, hash ], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send("profesor registrado correctamente");
      }
  });
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

  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query('UPDATE profesor SET rut_profesor=?, nombre = ?, contrato = ?, password = ? WHERE id_profesor = ?', [rut_profesor,nombre, contrato, hash, id_profesor],
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
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

  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query('INSERT INTO alumno (rut, nombre, correo, password, id_carrera) VALUES (?,?,?,?,?)', [rut, nombre, correo, hash, id_carrera], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send("Alumno registrado correctamente");
      }
  });
});
});

app.get('/alumnos', (req, res) => {
  db.query('SELECT alumno.rut, alumno.nombre,alumno.correo,alumno.password,(carrera.nombre)as carrera , alumno.estado FROM `alumno` INNER JOIN carrera on alumno.id_carrera = carrera.id_carrera', (err, result) => {
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
  // Encripta el password usando bcrypt
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query('UPDATE alumno SET rut = ?, nombre = ?, correo = ?, password = ? , id_carrera = ? WHERE id_alumno = ?', [rut, nombre, correo, hash, id_carrera, id_alumno], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  })
})
});

app.put('/hideAlu/:id_alumno', (req, res) => {
  const id_alumno = req.params.id_alumno;
  const nuevoEstado = 0;  // Establece el nuevo estado (inactivo)

  db.query('UPDATE alumno SET estado = ? WHERE id_alumno = ?', [nuevoEstado, id_alumno], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error al ocultar al alumno' });
    } else {
      res.status(200).json({ success: true, message: 'Alumno ocultado exitosamente' });
    }
  });
});

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

//LOGIN
app.post('/login', async (req, res) => {
  const rut = req.body.rut;
  const password = req.body.password;

  try {
    // Consulta a la base de datos para alumno
    const resultsAlumno = await dbQuery('SELECT * FROM alumno WHERE rut = ?', [rut]);
    if (resultsAlumno.length > 0) {
      const passwordsMatch = await bcrypt.compare(password, resultsAlumno[0].password);
      if (passwordsMatch) {
        req.session.alumno = resultsAlumno;
        res.json(resultsAlumno);
        return; // Importante: terminar la función después de enviar la respuesta
      } else {
        res.json({ message: 'Usuario y/o contraseña incorrectos' });
        return;
      }
    } else {
      // No existe un usuario con el rut dado en la tabla de alumnos
      // Puedes manejarlo según tus necesidades
    }

    // Consulta a la base de datos para profesor
    const resultsProfesor = await dbQuery('SELECT * FROM profesor WHERE rut_profesor = ?', [rut]);
    if (resultsProfesor.length > 0) {
      const passwordsMatch = await bcrypt.compare(password, resultsProfesor[0].password);
      if (passwordsMatch) {
        req.session.profesor = resultsProfesor;
        res.json(resultsProfesor);
        return; // Importante: terminar la función después de enviar la respuesta
      } else {
        res.json({ message: 'Usuario y/o contraseña incorrectos' });
        return;
      }
    } else {
      // No existe un usuario con el rut dado en la tabla de profesores
      // Puedes manejarlo según tus necesidades
    }

    // Consulta a la base de datos para administrador
    const resultsAdmin = await dbQuery('SELECT * FROM administrador WHERE rut_administrador = ?', [rut]);
    if (resultsAdmin.length > 0) {
      const passwordsMatch = await bcrypt.compare(password, resultsAdmin[0].password);
      if (passwordsMatch) {
        req.session.administrador = resultsAdmin;
        res.json({ isAdmin: true, ...resultsAdmin[0] });   
        //res.json(resultsAdmin);
        return; // Importante: terminar la función después de enviar la respuesta
      } else {
        res.json({ message: 'Usuario y/o contraseña incorrectos' });
        return;
      }
    } else {
      // No existe un usuario con el rut dado en la tabla de administradores
      // Puedes manejarlo según tus necesidades
    }

    // Si llegamos aquí, significa que no se encontró un usuario en ninguna de las tablas
    res.json({ message: 'Usuario no existe' });
  } catch (error) {
    console.error('Error en la consulta a la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Función de utilidad para realizar consultas a la base de datos
function dbQuery(sql, values) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, rut: req.session.rut });
  } else {
    res.send({ loggedIn: false });
  }
});

//codigo PARA SALIR SESION

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Error destroying session' });
    } else {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.json({ message: 'Logout successful' });
    }
  });
});

app.listen(3001, () => console.log("Servidor en localhost:3001"));


//FORGOT

app.post('/forgot', async (req, res) => {
  const correo = req.body.correo;
  
  try {
    // Query for alumno
    const alumnoResults = await queryDatabase('SELECT * FROM alumno WHERE correo = ?', [correo]);
    if (alumnoResults.length > 0) {
      const token = jwt.sign({ id_alumno: alumnoResults[0].id_alumno }, 'tu-secreto', { expiresIn: '20min' });

      await sendResetEmail(correo, 'alumno', alumnoResults[0].id_alumno, token);

      res.json({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' });
      return;
    }

    // Query for profesor
    const profesorResults = await queryDatabase('SELECT * FROM profesor WHERE correo = ?', [correo]);
    if (profesorResults.length > 0) {
      const token = jwt.sign({ id_profesor: profesorResults[0].id_profesor }, 'tu-secreto', { expiresIn: '20min' });

      await sendResetEmail(correo, 'profesor', profesorResults[0].id_profesor, token);

      res.json({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' });
      return;
    }

    // Query for administrador
    const administradorResults = await queryDatabase('SELECT * FROM administrador WHERE correo = ?', [correo]);
    if (administradorResults.length > 0) {
      const token = jwt.sign({ id_administrador: administradorResults[0].id_administrador }, 'tu-secreto', { expiresIn: '20min' });

      await sendResetEmail(correo, 'administrador', administradorResults[0].id_administrador, token);

      res.json({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' });
      return;
    }

    // If no matching user found
    res.status(500).json({ error: 'No existe un usuario con el correo ingresado.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
});

async function queryDatabase(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function sendResetEmail(correo, userType, userId, token) {
  const transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 25,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'Papercut@papercut.com',
    to: correo,
    subject: 'Restablecer contraseña',
    text: `Para restablecer tu contraseña, haz click en el siguiente enlace: http://localhost:3000/Reset/${userType}/${userId}/${token}`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        console.log('Correo enviado: ' + info.response);
        resolve();
      }
    });
  });
}


// RESET
app.post('/reset/:userType/:id/:token', (req, res) => {
  const { password } = req.body;
  const { userType, id, token } = req.params;

  jwt.verify(token, 'tu-secreto', async (error, decodedToken) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar la solicitud.' });
      return;
    } else {
      bcrypt.hash(password, saltRounds, async (error, hash) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al procesar la solicitud.' });
          return;
        } else {
          try {
            let sql;
            let params;
            if (userType === 'alumno') {
              sql = 'UPDATE alumno SET password = ? WHERE id_alumno = ?';
              params = [hash, id];
            } else if (userType === 'profesor') {
              sql = 'UPDATE profesor SET password = ? WHERE id_profesor = ?';
              params = [hash, id];
            } else if (userType === 'administrador') {
              sql = 'UPDATE administrador SET password = ? WHERE id_administrador = ?';
              params = [hash, id];
            } else {
              res.status(500).json({ error: 'Error al procesar la solicitud.' });
              return;
            }

            await queryDatabase(sql, params);

            res.json({ message: 'Contraseña restablecida exitosamente.' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al procesar la solicitud.' });
          }
        }
      });
    }
  });

});

