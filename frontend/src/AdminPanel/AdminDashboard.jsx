import React,{useState,useEffect} from 'react';
import axios from "axios";
import './AdminDashboard.css';
import user from './user.png';
import question from './question.png';
import test from './test.png';
import writo from './writo.png';
import {Chart as ChartJS} from "chart.js/auto";
import {Pie,Bar,Line} from "react-chartjs-2";

const AdminDashboard = () => {

const [userData, setUserData] = useState({ JEE: 0, NEET: 0, "10th": 0, "12th": 0 });
const [questionData, setQuestionData] = useState({ JEE: 0, NEET: 0, "10th": 0, "12th": 0 });
const [jeeData,setJeeData] = useState([]);
const [neetData,setNeetData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/dashboard');
        setUserData(response.data.userCounts);
        setQuestionData(response.data.questionCounts);
        setJeeData(response.data.jeeData);
        setNeetData(response.data.neetData);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const pieChartData = {
    labels: ["JEE", "NEET", "10th", "12th"],
    datasets: [
      {
        data: [userData.JEE, userData.NEET, userData["10th"], userData["12th"]],
        backgroundColor: ['#FF6B6B', '#4D96FF', '#FFD93D', '#6BCB77'], // Bright and distinct colors
      },
    ],
  };
  
  const barChartData = {
    labels: ["JEE", "NEET", "10th", "12th"],
    datasets: [
      {
        data: [questionData.JEE, questionData.NEET, questionData["10th"], questionData["12th"]],
        backgroundColor: [
          '#FF6B6B', // Vivid Red
          '#4D96FF', // Bright Blue
          '#FFD93D', // Warm Yellow
          '#6BCB77'  // Fresh Green
        ],
      },
    ],
  };
  
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "JEE",
        data: jeeData,
        borderColor: "#FF6B6B", // Vivid Red
        fill: false,
        tension: 0.4,
      },
      {
        label: "NEET",
        data: neetData,
        borderColor: "#4D96FF", // Bright Blue
        fill: false,
        tension: 0.4,
      },
    ],
  };
  

  return (
    <div className="admin-dashboard">
      <div className="welcome-section">
        <div className="welcome-image">
          <img src={writo} alt="Welcome" />
        </div>
        <div className="welcome-text">
          <h1>Hello Admin</h1>
          <h3>Making You Future Fit!!!</h3>
        </div>
      </div>
      
      <div className="overview-section">
        <h1>Overview</h1>
        <h3>Track, manage, and view</h3>

        <div className="card-container">
          <div className="card">
            <div className="card-content">
              <div className="card-number">200</div>
              <h3>Total User</h3>
            </div>
            <img src={user} alt="Total User" />
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-number">200</div>
              <h3>Total Test</h3>
            </div>
            <img src={test} alt="Total Test" />
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-number">200</div>
              <h3>Total Question</h3>
            </div>
            <img src={question} alt="Total Question" />
          </div>          
        </div>


      <div className='bargraph-container'>
        <div className='bargraph-card'>
          <h2>User Metrics</h2>
          <div className="chart-wrapper">
          <Pie data={pieChartData}  />
          {/*<h4>Legend:</h4>*/}</div>
        </div>

        <div className='bargraph-card'>
          <h2>Question Metrics</h2>
          <div className='chart-wrapper'>
          <Bar data={barChartData}/>
          {/*<h4>Legend:</h4>*/}</div>
        </div>
      </div>

      <div className='linegraph-container'>
        <div className='linegraph-card'>
          <h2>User Reports:</h2>
          <div className='chart-wrapper'>
          <Line data={lineChartData}  />
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default AdminDashboard;















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const AdminDashboard = () => {
//   const [students, setStudents] = useState([]);

//   // Fetch students from server when the component mounts
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/admin/students');
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//       }
//     };
    
//     fetchStudents();
//   }, []);

//   return (
//     <>
//       <h1>Admin Dashboard</h1>
//       <h2>Registered Students</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Sr No.</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Course</th>
//           </tr>
//         </thead>
//         <tbody>
//           { 
//             students.map((student,index) => (
//             <tr key={student._id}>
//               <td>{index+1}</td>
//               <td>{student.username}</td>
//               <td>{student.email}</td>
//               <td>{student.course}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default AdminDashboard;
