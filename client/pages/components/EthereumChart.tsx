import React, { useState } from "react";
import { QuoationService } from "node-upbit";
import { ICandleDayReturnProps } from "node-upbit/lib/@types/quotation";

const EthereumChart = () => {
  const [dayData, setDayData] = useState<ICandleDayReturnProps[]>([]);
  const quoationService = new QuoationService();
  const dayCandles = quoationService.getDayCandles({
    marketCoin: "KRW-ETH",
    count: 1,
  });
  const weekCandles = quoationService.getWeekCandles({
    marketCoin: "KRW-ETH",
    count: 1,
  });
  const monthCandles = quoationService.getMonthCandles({
    marketCoin: "KRW-ETH",
    count: 1,
  });
  const fetchDayCandles = async () => {
    const response = await dayCandles;
    setDayData(response);
  }
  const fetchWeekCandles = async () => {
    const response = await weekCandles;
    console.log(response);
  }
  const fetchMonthCandles = async () => {
    const response = await monthCandles;
    console.log(response);
  }
  Promise.all
  return (
    <div className="col-12 pb-4 mx-auto">
      <h1 className="text-center text-4xl font-bold mt-8 pb-4">
        Ethereum Chart
      </h1>
      <h1 className="text-center text-4xl font-bold mt-8 pb-4">
        {dayData.map((data, index) => (
          <div key={index}>
            <h1>Open: {data.opening_price}</h1>
          </div>
        ))}
      </h1>
    </div>
  );
}
export default EthereumChart;