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
};
const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal and Ethers.js",
  logoUrl: "https://web3modal.com/favicon.ico",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
const ethersConfig = defaultConfig({ metadata });
createWeb3Modal({
  ethersConfig: ethersConfig,
  chains: [mainnet],
  projectId: projectId || "", // Provide a default value for projectId
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});
export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
      ) : null}
    </>
  );
}
