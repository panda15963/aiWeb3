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

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: port,
  connectionLimit: 10, // 연결 풀 크기
  connectTimeout: 10000, // 10초로 설정 (밀리초 단위)
  acquireTimeout: 10000, // 연결 풀에서 연결을 가져오는 시간 (밀리초)
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
    if (err.code === 'ETIMEDOUT') {
      console.error('Connection attempt timed out.');
    }
    return
  }

  if (connection) connection.release();
  console.log('Connected to the database');

  return;
});

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
  connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

app.post('/api/transactions', (req, res) => {
  console.log(req.body, res.body);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});