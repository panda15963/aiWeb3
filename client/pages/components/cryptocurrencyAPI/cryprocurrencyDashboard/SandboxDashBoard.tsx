import React, { useState } from "react";
import { Spinner } from '@nextui-org/react';
import { useFetchData } from "../useFetchData";

const SandboxDashBoard = () => {
    const { data, loading } = useFetchData({ marketCoin: "KRW-SAND" });
    console.log(data)
    if (loading) return <p className="text-center"><Spinner className="px-2" />Loading...</p>
    return (
        <>
            <h1 className="text-xl font-bold text-center py-2">Sandbox Dashboard</h1>
        </>
    )
}
export default SandboxDashBoard;