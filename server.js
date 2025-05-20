const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = 'users.json';

app.use(express.json());
app.use(express.static('public'));

app.post('/login', (req, res) => {
  const userData = req.body;
  let users = [];

  if (fs.existsSync(DATA_FILE)) {
    users = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  users.push({ ...userData, time: new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));

  res.send({ status: 'User saved' });
});

app.get('/users', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const users = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(users);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});