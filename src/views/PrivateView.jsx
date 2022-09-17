import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Privateview() {
  const [user, setUser] = useState({
    username: '',
    telephone: ''
  })
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
    console.log(user)
  }

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input required type="text" name="username" value={user.username} onChange={handleChange} />
        <label>Password</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        <label>Repeat the password</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        <label>Telephone</label>
        <input required type="text" name="telephone" value={user.telephone} onChange={handleChange} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Edit profile</button>
      </form>
    </div>
  )
}
