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
    functionsName: any;
    dates: string;
    active: boolean;
    color: string;
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
        tension: number;
        pointRadius: number;
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

const SandboxData: FC = () => {
    const { data, loading } = useFetchData({ marketCoin: 'KRW-SAND' });
    const [ selectedTime, setSelectedTime ] = useState<string>(TIME_COMPONENT.hourlyData);
    const [ dateActive, setDateActive ] = useState<string>('1 Day');

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

    const timeRegexp = new RegExp(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/);
    const dateList: any = [];
    for (let i = 0; i < data.minutesDataforDay.length; i++) {
        dateList.push(data.minutesDataforDay[i].candle_date_time_kst.match(timeRegexp));
        dateList[i] = dateList[i].slice(1, 3).join(' ');
    }
    
    const DateTimeChart: dataChart[] = [
        {
            labels: dateList.map((item:any) => item),
            datasets: [
                {
                    label: 'BTC-SAND',
                    data: data.minutesDataforDay.map((item) => item.trade_price),
                    fill: false,
                    backgroundColor: 'rgb(6, 182, 212)',
                    borderColor: 'rgba(6, 182, 212, 0.2)',
                    tension: 0.5,
                    pointRadius: 3,
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
                        text: "BTC-SAND",
                    },
                },
            },
        },
        {
            labels: dateList.map((item:any) => item),
            datasets: [
                {
                    label: 'BTC-SAND',
                    data: data.minutesDataforWeek.map((item) => item.trade_price),
                    fill: false,
                    backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgba(51, 51, 255, 0.2)',
                    tension: 0.5,
                    pointRadius: 0,
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
                        text: "BTC-SAND",
                    },
                },
            },
        },
        {
            labels: dateList.map((item:any) => item),
            datasets: [
                {
                    label: 'BTC-SAND',
                    data: data.dayData.map((item) => item.trade_price),
                    fill: false,
                    backgroundColor: 'rgb(255, 0, 0)',
                    borderColor: 'rgba(255, 51, 51, 0.2)',
                    tension: 0.5,
                    pointRadius: 0,
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
                        text: "BTC-SAND",
                    },
                },
            },
        },
        {
            labels: dateList.map((item:any) => item),
            datasets: [
                {
                    label: 'BTC-KRW',
                    data: data.weekData.map((item) => item.trade_price),
                    fill: false,
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    tension: 0.5,
                    pointRadius: 0,
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
        },
    ];

    function handleSelectDay() {
        setSelectedTime(TIME_COMPONENT.hourlyData);
        setDateActive('1 Day');
    }

    function handleSelectWeek() {
        setSelectedTime(TIME_COMPONENT.dayData);
        setDateActive('1 Week');
    }

    function handleSelectMonth() {
        setSelectedTime(TIME_COMPONENT.weekData);
        setDateActive('1 Month');
    }

    function handleSelectYear() {
        setSelectedTime(TIME_COMPONENT.monthData);
        setDateActive('1 Year');
    }

    const dateTime: dateTime[] = [
        { functionsName: handleSelectDay, dates: '1 Day', active: false, color: 'text-cyan-500' },
        { functionsName: handleSelectWeek, dates: '1 Week', active: false, color: 'text-blue-500'},
        { functionsName: handleSelectMonth, dates: '1 Month', active: false, color: 'text-red-500'},
        { functionsName: handleSelectYear, dates: '1 Year', active: false, color: 'text-black-500'},
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
                    <button className={`bg-white p-4 rounded shadow-lg text-center m-2 ${item.dates === dateActive ? `underline decoration-2 ${item.color} font-bold` : ''}`} key={index} onClick={item.functionsName}>{item.dates}</button>
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
export default SandboxData;