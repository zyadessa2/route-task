import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Gragh = ({customerId}) => {
  const [transactionsD, setTransactionsD] = useState([]);
  const [alltransactionsD, setAllTransactionsD] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsResponse = await axios.get(`http://localhost:5000/transactions?customer_id=${customerId}`);
        const AlltransactionsResponse = await axios.get(`http://localhost:5000/transactions`);
        const transactions = transactionsResponse.data;
        const Alltransactions = AlltransactionsResponse.data;
        setTransactionsD(transactions);
        setAllTransactionsD(Alltransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [customerId]);

  // useEffect(() => {
  //   console.log('Transactions updated:', transactionsD);
  // }, [transactionsD]);

  const chartData = {
    labels: transactionsD.map((d)=> d.date),
    datasets: [
      {
        label: 'Total Transaction for the selected customer:',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: transactionsD.map((a)=> a.amount),
      },
    ],
  };
  const chartData2 = {
    labels: alltransactionsD.map((d)=> d.date),
    datasets: [
      {
        label: 'All Transictions',
        backgroundColor: 'rgba(5,22,122,1,0.4)',
        borderColor: 'rgba(5,22,122,1)',
        data: alltransactionsD.map((a)=> a.amount),
      },
    ],
  };

  return (
    <div className="chart-container container mt-5 mb-5">
      <h2 className='text-light '> Transaction </h2>
      <Line className='mb-5' data={chartData} />
      <Line data={chartData2} />
    </div>
  );
}

export default Gragh;
