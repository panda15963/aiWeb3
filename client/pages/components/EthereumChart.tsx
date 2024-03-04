import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const EthereumChart: React.FC = () => {
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    const socket = new WebSocket('wss://ws-feed.pro.coinbase.com');

    socket.addEventListener('open', () => {
      console.log('Connected to Coinbase WebSocket API');
      socket.send(JSON.stringify({
        type: 'subscribe',
        channels: [{ name: 'ticker', product_ids: ['ETH-USD'] }]
      }));
    });

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'ticker' && data.product_id === 'ETH-USD') {
        setPrices(prevPrices => [...prevPrices, parseFloat(data.price)]);
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('priceChart') as HTMLCanvasElement;

    if (ctx && prices.length > 0) {
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: prices.length }, (_, i) => i.toString()),
          datasets: [{
            label: 'ETH-USD Price',
            yAxisID: 'y',
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            fill: false,
            tension: 0.1,
            pointRadius: 0,
            pointHitRadius: 10,
            pointHoverRadius: 5,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                callback: (value) => `$${value}`
              }
            }
          }
        },
      });
      return () => {
        myChart.destroy();
      };
    } else {
      console.log('No canvas element found');
    }
  }, [prices]);

  return (
    <div>
      <h1>ETH-USD Price</h1>
      {prices && prices.length > 0 && (
        <p>Latest price: ${prices[prices.length - 1]}</p>
      )}
      <canvas id="priceChart" width={400} height={200}></canvas>
    </div>
  );
};

export default EthereumChart;
