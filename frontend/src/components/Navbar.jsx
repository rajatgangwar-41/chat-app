import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className='navbar-container'>
        <div className="navbar-row">
            <Link to="/"><h1 className="logo">Rajat Gangwar</h1></Link>
        </div>
        <div className="navbar-row">
            <NavLink to="/login" activeclassname="active">Login</NavLink>
            <NavLink to="/chat" activeclassname="active">Chat</NavLink>  
        </div>
    </div>
  )
}

export default Navbar
