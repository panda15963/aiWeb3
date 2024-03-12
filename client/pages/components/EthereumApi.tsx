import React, { useState, useEffect } from "react";
import { QuoationService } from "node-upbit";
import { ICandleDayReturnProps, ICandleWeekReturnProps, ICandlesMonthProps } from "node-upbit/lib/@types/quotation";
import axios from "axios";
interface IData {
  dayData?: ICandleDayReturnProps[];
  weekData?: ICandleWeekReturnProps[];
  monthData?: ICandlesMonthProps[];
}

const UpbitApi = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IData>({
    dayData: [],
  });
  const fetchData = async () => {
    try {
      const quoationService = new QuoationService();
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
  fetchData();
  // useEffect(() => {
  //   fetchData()
  //   const sendData = async () => {
  //     try {
  //       const res = await axios.post('http://localhost:8000/api/ethereum', {
  //         data: data.dayData
  //       });
  //       console.log(res);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   sendData();
  // }, []);
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
        {data.dayData?.map((candle) => (
          <li key={candle.candle_date_time_kst}>
            {candle.prev_closing_price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpbitApi;