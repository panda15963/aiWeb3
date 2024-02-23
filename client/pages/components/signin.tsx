import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import { ethers } from 'ethers';

const SignIn = () => {
  const [account, setAccount] = useState('');
  const [web3Modal, setWeb3Modal] = useState(null);
  const [balance, setBalance] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <>
      <w3m-account-button />
      <w3m-network-button />
    </>
  );
};

export default SignIn;
