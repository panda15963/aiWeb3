// Interface for UserContextProps
import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

interface PriceContextPropsInterface {
    BitcoinCashPrice: Number | null;
    EthereumPrice: Number | null;
    BitcoinPrice: Number | null;
    setBitcoinCash: (price: Number) => void;
    setEthereum: (price: Number) => void;
    setBitcoin: (price: Number) => void;
}

// Create a context called UserContext with UserContextProps as its type
const PriceContext = createContext<PriceContextPropsInterface>({
    BitcoinCashPrice: null,
    EthereumPrice: null,
    BitcoinPrice: null,
    setBitcoinCash: () => null,
    setEthereum: () => null,
    setBitcoin: () => null,
});

// Custom hook to use UserContext
export const usePrice = () => useContext(PriceContext);

// UserProvider component
// This component uses the useState hook to manage the user state
// and provides the user, login, and logout functions as values for the UserContext
export const PriceProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [BitcoinCashPrice, setBitcoinCashPrice] = useState<Number | null>(null);
    const [EthereumPrice, setEthereumPrice] = useState<Number | null>(null);
    const [BitcoinPrice, setBitcoinPrice] = useState<Number | null>(null);
    return (
        <PriceContext.Provider value={{ BitcoinCashPrice, EthereumPrice, BitcoinPrice, setBitcoinCash: setBitcoinCashPrice, setEthereum: setEthereumPrice, setBitcoin: setBitcoinPrice }}>
            {children}
        </PriceContext.Provider>
    );        
};

export default PriceProvider;