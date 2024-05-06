import React, { FC, useState, createElement } from "react";
import BitcoinData from "./cryptocurrencyChart/BitcoinChart";
import EthereumData from "./cryptocurrencyChart/EthereumChart";
import BitcoinCashData from "./cryptocurrencyChart/BitcoinCashChart";
import { Spinner } from '@nextui-org/react';

const CHART_COMPONENTS = {
  Ethereum: EthereumData,
  Bitcoin: BitcoinData,  
  BitcoinCash: BitcoinCashData,
};

export default function CryptocurrencyAPI(){
  const [selectedCurrency, setSelectedCurrency] = useState<string>("Ethereum");
  return (
    <div className="m-8 border-1 border-black rounded-md overflow-hidden shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-center my-4 text-4xl">Stocks & Charts</h1>
      <hr className="border-black" />
      <section className="border-1 border-black rounded-md overflow-hidden shadow-lg m-4">
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
      <section className="m-4 border-1 border-black rounded-md overflow-hidden shadow-lg">
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