require ('./config/config');
require('./db/database')

const express = require('express');
const { join } = require('path');

// Setup
const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 3000;
const distPath = join(__dirname, '../dist/Food-App/index.html');

// Body Parser JSON
app.use(express.json());

// Body Parser Forms
app.use(express.urlencoded({ extended: true }));

app.use('/order', require('./Controller/orderController')); 
app.use('/api/company', require('./Controller/companyController')); 
app.use('/auth/users', require('./Controller/usersController')); 

// Error page
app.get('*', (req, res) => {
  res.sendFile(join(distPath, '/index.html'));
});

// Server launch
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
