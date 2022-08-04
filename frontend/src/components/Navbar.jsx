import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../services/appApi.js';

const Navbar = () => {

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const[logoutUser] = useLogoutUserMutation();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);
    navigate('/');
  }

  return (
    <div className='navbar-container'>
        <div className="navbar-row">
            <Link to="/"><h1 className="logo">Miljan Peric</h1></Link>
        </div>
        <div className="navbar-row d-flex">
            {!user ? (<NavLink to="/login" activeclassname="active">Login</NavLink>) : (
              
              <div className="box">
                <img src={user.image} className="user-img" alt={user.name} />
                <button className='logout' onClick={handleLogout}>Logout</button>
              </div>
              
              
            )}
            
            <NavLink to="/chat" activeclassname="active">Chat</NavLink>
        </div>
    </div>
  )
}

export default Navbar
