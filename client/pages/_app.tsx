import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  network: "mainnet",
  logoUrl: "https://web3modal.com/favicon.ico",
  iconUrl: "https://web3modal.com/favicon.ico",
  faviconUrl: "https://web3modal.com/favicon.ico",
  blockExplorerUrl: "https://etherscan.io",
  testnet: false,
  rpcUrls: {
    alchemy: "https://eth-mainnet.g.alchemy.com/v2/",
    infura: "https://mainnet.infura.io/v3/",
    public: "https://cloudflare-eth.com",
  },
};
const rinkeby = {
  chainId: 4,
  name: "Rinkeby",
  currency: "ETH",
  explorerUrl: "https://rinkeby.etherscan.io",
  rpcUrl: "https://rinkeby.infura.io/v3/",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  network: "rinkeby",
  logoUrl: "https://web3modal.com/favicon.ico",
  iconUrl: "https://web3modal.com/favicon.ico",
  faviconUrl: "https://web3modal.com/favicon.ico",
  blockExplorerUrl: "https://rinkeby.etherscan.io",
  testnet: true,
  rpcUrls: {
    alchemy: "https://eth-rinkeby.alchemyapi.io/v2/",
    infura: "https://rinkeby.infura.io/v3/",
    public: "https://rinkeby.infura.io/v3/",
  },
};
const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal and Ethers.js",
  logoUrl: "https://web3modal.com/favicon.ico",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
const ethersConfig = defaultConfig({ metadata });

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  );
}
