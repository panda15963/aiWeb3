import React, { FC, useState, createElement } from "react";
import { useFetchData } from "./useFetchData";
import EthereumData from "./cryptocurrencyChart/EthereumChart";
import BitcoinData from "./cryptocurrencyChart/BitcoinChart";
import { Spinner } from '@nextui-org/react';

const CHART_COMPONENTS = {  
  Bitcoin: BitcoinData,
  Ethereum: EthereumData,
};

const Prices:FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("Ethereum");
  const handleShowDisplay = (cryptocurrency: string) => {
    setSelectedCurrency(cryptocurrency);
  };
  return (
    <div className="container mx-auto p-4">
      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Prices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(CHART_COMPONENTS).map(([currency]) => (
            <button
              onClick={() => handleShowDisplay(currency)}
              className="bg-white p-4 rounded shadow-xl text-left"
              key={currency}
            >
              <p className="text-lg font-bold">{currency}</p>
              <p className="text-gray-500">Price placeholder</p>
            </button>
          ))}
        </div>
      </section>
      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Charts</h2>
        <div className="bg-white p-4 rounded shadow-xl">
          <h1 className="text-xl font-bold text-center py-2">{selectedCurrency}</h1>
          {selectedCurrency && CHART_COMPONENTS[selectedCurrency as keyof typeof CHART_COMPONENTS] ? (
            createElement(CHART_COMPONENTS[selectedCurrency as keyof typeof CHART_COMPONENTS])
          ) : (
            <Spinner size="md" />
          )}
        </div>
      </section>
    </div>
  );
};

export default Prices;