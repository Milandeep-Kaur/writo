import React from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';  
//import Footer from './components/Footer/index.js'; 
//import Services from './components/Services/index.js';

import Home from './pages/Home/Home.jsx'; 
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';

import NEET from './components/NEET/NEET.jsx';
import JEE from './components/JEE/JEE.jsx';

import Test from './pages/Test.jsx'; 
import Feedback from './pages/Feedback.jsx';
import Result from './pages/Result.jsx';

import AdminLogin from './AdminPanel/AdminLogin.jsx';
import AdminSignup from './AdminPanel/AdminSignup.jsx';

import AdminDashboard from './AdminPanel/AdminDashboard.jsx';
import AdminSidebar from './AdminPanel/AdminSidebar.jsx';
//import AdminProfile from './AdminPanel/AdminProfile.jsx';
import ScoreBoard from './AdminPanel/ScoreBoard.jsx';
import Questions from './AdminPanel/Questions.jsx';

import Links from './pages/Links.jsx';

import AddQuestion from './pages/AddQuestion.jsx';
import AddCourse from './pages/AddCourse.jsx';
import AddSubject from './pages/AddSubject.jsx';
import AddTest from './pages/AddTest.jsx';
import UpdateQuestion from './AdminPanel/UpdateQuestion.jsx';
import CoursesTable from './AdminPanel/CoursesTable.jsx';
import Subjects from './AdminPanel/Subjects.jsx';
import Exams from './AdminPanel/Exams.jsx';

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
            <Route path="/addCourse" element={<AddCourse />} />   
            <Route path="/addSubject" element={<AddSubject />} />   
            <Route path="/addTest" element={<AddTest />} />   
            <Route path="/admin/dashboard" element={<AdminDashboard />} />  
            <Route path="/admin/sidebar" element={<AdminSidebar/>} />
            <Route path="/admin/scoreboard/:course" element={<ScoreBoard/>} />
            <Route path="/admin/questions" element={<Questions/>} />
            <Route path="/updateQuestion/:questionId" element={<UpdateQuestion />} />
            <Route path="/admin/courses" element={<CoursesTable/>} />
            <Route path="/admin/subject" element={<Subjects/>} />
            <Route path="/admin/exams" element={<Exams/>} />


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


