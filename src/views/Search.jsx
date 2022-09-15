import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function Search() {

  const [result, setResult] = useState(null);
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
        toast.error('Owner marked item as stolen, bitch')
        setResult(response.data.data);
      } else {
        setResult(response.data.data);
        toast.success('Item is registered on DB!');    
      }  
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <div>
      <h1>Please type a S/N to look for it:</h1>
      <div>
        <form onSubmit={handleSearch}>
          <input type="text" name='serialNumber' onChange={handleChange} value={search.serialNumber} />
          <button type='submit'>Search S/N</button>
        </form>
      </div>
      <div>
        {!result ? <p>Your search has no result</p> : <div>
        <p>Model: {result.name}</p>
        <p>Brand: {result.brand}</p>
        <p>Type: {result.type}</p>
        <p>Owner: {result.owner.username}</p>
        </div>

        }     
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
  )
}
