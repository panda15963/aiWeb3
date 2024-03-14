import React, { FC } from 'react';
import { useFetchData } from './useFetchData';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Spinner } from '@nextui-org/react';
import { IoWarning } from 'react-icons/io5';

type displayChart = {
    times : string;
};

const timeChart: displayChart[] = [
    {
        times : "dayData",
    },
    {
        times : "weekData",
    },
    {
        times : "monthData",
    },
];
const BitcoinData: FC = () => {
    const { data, loading } = useFetchData({ marketCoin: 'KRW-BTC' });
    if (loading) {
        return <>
            <Spinner size="md" />
            Loading...
        </>;
    } else if (!data) {
        return <>
            <IoWarning size="md" />
            Error
        </>
    }
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const daysChart = {
        labels: data.dayData.map((item) => item.candle_date_time_kst),
        datasets: [
            {
                label: 'BTC-KRW',
                data: data.dayData.map((item) => item.trade_price),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
        option: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "BTC-KRW",
                },
            },
        },
    };

    const weeksChart = {
        labels: data.weekData.map((item) => item.candle_date_time_kst),
        datasets: [
            {
                label: 'BTC-KRW',
                data: data.weekData.map((item) => item.trade_price),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
        option: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "BTC-KRW",
                },
            },
        },
    };

    const monthsData = {
        labels: data.monthData.map((item) => item.candle_date_time_kst),
        datasets: [
            {
                label: 'BTC-KRW',
                data: data.monthData.map((item) => item.trade_price),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
        option: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "BTC-KRW",
                },
            },
        },
    };
    return (
        <div>
            <Line data={monthsData} />
        </div>
    );
};
export default BitcoinData;