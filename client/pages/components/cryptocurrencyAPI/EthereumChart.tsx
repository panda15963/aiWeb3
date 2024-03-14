import React, { FC, useState } from 'react';
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

const TIME_COMPONENT = {
    dayData: "dayData",
    weekData: "weekData",
    monthData: "monthData",
};

const EthereumData: FC = () => {
    const { data, loading } = useFetchData({ marketCoin: 'KRW-ETH' });
    const [ selectedTime, setSelectedTime ] = useState<string>(TIME_COMPONENT.dayData);
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

    const MinutesData = {
        labels: data.minutesData.map((item) => item.candle_date_time_kst),
        datasets: [
            {
                label: 'ETH-KRW',
                data: data.minutesData.map((item) => item.trade_price),
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
                    text: "ETH-KRW",
                },
            },
        },
    };
    const DaysData = {
        labels: data.dayData.map((item) => item.candle_date_time_kst),
        datasets: [
            {
                label: 'ETH-KRW',
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
                    text: "ETH-KRW",
                },
            },
        },
    };
    
    const WeeksData = {
        labels: data.weekData.map((item) => item.candle_date_time_kst),
        datasets: [
            {
                label: 'ETH-KRW',
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
                    text: "ETH-KRW",
                },
            },
        },
    };

    const MonthsData = {
        labels: data.monthData.map((item) => item.candle_date_time_kst),
        datasets: [
            {
                label: 'ETH-KRW',
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
                    text: "ETH-KRW",
                },
            },
        },
    };

    const handleChangeGraph = (time: string) => {
        switch (time) {
            case "dayData":
                setSelectedTime("dayData");
                return <Line data={DaysData} options={{ ...DaysData.option, plugins: { ...DaysData.option.plugins, legend: { ...DaysData.option.plugins.legend, position: "top" } } }} />;
            case "weekData":
                setSelectedTime("weekData");
                return <Line data={WeeksData} options={{ ...WeeksData.option, plugins: { ...WeeksData.option.plugins, legend: { ...WeeksData.option.plugins.legend, position: "top" } } }} />;
            case "monthData":
                setSelectedTime("monthData");
                return <Line data={MonthsData} options={{ ...MonthsData.option, plugins: { ...MonthsData.option.plugins, legend: { ...MonthsData.option.plugins.legend, position: "top" } } }} />;
            default:
                return <Line data={MinutesData} options={{ ...MinutesData.option, plugins: { ...MinutesData.option.plugins, legend: { ...MinutesData.option.plugins.legend, position: "top" } } }} />;
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleChangeGraph("dayData")}>Day</button>
                <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleChangeGraph("weekData")}>Week</button>
                <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleChangeGraph("monthData")}>Month</button>
            </div>
            <div>
            </div>
        </>
    );
};
export default EthereumData;