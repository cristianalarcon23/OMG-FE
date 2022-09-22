import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function ItemDetail() {

  const [itemDetail, setItemDetail] = useState();
  const [alert, setAlert] = useState(false);
  const { id } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/items/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
      setItemDetail(response.data.data);
      console.log(response.data.data)
      const alert = await axios.get(`${process.env.REACT_APP_API_URL}/alerts`, { headers: { Authorization: `Bearer ${storedToken}` } });
      if (alert) {
        setAlert(true);
      }
    } catch (error) {
        setErrorMessage(error.response.data.error)
    }
  }
  getData();
  // eslint-disable-next-line
}, [id]);

const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/items/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.error('Item deleted successfully')
      navigate('/items');
    } catch (error) {
        setErrorMessage(error.response.data.error)
    }
  }

  const handleAlert = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/alerts/${id}`,{}, { headers: { Authorization: `Bearer ${storedToken}` } });
      setAlert(true);
      toast.error('Your item is marked as LOST/STOLEN');
    } catch (error) {
        setErrorMessage(error.response.data.error)
    }
  }

  const deleteAlert = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/alerts/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
      setAlert(false);
      toast.success('Stolen alert deleted');
    } catch (error) {
        setErrorMessage(error.response.data.error)
    }
  }

  const handleToken = async () => {
    try {
      const itemTokened = await axios.post(`${process.env.REACT_APP_API_URL}/transactions/transfer/${id}`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Token generated');
      setItemDetail(itemTokened.data.data);
    } catch (error) {
        setErrorMessage(error.response.data.error)
    }
  }

  const deleteToken = async () => {
    try {
      const itemUnTokened = await axios.post(`${process.env.REACT_APP_API_URL}/transactions/deletetoken/${id}`, {}, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.error('Token deleted');
      setItemDetail(itemUnTokened.data.data);
    } catch (error) {
        setErrorMessage(error.response.data.error)
    }
  }

  return (
    <>
          <img
      className="mx-auto h-24 w-auto"
      src='https://res.cloudinary.com/do1ugcmht/image/upload/v1663593797/logo-black_fma6cl.png'
      alt="Your Company"
    />
     {itemDetail && <div className="px-4 sm:px-6 lg:px-8">
     <div className="mt-20 flex flex-col">
       <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
         <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
           <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
           {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
             <table className="min-w-full divide-y divide-gray-300">
               <thead className="bg-gray-50">
                 <tr className="divide-x divide-gray-200">
                   <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                     Model
                   </th>
                   <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Brand
                   </th>
                   <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Type
                   </th>
                   <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                     Serial Number
                   </th>
                   <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                     Stolen alert
                   </th>
                   <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                     Transfer token
                   </th>
                   <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                     Warranty?
                   </th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 bg-white">
               {itemDetail &&<tr className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                       {itemDetail.name}
                     </td>
                     <td className="whitespace-nowrap p-4 text-sm text-gray-500">{itemDetail.brand}</td>
                     <td className="whitespace-nowrap p-4 text-sm text-gray-500">{itemDetail.type}</td>
                     <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{itemDetail.serialNumber}</td>
                     <td className="whitespace-nowrap p-4 text-sm text-gray-500">{alert ? <p style={{ color: 'red' }}>Stolen alert</p> : <p>No alerts set</p> }</td>
                     <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{itemDetail.transactionToken ? <p>{itemDetail.transactionToken}</p> : <p>No token</p> }</td>
                     <td className="whitespace-nowrap p-4 text-sm text-gray-500">{itemDetail.newItem}</td>
                   </tr>}
               </tbody>
             </table>
           </div>
           <div className="sm:flex sm:items-center ">
       <div className="sm:flex-auto ">
         <p className="mt-20 text-sm text-gray-700">  
         </p>
       </div>
       <div className="mt-20 sm:mt-0 sm:ml-16 sm:flex-none">
         <button
           type="button"
           className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
           onClick={() => navigate(`/items/edit/${id}`)}
         >
           Edit item
         </button>
       </div>
       <div className="mt-20 sm:mt-0 sm:ml-16 sm:flex-none">
         {!alert ? <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto" onClick={handleAlert}>Mark item as lost</button> : <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto" onClick={deleteAlert}>Unmark item as lost</button>}
       </div>
       <div className="mt-20 sm:mt-0 sm:ml-16 sm:flex-none">
       {!itemDetail.transactionToken ? <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto" onClick={handleToken}>Generate token</button> : <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto" onClick={deleteToken}>Delete token</button>}
       </div>
       <div className="mt-20 sm:mt-0 sm:ml-16 sm:flex-none">
         <button
           type="button"
           className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
           onClick={handleDelete}
         >
           Delete item
         </button>
       </div>
     </div>
         </div>
       </div>
     </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {itemDetail.imageUrls && itemDetail.imageUrls.map((item) => (
              <>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={item}
                  alt={item.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              </>
          ))}
        </div>
   </div>}
   </>
  )
}