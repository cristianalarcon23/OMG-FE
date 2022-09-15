import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Transactions() {
    const [transactionsSent, setTransactionsSent] = useState(null);
    const [transactionsReceived, setTransactionsReceived] = useState(null);
    const storedToken = localStorage.getItem('authToken');
    const { isLoggedIn, user } = useContext(AuthContext);

    useEffect(()=>{
      const getData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`, { headers: { Authorization: `Bearer ${storedToken}` } });
          let arrSent = response.data.data.filter(elem => elem.sellerId.email === user.email);
          let arrReceived = response.data.data.filter(elem => elem.buyerId.email === user.email);
          setTransactionsSent(arrSent);
          setTransactionsReceived(arrReceived);
        } catch (error) {
        }
      }
      getData()
      // eslint-disable-next-line
    },[]);


    return (
        <>
                {isLoggedIn && <li><Link className={(element) => element.isActive ? 'selected' : ''} to="/transactions/receive">Receive item with token</Link></li>}
        <div>
            <h1>Sent items</h1>
        <div>
            {transactionsSent && transactionsSent.map(transaction => {
            return <div key={transaction._id}><p><Link to={`/items/${transaction.itemId._id}`}>{transaction.itemId.name}</Link></p><p>{transaction.buyerId.fullName}</p><p>{transaction.sellerId.fullName}</p></div>
            })}
        </div>
        </div>
        <div>
            <h1>Received items</h1>
        <div>
            {transactionsReceived && transactionsReceived.map(transaction => {
            return <div key={transaction._id}><p><Link to={`/items/${transaction.itemId._id}`}>{transaction.itemId.name}</Link></p><p>{transaction.buyerId.fullName}</p><p>{transaction.sellerId.fullName}</p></div>
            })}
        </div>
        </div>

      </>
    )
}
