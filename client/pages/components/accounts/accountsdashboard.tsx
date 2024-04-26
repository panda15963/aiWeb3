import React, { FC, useEffect, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../Footer';
import { useUser } from '../context/UserContext';
import { ethers } from 'ethers';

const TransactionAccountPage: FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transaction, setTransaction] = useState<boolean>(false);
  const { user } = useUser();
  const getBalance = async () => {
    if (user) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(user);
      setBalance(Number(ethers.utils.formatEther(balance)));
      console.log(balance);
    }
  }
  const getTransaction = async () => {
    if (user) {
      const transactions_List = ["0xcf73411dde5a855ca2e37d16578a25bdc3cd7717cf5d43b55ad1770488f9c6ca"];
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const transaction = await provider.getTransaction(transactions_List[0]);
      const from = transaction.from;
      const to = transaction.to;
      const value = Number(ethers.utils.formatEther(transaction.value));
      console.log(from, to, value);
    }
  }
  useEffect(() => {
    getBalance();
    getTransaction();
  }, [user]);


  return (
    <>
      <Navbar />
      {user ? (
        <>
          <div className="container mx-auto">
            <section className="my-8 border-1 border-black rounded-md overflow-hidden shadow-lg text-center px-5">
              <h1 className="text-3xl font-bold">Account</h1>
              <div className="flex flex-col items-center justify-center">
                <p className="text-xl">Address: {user}</p>
                <p className="text-xl">Balance: {balance}</p>
                <p className="text-xl">Transaction: {transaction ? "Success" : "Fail"}</p>
              </div>
            </section>
          </div>
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

export default TransactionAccountPage;
