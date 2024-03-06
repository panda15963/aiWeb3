const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clientSocket;

wss.on('connection', function connection(ws) {
  clientSocket = ws;
  console.log('WebSocket connected');
  
  // Coinbase Pro WebSocket 엔드포인트 URL
  const wsUrl = 'wss://ws-feed.pro.coinbase.com';
  const coinbaseSocket = new WebSocket(wsUrl);
  coinbaseSocket.on('message', function incoming(data) {
    // 메시지를 프론트엔드로 전달
    if (clientSocket.readyState === WebSocket.OPEN) {
      clientSocket.send(data);
    }
  });
});

server.listen(3000, function() {
  console.log('Backend server listening on port 3000');
});
