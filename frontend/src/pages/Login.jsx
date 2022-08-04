import React from 'react'
import {Link} from 'react-router-dom'


const Login = () => {
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
