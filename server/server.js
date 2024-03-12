const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 8000;
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// connect to mysql database
const db = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER, 
  password : process.env.DB_PWD,
  database : process.env.DB_NAME,
  port: process.env.DB_PORT,
});
db.connect((err) => {
  if (err) {
    console.log('Error connecting to database',err.message);
  } else {
    console.log('Connected to database');
  }
});
app.post('/api/ethereum', (req, res) => {
  const { address } = req.body;
  const query = `SELECT * FROM ethereum WHERE address = '${address}'`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(result);
    }
  });
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});