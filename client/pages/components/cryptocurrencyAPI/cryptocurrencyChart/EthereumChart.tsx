import { useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { useFetchData } from "../useFetchData";
import { Spinner } from '@nextui-org/react';
import { usePrice } from "../../context/PriceContext";

const EthereumChart = () => {
    const { data, loading } = useFetchData({ marketCoin: "KRW-ETH" });
    const { setBitcoin } = usePrice();

    useEffect(() => {
        if (data) {
            setBitcoin(data.ticker.opening_price);
        }
    }, [data, setBitcoin]);

    const prices = [
        { title: "Trade Price", data: data.ticker.trade_price },
        { title: "Opening Price", data: data.ticker.opening_price },
        { title: "High Price", data: data.ticker.high_price },
        { title: "Low Price", data: data.ticker.low_price },
        { title: "Prev Closing Price", data: data.ticker.prev_closing_price },
        { title: "Highest Price(52 weeks)", data: data.ticker.highest_52_week_price },
        { title: "Lowest Price(52 weeks)", data: data.ticker.lowest_52_week_price },
        { title: "Acc Trade Price(24h)", data: data.ticker.acc_trade_price_24h },
        { title: "Acc Trade Volume(24h)", data: data.ticker.acc_trade_volume_24h },
    ];

    if (loading) {
        return (
            <>
                <Spinner size="lg" />
                <h1 className="text-center">Loading...</h1>
            </>
        );
    } else {
        return (
            <div className="content">
                {/* Grid container with 3 rows and dynamic columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {prices.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                shadow="lg"
                                className="border border-black rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <CardBody className="p-4">
                                    <div className="flex flex-col items-start">
                                        <h6 className="text-black font-bold text-sm">{item.title}</h6>
                                        <h6 className={`
                                            ${item.title === "High Price" ? "text-red-500 font-bold" : ""}
                                            ${item.title === "Low Price" ? "text-blue-500 font-bold" : ""}
                                            ${item.title !== "High Price" && item.title !== "Low Price" ? "text-black-500 font-bold" : ""}
                                        `}>
                                            {item.title === "Acc Trade Volume(24h)"
                                                ? item.data.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " BCH"
                                                : "₩" + item.data.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h6>
                                    </div>
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>
            </div>
        );
    }
};

export default EthereumChart;