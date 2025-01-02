const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint do zapisu zadań
app.post('/save-tasks', (req, res) => {
  fs.writeFile(
    path.join(__dirname, 'tasks.json'),
    JSON.stringify(req.body, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Wystąpił błąd podczas zapisu');
      }
      res.status(200).send('Zadania zapisane');
    }
  );
});

// Serwowanie pliku tasks.json
app.get('/tasks.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'tasks.json'));
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
