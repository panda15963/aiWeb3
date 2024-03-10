const express = require('express');
const app = express();
const Upbit = require('node-upbit');

// Initialize a new Upbit client
const upbit = new Upbit({
  accessKey: 'CS07KGv0mZnjLUlXRpcvskMMNP8xQjxj2aIwgzgo',
  secretKey: 'NvixRAbEjuvOZL5wu5ISpkHO5er31GKxysIuMzQN',
});

// Fetch the ticker information for a market
upbit.getTicker('KRW-BTC', (err, ticker) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Ticker information for KRW-BTC:`);
  console.log(`- Opening price: ${ticker.opening_price}`);
  console.log(`- High price: ${ticker.high_price}`);
  console.log(`- Low price: ${ticker.low_price}`);
  console.log(`- Trade price: ${ticker.trade_price}`);
  console.log(`- Trade volume: ${ticker.acc_trade_volume}`);
});

// Fetch the order book for a market
upbit.getOrderBook('KRW-BTC', (err, orderBook) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Order book for KRW-BTC:`);
  console.log(`- Ask orders:`);
  orderBook.asks.forEach((order) => {
    console.log(`  - Price: ${order.price}, Volume: ${order.volume}`);
  });
  console.log(`- Bid orders:`);
  orderBook.bids.forEach((order) => {
    console.log(`  - Price: ${order.price}, Volume: ${order.volume}`);
  });
});
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
