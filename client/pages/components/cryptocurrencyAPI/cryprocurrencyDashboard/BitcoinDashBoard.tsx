import React, { useState } from "react";
import { Spinner } from '@nextui-org/react';
import { useFetchData } from "../useFetchData";

const BitcoinDashBoard = () => {
    const { data, loading } = useFetchData({ marketCoin: "KRW-BTC" });
    const prices = [
        {
            opening_price: data.minutesDataforDay[24].opening_price,
            closing_price: data.minutesDataforDay[24].trade_price,
            min_price: data.dayData[31].low_price,
            max_price: data.dayData[31].high_price
        }
    ]
    console.log(data)
    if (loading) return <p className="text-center"><Spinner className="px-2" />Loading...</p>
    return (
        <>
            <h1 className="text-xl font-bold text-center py-2">Bitcoin Dashboard</h1>
            {prices.map((price, index) => (
                <div key={index} className="flex justify-center">
                    <div className="bg-white p-4 rounded shadow-lg text-center m-2">
                        <p className="text-lg font-bold">Opening Price: {price.opening_price}</p>
                        <p className="text-lg font-bold">Closing Price: {price.closing_price}</p>
                        <p className="text-lg font-bold">Min Price: {price.min_price}</p>
                        <p className="text-lg font-bold">Max Price: {price.max_price}</p>
                    </div>
                </div>
            ))}
        </>
    )
}
export default BitcoinDashBoard;