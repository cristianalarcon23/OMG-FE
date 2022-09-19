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
    <div>
      {itemDetail && 
        <div>
            <h1>Model: {itemDetail.name}</h1>
            <p>Type: {itemDetail.type}</p>
            <p>Brand: {itemDetail.brand}</p>
            <p>Serial Number: {itemDetail.serialNumber}</p>
            <p>Item picture: </p>
            {itemDetail.imageUrls.map(item => {
         return <div key={item._id}><img src={item} alt="" srcset="" /></div>
        })}
            <p>Bought new?: {itemDetail.newItem}</p>
            {itemDetail.transactionToken && <p>Transfer token: {itemDetail.transactionToken}</p>}
            {itemDetail.previousOwner && <p>Previous owner: {itemDetail.previousOwner.username}</p> }
            {alert && <p style={{ color: 'red' }}>This item has an stolen alert</p>}
            <button onClick={() => navigate(`/items/edit/${id}`)}>Edit item</button>
            <button onClick={handleDelete}>Delete item</button>
            {!alert ? <button onClick={handleAlert}>Mark item as lost</button> : <button onClick={deleteAlert}>Unmark item as lost</button>}
            {!itemDetail.transactionToken ? <button onClick={handleToken}>Generate transfer token</button> : <button onClick={deleteToken}>Delete transfer token</button>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      }
    </div>
  )
}