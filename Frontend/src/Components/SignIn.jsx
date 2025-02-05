import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function SignIn() {

  const [user, setUser] = useState({
    email:'',
    password:'',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  function handleChange (e) {
    setUser(prev => ({...prev, [e.target.name] : e.target.value}));
  }

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8080/', user)
      console.log(response.data);
      navigate('/Home')
    } catch (error) {
      setError(error.response.data);
      console.error('Error signing in', error);
    }
  }

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <input
        type="email"
        value={user.email}
        onChange={handleChange}
        name='email'
        placeholder="Email"
        className="auth-input"
      />
      <input
        type="password"
        value={user.password}
        onChange={handleChange}
        name='password'
        placeholder="Password"
        className="auth-input"
      />
      <button onClick={handleSignIn} className="auth-button">Sign In</button>
      <div>
      {error && <p>{error}</p>}
      </div>
      <p> <Link to={'/ForgotPassword'}>Forgot password?</Link></p>
      <p>Don't Have an Account? <Link to={'/SignUp'}>Sign Up Here</Link> </p>
    </div>
  )
}

export default SignIn