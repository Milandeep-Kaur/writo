import React from 'react';
import './Signup.css';
import signup from './signup.png';

const Signup = ({ onToggle }) => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="left-section">
          <h1>Sign Up</h1>
          <form className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Choose a username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder="Confirm your password" required />
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="login-text">
            Already have an account? <a href="#" onClick={onToggle} className="login-link">Login</a>
          </p>
        </div>
        <div className="right-section">
          <img src={signup} alt="Signup illustration" className="signup-image" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
