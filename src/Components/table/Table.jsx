import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Gragh from '../gragh/Gragh';

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get('http://localhost:5000/customers');
        const transactionsResponse = await axios.get('http://localhost:5000/transactions');
        
        const mergedData = transactionsResponse.data.map(transaction => {
          const customer = customersResponse.data.find(c => c.id === transaction.customer_id);
          return {
            ...transaction,
            name: customer ? customer.name : 'Unknown',
          };
        });

        setData(mergedData);
        setFilteredData(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(row => {
      return (
        row.name.toLowerCase().includes(filterText.toLowerCase()) &&
        (filterAmount === '' || row.amount.toString().includes(filterAmount))
      );
    });
    setFilteredData(filtered);
  }, [filterText, filterAmount, data]);

  const columns = [
    {
      name: 'customer_id',
      selector: row => row.customer_id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true,
    },
  ];

  const handleRowClicked = row => {
    setSelectedCustomerId(row.customer_id);
  };

  return (
    <div className="users">
      <div className="container mb-5 mt-5">
        <div className="search row justify-content-center text-end">
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control w-100 mb-4 m-auto"
              placeholder="Search By Name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className="col-sm-5">
            <input
              type="text"
              className="form-control w-100 mb-4 m-auto"
              placeholder="Search By Amount"
              value={filterAmount}
              onChange={(e) => setFilterAmount(e.target.value)}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          onRowClicked={handleRowClicked}
          selectableRows
          fixedHeader
          pagination
        />
      </div>
      <div className="transaction-chart">
        {selectedCustomerId && (
          <Gragh customerId={selectedCustomerId} />
        )}
      </div>
    </div>
  );
};

export default Table;
