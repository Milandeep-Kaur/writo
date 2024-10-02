import React from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';  
//import Footer from './components/Footer/index.js'; 
//import Services from './components/Services/index.js';
//import Courses from './components/Courses/index.js';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import NEET from './components/Courses/NEET/neet.js';
import JEE from './components/Courses/JEE/jee.js';
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
            <Route path="/neet" element={<NEET />} />
            <Route path="/jee" element={<JEE />} />
             {/*<Route path="/class12" element={<Class12 />} />
            <Route path="/class10" element={<Class10 />} />                         */}
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

