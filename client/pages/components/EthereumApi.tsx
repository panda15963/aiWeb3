import React, { useState, useEffect } from "react";
import axios from "axios";
import { QuoationService } from "node-upbit";
import { ICandleDayReturnProps, ICandleWeekReturnProps, ICandlesMonthReturnProps } from "node-upbit/lib/@types/quotation";

interface IData {
  dayData: ICandleDayReturnProps[];
  weekData: ICandleWeekReturnProps[];
  monthData: ICandlesMonthReturnProps[];
}

const UpbitApi: React.FC = () => {
  const [data, setData] = useState<IData>({
    dayData: [],
    weekData: [],
    monthData: [],
  });
  const [loading, setLoading] = useState(true);

  const quoationService = new QuoationService();

  const fetchData = async () => {
    try {
      const dayCandles = await quoationService.getDayCandles({
        marketCoin: "KRW-ETH",
        count: 5,
      });

      const weekCandles = await quoationService.getWeekCandles({
        marketCoin: "KRW-ETH",
        count: 5,
      });

      const monthCandles = await quoationService.getMonthCandles({
        marketCoin: "KRW-ETH",
        count: 5,
      });

      setData({
        dayData: dayCandles,
        weekData: weekCandles,
        monthData: monthCandles,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!loading && Array.isArray(data.dayData) && data.dayData.length > 0) {
        try {
          await axios.post('http://localhost:8000/api/ethereum', {
            data: data.dayData,
          });
        } catch (error) {
        if (error instanceof Error) {
        console.error(error.message);
      }
        }
      }
    }

    fetchData();
  }, [loading, data.dayData]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h1>Upbit API</h1>
      <h3>Day candles</h3>
      <ul>
        {data.dayData?.map((candle) => (
          <li key={candle.candle_date_time_kst}>
            {candle.trade_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpbitApi;