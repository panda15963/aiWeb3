const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER, 
  password : process.env.DB_PWD,
  database : process.env.DB_NAME,
});
db.connect((err) => {
  if (err) {
    console.error('error connecting to MySQL: ' + err.message);
  }
  console.log('Connected to database');
});
app.post('/api/ethereum', (req, res) => {
  const { address } = req.body;
  const sql = `SELECT * FROM ethereum WHERE address = '${address}'`;
  db.query(sql, (err, result) => {
    if (err) {
      res.send({ error: err.message });
    }
    if (result.length > 0) {
      res.send({ data: result[0] });
    } else {
      res.send({ data: null });
    }
  });
});
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
