import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navbar from '../navbar';
import Footer from '../Footer';

const Balance = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAddressBalance = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balanceWei = await provider.getBalance(address);
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setBalance(balanceEth);
        // Get transaction history
        const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc`);
        const data = await response.json();
        if (data.status === '1') {
          setTransactions(data.result);
        } else {
          console.error('Failed to fetch transaction history:', data.message);
        }
        console.log(response)
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving balance:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  useEffect(() => {
    getAddressBalance();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Your Ethereum Balance</h2>
      {loading ? <p>Loading balance...</p> : <p className="text-xl">{balance} ETH</p>}
      <h2 className="text-lg font-semibold mt-4 mb-2">Transaction History</h2>
      {loading ? (
        <p>Loading transaction history...</p>
      ) : (
        <ul className="list-disc pl-6">
          {transactions.map((tx: any, index: number) => (
            <li key={index}>
              <p>From: {tx.from}</p>
              <p>To: {tx.to}</p>
              <p>Amount: {ethers.utils.formatEther(tx.value)} ETH</p>
            </li>
          ))}
        </ul>
      )}
    </div>
      <Footer />
    </>
  );
};

export default Balance;
