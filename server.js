const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Configurar middleware
app.use(express.json());
app.use(cors());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(':memory:');

// Crear tabla de votos
db.serialize(() => {
    db.run("CREATE TABLE votes (candidate TEXT, count INTEGER)");
    db.run("INSERT INTO votes (candidate, count) VALUES ('Candidato 1', 0)");
    db.run("INSERT INTO votes (candidate, count) VALUES ('Candidato 2', 0)");
    db.run("INSERT INTO votes (candidate, count) VALUES ('Candidato 3', 0)");
});

// Ruta para obtener los votos
app.get('/votes', (req, res) => {
    db.all("SELECT * FROM votes", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Ruta para actualizar los votos
app.post('/vote', (req, res) => {
    const candidate = req.body.candidate;
    db.run("UPDATE votes SET count = count + 1 WHERE candidate = ?", [candidate], function(err) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json({ message: 'Voto registrado' });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
