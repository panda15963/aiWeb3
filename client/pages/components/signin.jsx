import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import WalletLink from 'walletlink'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from './context/context'


const signIn = () => {
  const [web3Modal, setWeb3Modal] = useState({});
  const [account, setAccount] = useState("");
  const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
  useEffect(() => {
    if (typeof window !== "undefined") {
      const web3modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });
      setWeb3Modal(web3modal);
    }
  }, []);
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID, // required
      },
    },
  };
  const connect = async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
    setAccount("");
  };
  return (
    <div>
      <div>
        <AccountContext.Provider value={account}>
          <h3>Your account: {account}</h3>
          <button onClick={connect}>Connect</button>
          <button onClick={handleLogout}>Logout</button>
        </AccountContext.Provider>
      </div>
    </div>
  );
};

export default signIn;
