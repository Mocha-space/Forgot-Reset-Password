import React, { useState } from 'react'
import axios from 'axios'
import './Auth.css';
import {Link, useNavigate} from 'react-router-dom'


function SignUp() {
  const [user, setUser] = useState({
    email:'',
    password:'',
    confirmpassword:''
  })

  const navigate = useNavigate()

  function handleChange (e) {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSignUp = async () => {

    if (user.password !== user.confirmpassword) {
      alert('Password does not match!!')
        return;
    }


    try {
      const response = await axios.post('http://localhost:8080/SignUp', user);
      console.log(response.data);
      alert('Sign up successful!')
      navigate('/')
    } catch (error) {
      console.error('Error signing up', error);
    }
  }


  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input
        type="email"
        onChange={handleChange}
        value={user.email}
        name='email'
        placeholder="Email"
        className="auth-input"
      />
      <input
        type="password"
        onChange={handleChange}
        value={user.password}
        name='password'
        placeholder="Password"
        className="auth-input"
      />
      <input
        type="password"
        onChange={handleChange}
        value={user.confirmpassword}
        name='confirmpassword'
        placeholder="Confirm Password"
        className="auth-input"
      />
      <button onClick={handleSignUp} className="auth-button">Sign Up</button>
      <p>Have an Account? <Link to={'/'}><span>Sign In Here</span></Link></p>
    </div>
  )
}

export default SignUp