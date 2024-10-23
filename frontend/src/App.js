import React from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';  
//import Footer from './components/Footer/index.js'; 
//import Services from './components/Services/index.js';

import Home from './pages/Home/Home.jsx'; 
import Login from './pages/Login/Login.jsx';
import AddQuestion from './pages/AddQuestion.jsx';
import Signup from './pages/Signup/Signup.jsx';
import NEET from './components/NEET/NEET.jsx';
import JEE from './components/JEE/JEE.jsx';
import AdminLogin from './AdminPanel/AdminLogin.jsx';
import Test from './pages/Test.jsx'; 
import AdminSignup from './AdminPanel/AdminSignup.jsx';
import Feedback from './pages/Feedback.jsx';
import Result from './pages/Result.jsx';
import Links from './pages/Links.jsx';
import AdminDashboard from './AdminPanel/AdminDashboard.jsx';
import AdminSidebar from './AdminPanel/AdminSidebar.jsx';
import ScoreBoard from './AdminPanel/ScoreBoard.jsx';
import StudentProfile from './pages/StudentProfile.jsx';
import Logout from './AdminPanel/Logout.jsx';
//import About from './components/About/index.js';


function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />   
            
            <Route path="/home/:username" element={<Home />} /> 
            <Route path="/links" element={<Links />} /> 
            {/* <Route path="/addQuestion/:username" element={<AddQuestion />} />   */}
            <Route path="/addQuestion" element={<AddQuestion />} />   
            <Route path="/admin/dashboard" element={<AdminDashboard />} />  
            <Route path="/admin/sidebar" element={<AdminSidebar/>} />
            <Route path="/admin/scoreboard/:course" element={<ScoreBoard/>} />
            <Route path="/profile" element={<StudentProfile/>} />
            <Route path="/admin/logout" element={<Logout />} />
            {/*<Route path="/addQuestion/:username" element={<AddQuestion />} />     */}
            <Route path="/neet" element={<NEET />} />
            <Route path="/jee" element={<JEE />} />
            <Route path="/:course/:testId" element={<Test />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/result" element={<Result />} />
            
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
         
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;