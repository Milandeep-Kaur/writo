import React from 'react';
import './Login.css';
import login from './login.png';
import writo from './writo.png';

const Login = ({ onToggle }) => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="left-section">
          <img src={writo} alt="Writo" className="writo-img" />
          <h1>Writo Education</h1>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="signup-text">
            Don't have an account? <a href="#" onClick={onToggle} className="signup-link">Sign Up</a>
          </p>
        </div>
        <div className="right-section">
          <img src={login} alt="Login illustration" className="login-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
