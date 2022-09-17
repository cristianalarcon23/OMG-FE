import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {

  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('authToken');
  const [imageUrls, setImageUrls] = useState([]);
  const [imgForUser, setImgForUser] = useState([]);
  const [itemData, setItemData] = useState({
    name: "",
    brand: "",
    type: "",
    newItem: "",
    serialNumber: "",
    imageUrls: ""
  });

  const options = [
    {value: 'Yes', text: 'Yes'},
    {value: 'No', text: 'No'},
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChangeSelected = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(e.target)
    setItemData(prev => {
      return {
        ...prev, 
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemToSend = {
      name: itemData.name,
      brand: itemData.brand,
      newItem: selected,
      type: itemData.type,
      serialNumber: itemData.serialNumber,
      imageUrls: imageUrls
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/items`, itemToSend, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Item added succesfully!');
      navigate('/items');
      setItemData(response.data.data);
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  const handleFileUpload = async(e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/items/upload`, uploadData);
      setImageUrls(prev => [...prev, response.data.fileUrl]);
      setImgForUser(prev => [...prev, e.target.files[0].name]);

    } catch (error) {
      console.error(error);
    }
  };


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
          <select value={selected} onChange={handleChangeSelected}>
            {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
             ))}
          </select>
          </label>
          <label>Serial Number</label>
          <input required type="text" name="serialNumber" value={itemData.serialNumber} onChange={handleChange} />
          <label>Item Pictures</label>
          <input required type="file" name="imageUrls" onChange={(e) => handleFileUpload(e)} />
          {imgForUser && (
          <ul>
            {imgForUser.map((elem, i) => {
              return <li key={i}>{elem}</li>
            })}
          </ul>
        )}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Add item</button>
        </form>
      </div>
  )
}
