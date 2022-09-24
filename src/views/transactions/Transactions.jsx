import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import TransactionRow from '../../components/TransactionRow';
import TransactionRowRec from '../../components/TransactionRowRec';
import { Link} from 'react-router-dom';

export default function Transactions() {
    const [transactionsSent, setTransactionsSent] = useState(null);
    const [transactionsReceived, setTransactionsReceived] = useState(null);
    const storedToken = localStorage.getItem('authToken');
    const { user } = useContext(AuthContext);

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
                    <img
              className="mx-auto h-24 w-auto"
              src='https://res.cloudinary.com/do1ugcmht/image/upload/v1663593797/logo-black_fma6cl.png'
              alt="Your Company"
            />
              <p className="mt-1 text-xl text-black text-center py-4">
              Sent items
              </p>
             <table className="min-w-full divide-y divide-gray-300">
               <thead className="bg-gray-50">
                 <tr className="divide-x divide-gray-200">
                   <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                     Model
                   </th>
                   <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Buyer
                   </th>
                   <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Serial Number
                   </th>
                   <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Warranty?
                   </th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 bg-white">
               {transactionsSent && transactionsSent.map(transaction => {
                return (<TransactionRow key={transaction._id} item={transaction.itemId.name} buyer={transaction.buyerId.fullName} warranty={transaction.itemId.newItem} serialNumber={transaction.itemId.serialNumber}/>)
              })}
               </tbody>
             </table>
             <p className="mt-1 text-xl text-black text-center py-4">
              Received items
              </p>
             <table className="min-w-full divide-y divide-gray-300">
               <thead className="bg-gray-50">
                 <tr className="divide-x divide-gray-200">
                   <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                     Model
                   </th>
                   <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Seller
                   </th>
                   <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Serial Number
                   </th>
                   <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Warranty?
                   </th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 bg-white">
               {transactionsReceived && transactionsReceived.map(transaction => {
                return (<TransactionRowRec key={transaction._id} item={transaction.itemId.name} seller={transaction.sellerId.fullName} warranty={transaction.itemId.newItem} serialNumber={transaction.itemId.serialNumber} id={transaction.itemId._id}/>)
              })}
               </tbody>
             </table>
              <div className="sm:flex-center flex flex-center">
              <p className="mt-20 text-sm text-gray-700 content-center">  
              </p>
            </div>
          <div className="my-20 flex flex-center sm:mt-0 sm:ml-16 sm:flex-none content-center">
            <Link
            to={'/transactions/receive'}
           type="Link"
           className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
         >
           Receive item with token
         </Link>
       </div>
             </>
    )
}
