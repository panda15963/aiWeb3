import { useEffect, useState } from 'react';
import Chart, { DateAdapter } from 'chart.js/auto';

const EthereumChart: React.FC = () => {
  const [prices, setPrices] = useState<number[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    ws.onmessage = function(event) {
      setMessage(event.data);
    };
    return () => {
      ws.close();
    };
  }, []);
  return (
    <div>
      <h1>ETH-USD Price</h1>
      <p>{message}</p>
    </div>
  );
};

export default EthereumChart;
