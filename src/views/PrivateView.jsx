import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Privateview() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const user = await axios.get(`${process.env.REACT_APP_API_URL}/auth/getuser`, { headers: { Authorization: `Bearer ${storedToken}` } });
        setUser(user.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
    // eslint-disable-next-line
  }, [passwordControl])

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/auth/user`, { username: user.username, password, telephone: user.telephone }, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('User updated successfully');
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <>

      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://pic.onlinewebfonts.com/svg/img_542832.png"
            alt="Oh my goods logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Edit your profile</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={user.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Repeat the password
                </label>
                <div className="mt-1">
                  <input
                    id="passwordControl"
                    name="passwordControl"
                    type="password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={passwordControl}
                    onChange={(e) => setPasswordControl(e.target.value) }
                  />
                </div>
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Telephone
                </label>
                <div className="mt-1">
                  <input
                    id="telephone"
                    name="telephone"
                    type="text"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={user.telephone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save changes
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
