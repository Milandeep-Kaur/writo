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
import AdminSignup from './pages/Signup/Signup.jsx';
//import About from './components/About/index.js';


function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
         <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />   
            
            <Route path="/home/:username" element={<Home />} /> 
            <Route path="/addQuestion/:username" element={<AddQuestion />} />     
            <Route path="/neet" element={<NEET />} />
            <Route path="/jee" element={<JEE />} />
            <Route path="/:course/:testId" element={<Test />} />
           
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* <Route path="/admin/signup" element={<AdminSignup />} /> */}
             {/*<Route path="/class12" element={<Class12 />} />
            <Route path="/class10" element={<Class10 />} />                         */}
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


