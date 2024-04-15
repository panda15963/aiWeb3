import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Navbar from '../navbar';
import Footer from '../Footer';
async function getTransactions(address: string): Promise<any[]> {
  const apiKey = '2QFYWXXW8E9JYG8Q64H5F1IF3NCM1KQNNC'; // Etherscan API 키
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.status === '1') {
          const transactions = data.result;
          return transactions;
      } else {
          console.error('Failed to fetch transactions:', data.message);
          return [];
      }
  } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
  }
}

const TransactionAccountPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTransactionHistory = async () => {
    try {
      // Get the user's Ethereum address from MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const transactions = await getTransactions(address);
      console.log('transactions:', transactions);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Transaction Account Page</h1>
        {loading ? (
          <p>Loading transaction history...</p>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            <ul className="list-disc pl-6">
            </ul>
          </div>
        )}
        {/* Add UI elements for transaction functionality */}
        {/* For example: */}
        {/* Input fields for recipient address and amount */}
        {/* Button to send transaction */}
      </div>
      <Footer />
    </>
  );
};

export default TransactionAccountPage;
