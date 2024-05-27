import React, { ChangeEvent, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Papa from 'papaparse';
import axios from 'axios';
import Navbar from '../navbar';
import Footer from '../Footer';
import { useUser } from '../context/UserContext';
import { usePrice } from '../context/PriceContext';

export default function TransactionAccountPage() {
  const [csvData, setCSVData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [KRWbalance, setKRWbalance] = useState<number>(0);
  const { user } = useUser();
  const { EthereumPrice } = usePrice();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const fileName = file?.name.split('.csv')[0].split('export-')[1];
    if (!file) return; // add null check
    if (fileName !== user) {
      setCSVData([]);
      setErrorMessage('File name does not match your address.');
      return;
    }
    Papa.parse(file as File, { // Add type assertion to ensure file is not null
      complete: (result: any) => {
        setCSVData(result.data);
        setErrorMessage('');
      },
      error: (error: any) => {
        setCSVData([]);
        setErrorMessage('Error parsing CSV file.');
        console.error('Error parsing CSV file:', error);
      }
    });
  };

  const handleSubmit = async () => {
    const txn = {
      txnHash: csvData[1][0],
      from: csvData[1][5],
      to: csvData[1][7],
      value: csvData[1][9],
      fee: csvData[1][10],
      date: csvData[1][4],
    };
    console.log(txn)
    try {
      const response = await axios.post('http://localhost:8000/api/transactions', {
        user: user,
        txnHash: txn.txnHash,
        from: txn.from,
        to: txn.to,
        value: txn.value,
        fee: txn.fee,
        date: txn.date,        
      });
      console.log(response);
    } catch (error) {
      console.error('Error submitting transactions:', error);
      setErrorMessage('Error submitting transactions. Please try again later.');
    }
  }

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
            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 text-center'>
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
                <p className="text-xl">{Math.round(balance * 1000) / 1000} ETH(\{Math.round(KRWbalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})</p>
              </div>
            </section>
            <section className='p-4 text-center"'>
              <div className="border-1 border-black rounded-md overflow-hidden text-center m-2">
                <h2 className="text-2xl font-bold">Transaction</h2>
                <div className="flex flex-col items-center justify-center my-4">
                  <input
                    type="file"
                    accept="all"
                    onChange={handleFileChange}
                    className="border-1 border-black rounded-md p-2"
                  />
                  {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                  {csvData.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold mb-2">CSV Data:</h3>
                      <div className='border rounded-lg overflow-hidden'>
                        <table className="border-collapse w-full">
                          <tbody>
                            {csvData.map((col, i) => (
                              col.some((item: string) => item.trim() !== '') && (
                                <tr key={i} className={`border border-black ${i === 0 ? 'bg-black text-white font-bold' : ''}`}>
                                  {col.map((cell: string, j: number) => (
                                    [5, 7].includes(j) && ( // Include only columns 0, 5, and 7
                                      <td key={`${i}-${j}`} className="border border-black p-2">
                                        {j === 5 || j === 7 ? (cell.length > 10 ? `${cell.slice(0, 10)}...` : cell) : cell}
                                      </td>
                                    )
                                  ))}
                                  <td key={`${i}-4`} className="border border-black p-2">{col[4]}</td> {/* DateTime */}
                                  <td key={`${i}-9`} className="border border-black p-2">{col[9]}</td> {/* Value */}
                                  <td key={`${i}-10`} className="border border-black p-2">{col[10]}</td> {/* Txn Fee */}
                                </tr>
                              )))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded hover: cursor-pointer justify-center item-center m-4"
                > Submit </button>
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