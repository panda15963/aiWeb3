const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 8000;
const request = require('request');
const axios = require('axios');

try {
  var uuidv4 = require('uuid/v4');
} catch (error) {
  var { v4: uuidv4 } = require('uuid');
}
const sign = require('jsonwebtoken').sign;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY
const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY
const server_url = "https://api.upbit.com"

const payload = {
  access_key: access_key,
  nonce: uuidv4(),
}

const token = sign(payload, secret_key)

const options = {
  method: "GET",
  url: server_url + "/v1/accounts",
  headers: { Authorization: `Bearer ${token}` },
}

app.get('/api/accounts', (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error)
    res.send(body)
  })
});

axios.post('https://sepolia.infura.io/v3/355b801e336a45769c2285c8946e9c05', {
  jsonrpc: '2.0',
  method: 'eth_getBlockByHash',
  params: ['0x2daf42a166a7c75579b37e5996558095d53282a6a23c761b094ea1add78ff681', false],
  id: 1,
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});