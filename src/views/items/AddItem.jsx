import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {

  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('authToken');

  const [itemData, setItemData] = useState({
    name: "",
    brand: "",
    type: "",
    newItem: "",
    serialNumber: "",
    itemPicture: ""
  });


  const handleChange = (e) => {
    const {name, value} = e.target;
    setItemData(prev => {
      return {
        ...prev, 
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/items`, itemData, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Item added succesfully!');
      navigate('/items');
      setItemData(response.data.data);
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }



  return (
        <div>
        <form onSubmit={handleSubmit}>
          <label>Product name</label>
          <input required type="text" name="name" value={itemData.name} onChange={handleChange} />
          <label>Brand</label>
          <input required type="text" name="brand" value={itemData.brand} onChange={handleChange} />
          <label>Type</label>
          <input required type="text" name="type" value={itemData.type} onChange={handleChange} />
          <label>Is a new item?
            <select name="secondHand" value={itemData.newItem} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>Serial Number</label>
          <input required type="text" name="serialNumber" value={itemData.serialNumber} onChange={handleChange} />
          <label>Item Picture</label>
          <input required type="text" name="itemPicture" value={itemData.itemPicture} onChange={handleChange} />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Add item</button>
        </form>
      </div>
  )
}
