import React, { FC } from 'react';
import { useFetchData } from '../useFetchData';
import { Line } from 'react-chartjs-2';
import { Spinner } from "@nextui-org/react";
import { IoWarning } from "react-icons/io5";

const MinutesData: FC = () => {
  const { data, loading } = useFetchData({ marketCoin: 'KRW-ETH' });

  if (loading) {
    return <>
      <Spinner size="md" />
      Loading ...
    </>;
  } else if (data.weekData === undefined) {
    return <>
      <IoWarning size="md" />
      Data Undefined
    </>
  }

  const chartData = {
    labels: data.minutesData.map((item) => item.candle_date_time_kst),
    datasets: [
      {
        label: 'ETH-KRW',
        data: data.minutesData.map((item) => item.trade_price),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Upbit API</h1>
      <ul>
        {data.minutesData.map((item, index) => (
          <li key={index}>{item.trade_price}</li>
        ))}
      </ul>
      <Line data={chartData} />
    </div>
  );
};
export default MinutesData;