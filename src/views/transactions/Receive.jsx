import React, {useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Receive() {

  const [search, setSearch] = useState({  
    token: '',
    email: ''
  });
  const storedToken = localStorage.getItem('authToken');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSearch(prev => {
      return {
        ...prev, 
        [name]: value,
      }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/transactions/receive`, search, { headers: { Authorization: `Bearer ${storedToken}` } });
      if (response) {
        toast.success('Transaction completed successfully!');
        navigate('/items');
      }
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (

    <>

        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-24 w-auto"
              src='https://res.cloudinary.com/do1ugcmht/image/upload/v1663593797/logo-black_fma6cl.png'
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Transfer item with token</h2>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                    Token
                  </label>
                  <div className="mt-1">
                    <input
                      type="text" name='token' onChange={handleChange} value={search.token} 
                      placeholder="123456"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email" name='email' onChange={handleChange} value={search.email} 
                      placeholder="hello@ohmygoods.es"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Transfer item!
                  </button>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </>

  )
}
