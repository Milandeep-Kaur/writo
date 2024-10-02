import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';
import login from './login.png';
import writo from './writo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Import useNavigate from react-router-dom

  const handleLogin = async(event) => {
    event.preventDefault(); // Prevent the default form submission

    // Here, you would typically handle login logic, e.g., sending the email and password to an API
    console.log('Email:', email);
    console.log('Password:', password);
    try{
         const response = await axios.post("http://localhost:5000/login",{
           email,password
         });
         console.log(response);
         alert(response.data.message);
         if (response.status === 200) {
            navigate(`/home/${response.data.username}`);

      }
    }
    catch(error){
      alert(error.response ? error.response.data.message : 'Login failed');
    }
    // For example, on successful login, navigate to the homepage
   
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="left-section">
          <img src={writo} alt="Writo" className="writo-img" />
          <h1>Writo Education</h1>
          <form className="login-form" onSubmit={handleLogin}>
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
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="signup-text">
            Don't have an account? <Link to="/Signup" className="signup-link">Sign Up</Link>
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