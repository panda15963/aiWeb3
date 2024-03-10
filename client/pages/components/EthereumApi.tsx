import React, { FC, useState, useEffect } from "react";
import { QuoationService } from "node-upbit";
import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";

interface IData {
  dayData: ICandleDayReturnProps[];
}

const UpbitApi: FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData>({
    dayData: [],
  });

  const quoationService = new QuoationService();

  const fetchData = async () => {
    try {
      // Fetch the day candles data
      const dayCandles = await quoationService.getDayCandles({
        marketCoin: "KRW-ETH",
        count: 200,
      });

      // Update the state variable with the fetched data
      setData({
        dayData: dayCandles,
      });
      console.log(dayCandles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Day</h1>
      <ul>
        {data.dayData.map((candle, index) => (
          <li key={index}>
            {candle.candle_date_time_kst}
            {candle.trade_price}
          </li>

        ))}
      </ul>
    </div>
  );
}

export default UpbitApi;