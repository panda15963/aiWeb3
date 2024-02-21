import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { ethers } from 'ethers';

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
const ContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const ContractABI = [...];
const SignIn = () => {
  const [account, setAccount] = useState('');
  const [web3Modal, setWeb3Modal] = useState(null);
  const [balance, setBalance] = useState('');
  const [userName, setUserName] = useState('');
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
            appName: 'Coinbase Wallet SDK Demo',  
            infuraId: INFURA_ID,
          },
        },
      };

      const modal = new Web3Modal({
        network: 'mainnet', // optional
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
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        // Get account balance
        const balance = await web3Provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));

        // Get user's real name from the smart contract
        const contract = new ethers.Contract(ContractAddress, ContractABI, signer);
        const userName = await contract.getUserRealName(address);
        setUserName(userName);
      } catch (error) {
        console.error('Failed to connect:', error);
      }
    } else {
      console.error('Web3Modal not initialized.');
    }
  };

  const handleLogout = async () => {
    if (web3Modal) {
      await (web3Modal as any).clearCachedProvider();
      setAccount('');
      setBalance('');
      setUserName('');
    } else {
      console.error('Web3Modal not initialized.');
    }
  };

  return (
    <>
      {account ? (
        <>
          <p className='inline-flex p-3 hover:bg-sky-900 font-bold rounded text-white ml-auto hover:text-white'>Connected as {account}</p>
          <button className='inline-flex p-3 hover:bg-sky-900 font-bold rounded text-white ml-auto hover:text-white' onClick={handleLogout}>Disconnect</button>
        </>
      ) : (
        <button className='inline-flex p-3 hover:bg-sky-900 font-bold rounded text-white ml-auto hover:text-white' onClick={connect}>Connect</button>
      )}
    </>
  );
};

export default SignIn;
