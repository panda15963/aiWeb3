import React, { FC, useState } from 'react';
import { useFetchData } from '../useFetchData';
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

const TIME_COMPONENT = {
    hourlyData: "hourlyData",
    dayData: "dayData",
    weekData: "weekData",
    monthData: "monthData",
};


type dateTime = {
    functionsName : any;
    dates: string;
}

type displayGraph = {
    data: any;
}

type dataChart = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string;
        borderColor: string;
    }[];
    option: {
        responsive: boolean;
        plugins: {
            legend: {
                position: string;
            };
            title: {
                display: boolean;
                text: string;
            };
        };
    };
}

const EthereumData: FC = () => {
    const { data, loading } = useFetchData({ marketCoin: 'KRW-ETH' });
    const [selectedTime, setSelectedTime] = useState<string>(TIME_COMPONENT.dayData);
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
    
    const DateTimeChart: dataChart[] = [
        {
            labels: data.minutesData.map((item) => item.candle_date_time_kst),
            datasets: [
                {
                    label: 'ETH-KRW',
                    data: data.minutesData.map((item) => item.trade_price),
                    fill: false,
                    backgroundColor: 'rgb(51, 0, 0)',
                    borderColor: 'rgba(102, 51, 51, 0.2)',
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
                        text: "ETH-KRW",
                    },
                },
            },
        },
        {
            labels: data.dayData.map((item) => item.candle_date_time_kst),
            datasets: [
                {
                    label: 'ETH-KRW',
                    data: data.dayData.map((item) => item.trade_price),
                    fill: false,
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgba(51, 51, 255, 0.2)',
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
                        text: "ETH-KRW",
                    },
                },
            },
        },
        {
            labels: data.weekData.map((item) => item.candle_date_time_kst),
            datasets: [
                {
                    label: 'ETH-KRW',
                    data: data.weekData.map((item) => item.trade_price),
                    fill: false,
                    backgroundColor: 'rgb(255, 0, 0)',
                    borderColor: 'rgba(255, 51, 51, 0.2)',
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
                        text: "ETH-KRW",
                    },
                },
            },
        },
        {
            labels: data.monthData.map((item) => item.candle_date_time_kst),
            datasets: [
                {
                    label: 'ETH-KRW',
                    data: data.monthData.map((item) => item.trade_price),
                    fill: false,
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0.2)',
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
                        text: "ETH-KRW",
                    },
                },
            },
        },
    ];

    function handleSelectDay() {
        setSelectedTime(TIME_COMPONENT.hourlyData);
    }

    function handleSelectWeek() {
        setSelectedTime(TIME_COMPONENT.dayData);
    }

    function handleSelectMonth() {
        setSelectedTime(TIME_COMPONENT.weekData);
    }

    function handleSelectYear() {
        setSelectedTime(TIME_COMPONENT.monthData);
    }

    const dateTime: dateTime[] = [
        { functionsName: handleSelectDay, dates: '1 Day' },
        { functionsName: handleSelectWeek, dates: '1 Week' },
        { functionsName: handleSelectMonth, dates: '1 Month' },
        { functionsName: handleSelectYear, dates: '1 Year' },
    ]

    const displayGraphs: displayGraph[] = [
        { data: DateTimeChart[0] },
        { data: DateTimeChart[1] },
        { data: DateTimeChart[2] },
        { data: DateTimeChart[3] },
    ]
    return (
        <>
            <div className='flex justify-center'>
                {dateTime.map((item, index) => (
                    <button className='bg-white p-4 rounded shadow text-center m-2' key={index} onClick={item.functionsName}>{item.dates}</button>
                ))}
            </div>
            {displayGraphs.map((item, index) => (
                <div key={index}>
                    {selectedTime === Object.keys(TIME_COMPONENT)[index] && (
                        <Line data={item.data} />
                    )}
                </div>
            ))}
        </>
    );
};
export default EthereumData;