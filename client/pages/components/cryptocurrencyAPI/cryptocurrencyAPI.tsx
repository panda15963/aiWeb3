import React, { FC, useState, createElement } from "react";
import BitcoinData from "./cryptocurrencyChart/BitcoinChart";
import EthereumData from "./cryptocurrencyChart/EthereumChart";
import BitcoinCashData from "./cryptocurrencyChart/BitcoinCashChart";
import { Spinner } from '@nextui-org/react';

const CHART_COMPONENTS = {
  Bitcoin: BitcoinData,
  Ethereum: EthereumData,
  BitcoinCash: BitcoinCashData,
};

const CryptocurrencyAPI : FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("Bitcoin");
  return (
    <div className="container mx-auto p-4">
      <section className="my-8 border-1 border-black rounded-md overflow-hidden shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center py-1">Stocks</h2>
        <hr className="border-black" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {Object.entries(CHART_COMPONENTS).map(([currency]) => (
            <button
              onClick={() => setSelectedCurrency(currency)}
              className="bg-white p-4 rounded shadow-xl text-center border-1 border-black hover:bg-gray-100 transition-all cursor-pointer"
              key={currency}
            >
              <h6 className="text-lg font-bold">
                {currency}
              </h6>
            </button>
          ))}
        </div>
      </section>
      <section className="my-8 border-1 border-black rounded-md overflow-hidden shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center py-1">Charts</h2>
        <hr className="border-black" />
        <div className="bg-white p-4 shadow-xl">
          <h1 className="text-xl font-bold text-center py-2">{selectedCurrency}</h1>
          {selectedCurrency && CHART_COMPONENTS[selectedCurrency as keyof typeof CHART_COMPONENTS] ? (
            createElement(CHART_COMPONENTS[selectedCurrency as keyof typeof CHART_COMPONENTS])
          ) : (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CryptocurrencyAPI;