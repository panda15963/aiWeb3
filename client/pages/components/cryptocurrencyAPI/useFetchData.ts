import { useState, useEffect } from "react";
import { QuoationService } from "node-upbit";
import {
  ICandleDayReturnProps,
  ICandleWeekReturnProps, 
  ICandlesMonthReturnProps,
  ICandleReturnProps
} from "node-upbit/lib/@types/quotation";

interface IData {
  minutesData: ICandleReturnProps[];
  dayData: ICandleDayReturnProps[];
  weekData: ICandleWeekReturnProps[];
  monthData: ICandlesMonthReturnProps[];
}

interface IUseFetchDataProps {
  marketCoin: string;
}

export const useFetchData = ({ marketCoin }: IUseFetchDataProps) => {
  const [data, setData] = useState<IData>({
    minutesData: [],
    dayData: [],
    weekData: [],
    monthData: [],
  });
  const [loading, setLoading] = useState(true);
  const quoationService = new QuoationService();

  const fetchData = async () => {
    try {
      const minutesCandles = await quoationService.getMinutesCandles({
        minutes: '60',
        marketCoin,
        count: 25,
      });

      const dayCandles = await quoationService.getDayCandles({
        marketCoin,
        count: 8,
      });

      const weekCandles = await quoationService.getWeekCandles({
        marketCoin,
        count: 6,
      });

      const monthCandles = await quoationService.getMonthCandles({
        marketCoin,
        count: 12,
      });

      setData({
        minutesData: minutesCandles,
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
  }, [marketCoin]);

  return { data, loading };
};