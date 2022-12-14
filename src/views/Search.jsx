import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function Search() {

  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState(false);
  const [search, setSearch] = useState({  
    serialNumber: ''
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const storedToken = localStorage.getItem('authToken');

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSearch(prev => {
      return {
        ...prev, 
        [name]: value,
      }
    })
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/items/search`, search, { headers: { Authorization: `Bearer ${storedToken}` } });
      const alert = await axios.get(`${process.env.REACT_APP_API_URL}/alerts/${response.data.data._id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
      if (alert.data.data !== null) {
        toast.error('Owner marked this item as stolen')
        setResult(response.data.data);
        setAlert(true);
      } else {
        setResult(response.data.data);  
      }  
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setResult(null);
    }
  }

  return (
    <>
          <img
      className="mx-auto h-24 w-auto"
      src='https://res.cloudinary.com/do1ugcmht/image/upload/v1663593797/logo-black_fma6cl.png'
      alt="Oh my goods logo"
    />
<div className="bg-white py-4 mb-20 sm:py-4">
<div className="relative sm:py-16">
  <div aria-hidden="true" className="hidden sm:block">
    <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-50" />
    <svg className="absolute top-8 left-1/2 -ml-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
      <defs>
        <pattern
          id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
          x={0}
          y={0}
          width={20}
          height={20}
          patternUnits="userSpaceOnUse"
        >
          <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
        </pattern>
      </defs>
      <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
    </svg>
  </div>
  <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
    <div className="relative overflow-hidden rounded-2xl bg-indigo-600 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
      <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1463 360"
        >
          <path
            className="text-indigo-500 text-opacity-40"
            fill="currentColor"
            d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
          />
          <path
            className="text-indigo-700 text-opacity-40"
            fill="currentColor"
            d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
          />
        </svg>
      </div>
      <div className="relative">
        <div className="sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Please type a S/N to look for:
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
          Reminder! Search only allows alphanumeric values, no special characters allowed
                </p>
        </div>
        <form onSubmit={handleSearch} className="mt-12 sm:mx-auto sm:flex sm:max-w-lg">
          <div className="min-w-0 flex-1">
            <label className="sr-only">
              Serial Number
            </label>
            <input
              type="text"
              name='serialNumber'
              onChange={handleChange} 
              value={search.serialNumber}
              className="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              placeholder="Enter S/N"
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-3">
            <button
              type="submit" 
              className="block w-full rounded-md border border-transparent bg-indigo-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
      {errorMessage && !result && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      {result === false ? <p>No results</p> : result ? 
      <div className="overflow-hidden shadow py-4 ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                     Warranty?
                   </th>
                   <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                     Owner
                   </th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 bg-white">
               {result &&<tr className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">{result.name}</td>
                     <td className="whitespace-nowrap p-4 text-sm text-gray-500">{result.brand}</td>
                     <td className="whitespace-nowrap p-4 text-sm text-gray-500">{result.type}</td>
                     <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{result.serialNumber}</td>
                     <td className="whitespace-nowrap p-4 text-sm text-gray-500">{alert ? <p style={{ color: 'red' }}>Stolen alert</p> : <p>No alerts set</p> }</td>
                     <td className="whitespace-nowrap p-4 text-sm text-gray-500">{result.newItem}</td>
                     <td className="whitespace-nowrap p-4 text-sm text-gray-500">{result.owner.username}</td>
                   </tr>}
               </tbody>
             </table>
           </div> : ''}
</div>
</>
  )
}
