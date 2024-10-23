import React from 'react';
import './NEET.css';
import { useNavigate,useLocation } from 'react-router-dom';

const NEET = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const level= "Easy";
    const { username, course } = location.state;  // Get username and course from state
    const handleTestClick = (testBox) => {
        // Check if user and user.course are defined
        if (!username || !course) {
            console.log("User or course is not defined");
            return;
        }

        console.log("Test number clicked:", testBox);
        // Assuming you have the course in the state after login;
        console.log("Selected Course:", course);

        let testId;
        if (testBox === 1) {
            testId = "t1";
        } else if (testBox === 2) {
            testId = "t2";
        } else if (testBox === 3) {
            testId = "t3";
        }

        // Navigate to the Test page with course and testId as route parameters
        navigate(`/${course}/${testId}`);


    };
    return (
        <div className="neet-page">
           
            <div className="slogan-section">
                <h1>Turn Your Medical Aspirations into Reality</h1>
                <p>—Where Future Doctors Begin Their Journey!</p>
            </div>

           
            <div className="dates-section">
                <h2>Important NEET 2025 Dates</h2>
                <ul className="dates-list">
                    <li>Application Form Release: January 2025</li>
                    <li>Last Date to Submit Form: March 2025</li>
                    <li>Admit Card Release: April 2025</li>
                    <li>NEET Exam Date: May 2025</li>
                    <li>Results Announcement: June 2025</li>
                </ul>
            </div>

            <div className="test-section">
                <h2>Mock Tests for NEET 2025</h2>
                <div className="test-grid">
                    <div className="test-box">
                        <h3>Test 1</h3>
                        <button className="take-test-btn" onClick={() => handleTestClick(1)}>Take Test</button>
                    </div>
                    <div className="test-box">
                        <h3>Test 2</h3>
                        <button className="take-test-btn" onClick={() => handleTestClick(2)}>Take Test</button>
                    </div>
                    <div className="test-box">
                        <h3>Test 3</h3>
                        <button className="take-test-btn" onClick={() => handleTestClick(3)}>Take Test</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NEET;
