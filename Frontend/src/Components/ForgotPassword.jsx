import axios from 'axios';
import React, { useState } from 'react';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [status, setStatus] = useState({
    loading: false,
    message: '',
    error: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear any previous messages
    setStatus({
      loading: false,
      message: '',
      error: ''
    });
  };

  const handleForgotPassword = async () => {
    // Validate email
    if (!formData.email) {
      setStatus({
        loading: false,
        error: 'Please enter your email address',
        message: ''
      });
      return;
    }

    setStatus({
      loading: true,
      message: 'Sending OTP...',
      error: ''
    });

    try {
      const response = await axios.post('http://localhost:8080/ForgotPassword', formData);
      
      setStatus({
        loading: false,
        message: response.data.message,
        error: ''
      });
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.error || 'Failed to send OTP. Please try again.',
        message: ''
      });
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      
      <div className="form-group">
        <input
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          placeholder="Enter your email"
          className="auth-input"
          disabled={status.loading}
        />
      </div>

      {status.error && (
        <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
          {status.error}
        </div>
      )}

      {status.message && (
        <div className="success-message" style={{ color: 'green', marginTop: '10px' }}>
          {status.message}
        </div>
      )}

      <button 
        onClick={handleForgotPassword} 
        className="auth-button"
        disabled={status.loading}
        style={{ marginTop: '20px' }}
      >
        {status.loading ? 'Sending...' : 'Send OTP'}
      </button>
    </div>
  );
}

export default ForgotPassword;