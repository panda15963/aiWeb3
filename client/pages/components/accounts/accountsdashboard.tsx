import React, { FC, ChangeEvent, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Navbar from '../navbar';
import Footer from '../Footer';
import { useUser } from '../context/UserContext';
import { ethers } from 'ethers';

const TransactionAccountPage: FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions_List, setTransactions_List] = useState<any[]>([]);
  const { user } = useUser();

  const readExcel = async (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target) return;
      const bufferArray = e.target.result;
      const fileInformation = XLSX.read(bufferArray, {
        type: 'buffer',
        cellText: false,
        cellDates: true,
      });
      const sheetName = fileInformation.SheetNames[0];
      const rawData = fileInformation.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(rawData);
      setTransactions_List(data);
    };
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    readExcel(file);
  };

  const getBalance = async () => {
    if (user) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(user);
      setBalance(Number(ethers.utils.formatEther(balance)));
    } else {
      // Display an error message within the component
      // instead of using the alert function
      console.error('Please sign in at Metamask first!');
    }
  }

  const getTransaction = async (transactionId: string) => {
    if (user) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const transaction = await provider.getTransaction(transactionId);
      const from = transaction.from;
      const to = transaction.to;
      const value = Number(ethers.utils.formatEther(transaction.value));
      // Do something with the transaction data
    } else {
      console.error('Please sign in at Metamask first!');
    }
  }

  useEffect(() => {
    getBalance();
  }, [user]);
  
  useEffect(() => {
    if (transactions_List.length > 0) {
      const transactionId = transactions_List[0].transactionId;
      getTransaction(transactionId);
    }
  }, [transactions_List, getTransaction]);

  return (
    <>
      <Navbar />
      {user ? (
        <>
          <div className="m-8 border-1 border-black rounded-md overflow-hidden shadow-lg">
            <h1 className="text-3xl font-bold text-center m-4">Account</h1>
            <hr className="border-black" />
            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 text-center'>
              <div className="border-1 border-black rounded-md overflow-hidden p-2">
                <h2 className="text-2xl font-bold">Address</h2>
                <p className="text-xl">{user.slice(0, 10)}...{user.slice(-10)}</p>
              </div>
              <div className="border-1 border-black rounded-md overflow-hidden p-2">
                <h2 className="text-2xl font-bold">Network</h2>
                <p className="text-xl">Ethereum</p>
              </div>
              <div className="border-1 border-black rounded-md overflow-hidden p-2">
                <h2 className="text-2xl font-bold">Balance</h2>
                <p className="text-xl">{balance} ETH</p>
              </div>
            </section>
            <section className='p-4 text-center"'>
              <div className="border-1 border-black rounded-md overflow-hidden text-center m-2">
                <h2 className="text-2xl font-bold">Transaction</h2>
                <div className="flex flex-col items-center justify-center my-4">
                  <input type='file' onChange={readExcel} />                  
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 my-2">
                  Submit
                </button>
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

export default TransactionAccountPage;
