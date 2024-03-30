import React, { useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useFetchData } from "../useFetchData";
import dynamic from "next/dynamic";
import { Spinner } from '@nextui-org/react';
import { usePrice } from "../../context/PriceContext";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

type dateTime = {
    functionsName: any;
    dates: string;
    active: boolean;
}

const BitcoinChart = () => {
    const { data, loading } = useFetchData({ marketCoin: "KRW-ETH" });
    const [selectedTime, setSelectedTime] = useState<string>("hourlyData");
    const [dateActive, setDateActive] = useState<string>('1 Day');
    const { setEthereum } = usePrice();
    setEthereum(data.ticker.opening_price)

    const TIME_COMPONENT = {
        hourlyData: "hourlyData",
        dayData: "dayData",
        weekData: "weekData",
        monthData: "monthData",
    };

    const series = [
        {
            data: data.minutesDataforDay.map((item) => {
                return {
                    x: new Date(item.timestamp + 1000 * 60 * 60 * 9),
                    y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
                };
            }),
        },
        {
            data: data.minutesDataforWeek.map((item) => {
                return {
                    x: new Date(item.timestamp + 1000 * 60 * 60 * 9),
                    y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
                };
            }),
        },
        {
            data: data.dayData.map((item) => {
                return {
                    x: new Date(item.timestamp + 1000 * 60 * 60 * 9),
                    y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
                };
            }),
        },
        {
            data: data.weekData.map((item): any => {
                return {
                    x: new Date(item.timestamp + 1000 * 60 * 60 * 9),
                    y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
                };
            }),
        },
    ];

    const dateTime: dateTime[] = [
        { functionsName: handleSelectDay, dates: '1 Day', active: false },
        { functionsName: handleSelectWeek, dates: '1 Week', active: false },
        { functionsName: handleSelectMonth, dates: '1 Month', active: false },
        { functionsName: handleSelectYear, dates: '1 Year', active: false },
    ]

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

    const displayGraphs = [
        { data: series[0] },
        { data: series[1] },
        { data: series[2] },
        { data: series[3] },
    ]

    const prices = [
        { title: "Opening Price", data: data.ticker.opening_price },
        { title: "High Price", data: data.ticker.high_price },
        { title: "Low Price", data: data.ticker.low_price },
        { title: "Trade Price", data: data.ticker.trade_price },
        { title: "Prev Closing Price", data: data.ticker.prev_closing_price },
        { title: "Highest Price(52 weeks)", data: data.ticker.highest_52_week_price },
        { title: "Lowest Price(52 weeks)", data: data.ticker.lowest_52_week_price },
        { title: "Acc Trade Price(24h)", data: data.ticker.acc_trade_price_24h },
        { title: "Acc Trade Volume(24h)", data: data.ticker.acc_trade_volume_24h },
    ]

    if (loading) {
        return (
            <>
                <Spinner size="lg" />
                <h1 className=" text-center ">Loading...</h1>
            </>
        );
    } else {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col lg="12">
                            <div className="flex flex-wrap">
                                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                                    <Row>
                                        <Col lg="12">
                                            <div className="flex justify-center">
                                                {dateTime.map((item, index) => {
                                                    return (
                                                        <button className={`bg-white p-4 rounded shadow-lg text-center border-1 m-2 border-black ${item.dates === dateActive ? `underline decoration-2 font-bold` : ''}`} key={index} onClick={item.functionsName}>
                                                            {item.dates}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="4">
                                            <Card
                                                shadow="lg"
                                                className="border-1 border-black rounded-md shadow-lg mb-4">
                                                <CardBody className="overflow-visible p-0 border-black">
                                                    {displayGraphs.map((item, index) => (
                                                        <div className="chart-area flex justify-between">
                                                            {selectedTime === Object.keys(TIME_COMPONENT)[index] && (
                                                                <ReactApexChart
                                                                    options={{
                                                                        chart: {
                                                                            animations: {
                                                                                enabled: true,
                                                                                easing: 'easeout',
                                                                                speed: 800,
                                                                                animateGradually: {
                                                                                    enabled: true,
                                                                                    delay: 150
                                                                                },
                                                                                dynamicAnimation: {
                                                                                    enabled: true,
                                                                                    speed: 350
                                                                                }
                                                                            }
                                                                        },
                                                                        xaxis: {
                                                                            type: "datetime",
                                                                            title: {
                                                                                text: "Time(KST)",
                                                                            },
                                                                        },
                                                                        yaxis: {
                                                                            labels: {
                                                                                formatter: function (value) {
                                                                                    return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                                                },
                                                                            },
                                                                            title: {
                                                                                text: "Price(₩)",
                                                                            },
                                                                            tooltip: {
                                                                                enabled: true,
                                                                            },
                                                                        },
                                                                    }}
                                                                    series={[item.data]}
                                                                    style={{ width: '100%' }}
                                                                    type="candlestick"
                                                                    height="700"
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="w-full xl:w-4/12 px-4">
                                    {prices.map((item, index) => {
                                        return (
                                            <Card
                                                key={index}
                                                shadow="lg"
                                                className="border-1 border-black rounded-md shadow-lg mb-4"
                                            >
                                                <CardBody className="overflow-visible p-0 border-black">
                                                    <div className="flex justify-between p-4">
                                                        <h6 className="text-black-500 font-bold">{item.title}</h6>
                                                        <h6 className={`
                                                        ${item.title === "High Price" ? "text-red-500 font-bold" : "text-black-500 font-bold"}
                                                        ${item.title === "Low Price" ? "text-blue-500 font-bold" : "text-black-500 font-bold"}
                                                        `}>
                                                            {item.title === "Acc Trade Volume(24h)" ? item.data.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ETH" :
                                                            "₩"+ item.data.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                        </h6>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
};

export default BitcoinChart;