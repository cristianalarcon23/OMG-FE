import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      {user && <p>Hello {user.username}</p> }
      <ul>
        <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/">Home</NavLink></li>
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/search">Search</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/items">Items</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/transactions">Transactions</NavLink></li>}
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/private">My profile</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
        <li><button onClick={() => navigate(-1)}>Go back</button></li>
      </ul>
    </div>
  )
}
