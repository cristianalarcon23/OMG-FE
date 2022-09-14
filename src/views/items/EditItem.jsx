import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function EditItem() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [item, setItem] = useState(null);
  const storedToken = localStorage.getItem('authToken');
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const item = await axios.get(`${process.env.REACT_APP_API_URL}/items/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
        setItem(item.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
    // eslint-disable-next-line
  }, [id])

  const handleChange = (e) => {
    setItem(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = await axios.put(`${process.env.REACT_APP_API_URL}/items/${id}`, item, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Item edited successfully')
      navigate(`/items/${newItem.data.data._id}`)
    } catch (error) {
        setErrorMessage(error.response.data.error)
    }
  }

  return (
    <div>
      <h1>Edit item</h1>
      {!item && <p>Loading</p>}
      {item && (
        <form onSubmit={handleSubmit}>
        <label>Product name</label>
        <input required type="text" name="name" value={item.name} onChange={handleChange} />
        <label>Brand</label>
        <input required type="text" name="brand" value={item.brand} onChange={handleChange} />
        <label>Type</label>
        <input required type="text" name="type" value={item.type} onChange={handleChange} />
        <label>Is a new item?
          <select name="newItem" value={item.newItem} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label>Serial Number</label>
        <input required type="text" name="serialNumber" value={item.serialNumber} onChange={handleChange} />
        <label>Item Picture</label>
        <input required type="text" name="itemPicture" value={item.itemPicture} onChange={handleChange} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Edit item</button>
      </form>
      )}
    </div>
  )
}