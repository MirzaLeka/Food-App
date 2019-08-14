require ('./config/config');
require('./db/database')

const express = require('express');
const path = require('path');

// Setup
const app = express();
const port = process.env.PORT;
const distPath = path.join(__dirname, '../dist/Food-App/index.html');

// Body Parser JSON
app.use(express.json());

// Body Parser Forms
app.use(express.urlencoded({ extended: true }));

// Error page
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, '/index.html'));
});

// Server launch
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});