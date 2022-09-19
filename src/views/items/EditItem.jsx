import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function EditItem() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [item, setItem] = useState('');
  const storedToken = localStorage.getItem('authToken');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [imageUrls, setImageUrls] = useState([]);
  const [imgForUser, setImgForUser] = useState([]);

  const options = [
    {value: 'Yes', text: 'Yes'},
    {value: 'No', text: 'No'},
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleChangeSelected = event => {
    setSelected(event.target.value);
  };

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
    const itemToSend = {
      name: item.name,
      brand: item.brand,
      newItem: selected,
      type: item.type,
      serialNumber: item.serialNumber,
      imageUrls: imageUrls
    }
    try {
      const newItem = await axios.put(`${process.env.REACT_APP_API_URL}/items/${id}`, itemToSend, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Item edited successfully')
      navigate(`/items/${newItem.data.data._id}`)
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
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
    <div className="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Edit {item.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            This information will be displayed privately only
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={item.name} 
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="brand"
                id="brand"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={item.brand} 
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type (Phone, watch, laptop...)
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="type"
                id="type"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={item.type} 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="newItem" className="block text-sm font-medium text-gray-700">
              Is a new item?
            </label>
            <div className="mt-1">
              <select
                id="newItem"
                name="newItem"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selected} onChange={handleChangeSelected}
              >{options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
                   ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
              Serial Number of item
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="serialNumber"
                id="serialNumber"
                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={item.serialNumber} 
                onChange={handleChange}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Please fill numbers and letters only. If S/N is AAA-000/AAA just fill AAA000AAA</p>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">
              Item pictures
            </label>
            <p className="mt-2 text-sm text-gray-500">Please provide item and serial number picture</p>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload pictures</span>
                    <input id="file-upload" name="imageUrls" type="file" className="sr-only"
                    onChange={(e) => handleFileUpload(e)} />                 
                  </label>
                </div>
              </div>
              <div className="space-y-1 text-center">
              {imgForUser && (
                    <div>
                      {imgForUser.map((elem, i) => {
                        return <ul key={i}>{elem}</ul>
                      })}
                    </div>
                  )}
              </div>
            </div>
            {item.imageUrls && (
                    <div>
                      {item.imageUrls.map((elem, i) => {
                        return <ul key={i}>{elem}</ul>
                      })}
                    </div>
                  )}
          </div>
        </div>
      </div>
    </div>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <div className="pt-5">
      <div className="flex justify-end">
      <button
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Edit item
        </button>
      </div>
    </div>
  </form>
  </div>
  )
}