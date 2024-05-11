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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
  }
});

app.post('/api/transactions', (req, res) => {
  const {userID, dateTime, fromID, toID, price, tokenFee} = req.body;
  const sql = `INSERT INTO transactions VALUES ('${userID}', '${txnHash}', '${fromID}', '${toID}', '${price}', '${tokenFee}', '${dateTime}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Transaction added");
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});