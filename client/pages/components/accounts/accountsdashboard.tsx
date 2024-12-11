import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navbar from '../navbar';
import Footer from '../Footer';
import { useUser } from '../context/UserContext';
import { usePrice } from '../context/PriceContext';

export default function TransactionAccountPage() {
  const [balance, setBalance] = useState<number>(0);
  const [KRWbalance, setKRWbalance] = useState<number>(0);
  const { user } = useUser();
  const { EthereumPrice } = usePrice();

  const getBalance = async () => {
    if (!user) {
      console.error('Please sign in at Metamask first!');
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(user);
      const ETHBalance = Number(ethers.utils.formatEther(balance));
      const KRWBalance = EthereumPrice ? ETHBalance * (EthereumPrice as number) : 0;
      setKRWbalance(KRWBalance);
      setBalance(ETHBalance);
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  }

  useEffect(() => {
    getBalance();
  }, [user]);

  return (
    <>
      <Navbar />
      {user ? (
        <>
          <div className="m-8 border-1 border-black rounded-md overflow-hidden shadow-lg">
            <h1 className="text-3xl font-bold text-center m-4">Account</h1>
            <hr className="border-black" />
            <section className="flex flex-col gap-4 p-6 text-center">
              <div className="border-1 border-black rounded-md overflow-hidden p-2">
                <h2 className="text-2xl font-bold">Address</h2>
                <p className="text-xl">{user}</p>
              </div>
              <div className="border-1 border-black rounded-md overflow-hidden p-2">
                <h2 className="text-2xl font-bold">Network</h2>
                <p className="text-xl">Ethereum</p>
              </div>
              <div className="border-1 border-black rounded-md overflow-hidden p-2">
                <h2 className="text-2xl font-bold">Balance</h2>
                <p className="text-xl">{Math.round(balance * 1000) / 1000} ETH(\{Math.round(KRWbalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})</p>
              </div>
            </section>
          </div >
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold">You are not connected to a wallet</h1>
          <p className="text-xl">Please connect to a wallet to view your account</p>
        </div>
      )}
      <Footer />
    </>
  );
};