import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/reset-password', {
        email,
        newPassword,
      });

      // Show success alert
      alert(response.data.message);

      // Navigate back to the login page after successful password reset
      navigate('/login', { state: { message: response.data.message } });
    } catch (error) {
      // Show error alert
      alert(error.response?.data.message || 'Error resetting password');
    }
  };

  return (
    <div className="password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handlePasswordReset}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input 
            type="password" 
            id="newPassword" 
            placeholder="Enter new password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
