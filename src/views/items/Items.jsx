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
      <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">My items</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items &&items.map((item) => (
            <Link key={item._id} to={`${item._id}`} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={item.imageUrls[0]}
                  alt={item.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-m text-gray-700">{item.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
      </>
    )
  }
