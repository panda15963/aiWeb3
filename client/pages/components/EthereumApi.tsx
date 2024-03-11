import React, { useState, useEffect } from "react";
import { QuoationService } from "node-upbit";
import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";
import axios from "axios";
interface IData {
  dayData: ICandleDayReturnProps[];
}

const UpbitApi = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData>({
    dayData: [],
  });

  const quoationService = new QuoationService();
  // Fetch data when component mounts
  const fetchData = async () => {
    try {
      // Fetch the day candles data
      const dayCandles = await quoationService.getDayCandles({
        marketCoin: "KRW-ETH",
        count: 5,
      });
      setData({
        dayData: dayCandles,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const sendData = async () => {
      try {
        const res = await axios.post('http://localhost:8000/api/ethereum', {
          data: data.dayData
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
    sendData();
  }, []);
  if (loading) {
    return <div>Loading ...</div>;
  } else if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Upbit API</h1>
      <h3>Day candles</h3>
      <ul>
        {data.dayData.map((dayCandle) => (
          <li key={dayCandle.timestamp}>
            <p>Timestamp: {dayCandle.trade_price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpbitApi;