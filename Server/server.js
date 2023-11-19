const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'planeacion'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

app.get('/salas', (req, res) => {
  const query = 'SELECT * FROM sala';

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/carreras', (req, res) => {
  const query = 'SELECT * FROM carrera';

  connection.query(query, (error, results) => {
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

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/profesores', (req, res) => {
  const query = 'SELECT * FROM profesores';

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/asignaturas', (req, res) => {
  const query = 'SELECT * FROM asignatura';

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/facultades', (req, res) => {
  const query = 'SELECT * FROM facultad';

  connection.query(query, (error, results) => {
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

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});


app.listen(4000, () => console.log("Servidor en localhost:4000"));
