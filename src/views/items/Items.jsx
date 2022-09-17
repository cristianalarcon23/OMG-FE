import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Items() {
    const [items, setItems] = useState(null);
    const storedToken = localStorage.getItem('authToken');


    useEffect(()=>{
      const getData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/items`, { headers: { Authorization: `Bearer ${storedToken}` } });
          setItems(response.data.data);
        } catch (error) {
        }
      }
      getData()
      // eslint-disable-next-line
    },[])
    return (
        <>
        <h1>Items</h1>
      <li><Link to="/items/add">Add a new item</Link></li>
      <div>
        {items && items.map(item => {
         return <div key={item._id}><p><Link to={`${item._id}`}>{item.name}</Link></p></div>
        })}
      </div>
      </>
    )
  }
