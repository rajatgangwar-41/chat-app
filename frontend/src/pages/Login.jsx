import React, { useState } from 'react'
import { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { appContext } from '../context/appContext.js';
import { useLoginUserMutation } from '../services/appApi.js';

const Login = () => {

  const navigate = useNavigate();
  
  const {socket} = useContext(appContext);

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[loginUser, {isLoading, error}] = useLoginUserMutation();
  
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    //login user
    loginUser({email, password}).then(({data}) => {
      if(data) {
        console.log(data);

        socket.emit("new-user");

        navigate("/chat");
      }
    })
  }

  return (
    <div className='login-container'>
      <div className="login-row">
        <div className="login-col">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-groups">
              <label htmlFor="email">Email</label>
              <input type="email" id='email' autoComplete='off' onChange={(e) => setEmail(e.target.value)} value={email} required />
            </div>
            <div className="form-groups">
              <label htmlFor="password">Password</label>
              <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} value={password} autoComplete='off' required/>
            </div>
            <div className="form-groups button">
              <button>Login</button>
            </div>
            <div className="form-groups">
              <p>Don't have an Account? <Link to="/register"> Register</Link> </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
