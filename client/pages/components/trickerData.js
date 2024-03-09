// pages/api/tickerData.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api.upbit.com/v1/ticker?markets=KRW-BTC');
    const tickerData = response.data;
    res.status(200).json(tickerData);
  } catch (error) {
    console.error('Error fetching ticker data:', error);
    res.status(500).json({ error: 'Failed to fetch ticker data from Upbit' });
  }
}
