import React from 'react';
import './StudentDashboard.css';
import user from './user.png';
import question from './question.png';
import test from './test.png';
import writo from './writo.png';

const StudentDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="welcome-section">
        <div className="welcome-image">
          <img src={writo} alt="Welcome" />
        </div>
        <div className="welcome-text">
          <h1>Hello Student</h1>
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
          <h4>Legend:</h4>
        </div>

        <div className='bargraph-card'>
          <h2>Question Metrics</h2>
          <h4>Legend:</h4>
        </div>
      </div>

      <div className='linegraph-container'>
        <div className='linegraph-card'>
          <h2>User Reports:</h2>
          <h4>Legend:</h4>
          <h4>User Joined:</h4>
        </div>
      </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
