import React, { useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useFetchData } from "../useFetchData";
import dynamic from "next/dynamic";
import { Spinner } from '@nextui-org/react';

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

type dateTime = {
    functionsName: any;
    dates: string;
    active: boolean;
}

const BitcoinChart = () => {
    const { data, loading } = useFetchData({ marketCoin: "KRW-SAND" });
    const [selectedTime, setSelectedTime] = useState<string>("hourlyData");
    const [dateActive, setDateActive] = useState<string>('1 Day');

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
                            <div className="flex justify-center">
                                {dateTime.map((item, index) => {
                                    return (
                                        <button className={`bg-white p-4 rounded shadow-lg text-center m-2 ${item.dates === dateActive ? `underline decoration-2 font-bold` : ''}`} key={index} onClick={item.functionsName}>{item.dates}</button>
                                    );
                                })}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <Card>
                                <CardBody>
                                    {displayGraphs.map((item, index) => (
                                        <div className="chart-area">
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
                                                    height="350"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
};

export default BitcoinChart;