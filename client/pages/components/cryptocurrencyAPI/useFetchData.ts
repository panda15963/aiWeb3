import { useState, useEffect } from "react";
import { QuoationService } from "node-upbit";
import {
  ICandleDayReturnProps,
  ICandleWeekReturnProps, 
  ICandleReturnProps
} from "node-upbit/lib/@types/quotation";

interface IData {
  [x: string]: any;
  minutesDataforDay: ICandleReturnProps[];
  minutesDataforWeek: ICandleReturnProps[];
  dayData: ICandleDayReturnProps[];
  weekData: ICandleWeekReturnProps[];
}

interface IUseFetchDataProps {
  marketCoin: string;
}

export const useFetchData = ({ marketCoin }: IUseFetchDataProps) => {
  const [data, setData] = useState<IData>({
    minutesDataforDay: [],
    minutesDataforWeek: [],
    dayData: [],
    weekData: [],
  });
  const [loading, setLoading] = useState(true);
  const quoationService = new QuoationService();

  const fetchData = async () => {
    try {
      const dayCandles = await quoationService.getMinutesCandles({
        minutes: '60',
        marketCoin,
        count: 25,
      });

      const weekCandles = await quoationService.getMinutesCandles({
        minutes: '60',
        marketCoin,
        count: 169,
      });

      const monthCandles = await quoationService.getDayCandles({
        marketCoin,
        count: 32,
      });

      const yearCandles = await quoationService.getWeekCandles({
        marketCoin,
        count: 53,
      });

      setData({
        minutesDataforDay: dayCandles,
        minutesDataforWeek: weekCandles,
        dayData: monthCandles,
        weekData: yearCandles,
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