import React from 'react';
import './JEE.css';
import { useNavigate } from 'react-router-dom';


const JEE = () => {
    const navigate = useNavigate();
    const level= "Easy";
   
    const handleTestClick = (testBox) => {
        console.log("Test number clicked:", testBox);
        const course = localStorage.getItem("course");
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
        <div className="jee-page">
            <div className="slogan-section">
                <h1>Unlock the Doors to IITs</h1>
                <p>—Where Excellence Meets Opportunity!</p>
            </div>

            <div className="dates-section">
                <h2>Important JEE 2025 Dates</h2>
                <ul className="dates-list">
                    <li>Application Form Release: November 2024</li>
                    <li>Last Date to Submit Form: December 2024</li>
                    <li>Admit Card Release: March 2025</li>
                    <li>JEE Main Exam Date: April 2025</li>
                    <li>JEE Advanced Exam Date: June 2025</li>
                    <li>Results Announcement: July 2025</li>
                </ul>
            </div>

        
            <div className="test-section">
                <h2>Mock Tests for JEE 2025</h2>
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

export default JEE;
