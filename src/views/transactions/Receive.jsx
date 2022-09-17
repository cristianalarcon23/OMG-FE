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
    <div>
      <h1>Please insert the token and owner's email:</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Token</label>
          <input type="text" name='token' onChange={handleChange} value={search.token} />
          <label>Email</label>
          <input type="text" name='email' onChange={handleChange} value={search.email} />
          <button type='submit'>Transfer item</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </div>
    </div>

  )
}
