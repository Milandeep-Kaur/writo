import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Signup.css';
import signup from './signup.png';
 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [course, setCourse] = useState('');
  const navigate = useNavigate();
  
  const handleRegister=async(e)=>{
        e.preventDefault();
        try{
           const response = await axios.post("http://localhost:5000/register",{
                            username,email,password,cpassword,course,
           });
           alert(response.data);
           if(response.status === 201){
            // localStorage.setItem("course", course);  
            navigate("/login");
           }
        }
        catch(error){
           alert(error.response ? error.response.data : 'Registration failed');
        }
   };


  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="left-section">
          <h1>Sign Up</h1>

          <form className="signup-form" onSubmit={handleRegister}>
          
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" 
                     value = {username}
                     onChange ={(e)=> setUsername(e.target.value)}
                     id="username"
                     placeholder="Choose a username" 
                     required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email"
                     value = {email}
                     onChange ={(e)=> setEmail(e.target.value)} 
                     id="email"
                     placeholder="Enter your email" 
                     required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" 
                     value = {password}
                     onChange ={(e)=> setPassword(e.target.value)}
                     id="password" 
                     placeholder="Enter your password" 
                     required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password"
                     value = {cpassword}
                     onChange ={(e)=> setCpassword(e.target.value)} 
                     id="confirm-password" 
                     placeholder="Confirm your password" 
                     required />
            </div>
            <div className="form-group">
              <label htmlFor="course">Course</label>
              <select 
                     value={course}
                     onChange={(e) => setCourse(e.target.value)}
                     id="course"
                     required>
                <option value="" disabled>Select your course</option>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value="12th">12th</option>
                <option value="10th">10th</option>
              </select>
            </div>
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="login-text">
            Already have an account?<Link to="/Login" className="signup-link">Login</Link>
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