import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [user, setUser] = useState({
    email: '',
    fullName: '',
    username: '',
    idNumber: '',
    telephone: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
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
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, password, fullName: user.fullName, idNumber: user.idNumber, telephone: user.telephone });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Full Name</label>
        <input required type="text" name="fullName" value={user.fullName} onChange={handleChange} />
        <label>Username</label>
        <input required type="text" name="username" value={user.username} onChange={handleChange} />
        <label>Password</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        <label>Repeat the password</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        <label>Id number</label>
        <input required type="text" name="idNumber" value={user.idNumber} onChange={handleChange} />
        <label>Telephone</label>
        <input required type="text" name="telephone" value={user.telephone} onChange={handleChange} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
