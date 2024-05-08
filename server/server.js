const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 8000;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Panda7521ok!",
  database: "Ethereum",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

app.post('/api/users', (req, res) => {
  console.log(req.body, res.body);
});

app.post('/api/transactions', (req, res) => {
  console.log(req.body, res.body);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});