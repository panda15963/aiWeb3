import React, { useState } from "react";
import { Spinner } from '@nextui-org/react';
import { useFetchData } from "../useFetchData";

const EthereumDashBoard = () => {
    const { data, loading } = useFetchData({ marketCoin: "KRW-ETH" });
    console.log(data)
    if (loading) return <p className="text-center"><Spinner className="px-2" />Loading...</p>
    return (
        <>
            <h1 className="text-xl font-bold text-center py-2">Ethereum Dashboard</h1>
        </>
    )
}
export default EthereumDashBoard;