const express = require('express');
const knexConfig = require('./knexfile.js');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexConfig[environment]);
const cors = require('cors');
const port = 5000;

app.use(express.json());
app.use(cors());


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });