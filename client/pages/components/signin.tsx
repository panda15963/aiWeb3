import React, { useState, useEffect, use } from "react";
import Web3Modal, { providers } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";
const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
const SignIn = () => {
  const [account, setAccount] = useState("");
  const [web3Modal, setWeb3Modal] = useState(null);
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("");
  useEffect(() => {
    const initializeWeb3Modal = async () => {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: INFURA_ID,
          },
        },
        coinbasewallet: {
          package: CoinbaseWalletSDK,
          options: {
            appName: "Coinbase Wallet SDK Demo",
            infuraId: INFURA_ID,
          },
        },
      };

      const modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true,
        providerOptions: providerOptions,
      });

      setWeb3Modal(modal as any);
    };

    initializeWeb3Modal();
  }, []);

  const connect = async () => {
    if (web3Modal) {
      try {
        const provider = await (web3Modal as any).connect();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const accounts = await web3Provider.listAccounts();
        const network = await web3Provider.getNetwork();
        const balance = await web3Provider.getBalance(accounts[0]);
        if(accounts) setAccount(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
        setNetwork(network.name);
        console.log(network.name);
      } catch (error) {
        console.error("Failed to connect:", error);
      }
    } else {
      console.error("Web3Modal not initialized.");
    }
  };
  const handleLogout = async () => {
    if (web3Modal) {
      await (web3Modal as any).clearCachedProvider();
      setAccount("");
      setBalance("");
    } else {
      console.error("Web3Modal not initialized.");
    }
  };

  return (
    <>
      {account ? (
        <>
          <p className="inline-flex p-3 hover:bg-sky-900 font-bold rounded text-white ml-auto hover:text-white">
            Connected as {account}
            <br />
            Balance: {balance}
          </p>
          <button
            className="inline-flex p-3 hover:bg-sky-900 font-bold rounded text-white ml-auto hover:text-white"
            onClick={handleLogout}
          >
            Disconnect
          </button>
        </>
      ) : (
        <>
          <button
            className="inline-flex p-3 hover:bg-sky-900 font-bold rounded text-white ml-auto hover:text-white"
            onClick={connect}
          >
            Connect
          </button>
        </>
      )}
    </>
  );
};

export default SignIn;
