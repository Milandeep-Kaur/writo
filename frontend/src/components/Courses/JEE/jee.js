import React, { useState } from 'react';
import './jee.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jee = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const course = localStorage.getItem('course');
    const userEmail = localStorage.getItem('email');
    const handleTestClick = async (testBox) => {
        try {
            const testId = `t${testBox}`;
            console.log("Checking if test is attempted for testId:", testId);
    
            const response = await axios.post('http://localhost:5000/checkAttempts', {
                email: userEmail, // Pass user's email to check attempts
                testId: testId
            });
    
            console.log("Received response from backend:", response.data);
    
            const { attempted, message } = response.data;
    
            if (attempted) {
                setErrorMessage(message); // Show message that user has already attempted
                console.log("Error:", message);
            } else {
                console.log("Test not attempted, allowing navigation");
    
                // Record the attempt when they start the test
                await axios.post('http://localhost:5000/attemptTest', {
                    email: userEmail,
                    testId: testId
                });
    
                console.log("Navigating to test page");
                navigate(`/${course}/${testId}`); // Redirect to test page
            }
        } catch (error) {
            console.error('Error during test click process:', error);
            setErrorMessage('There was an error. Please try again later.');
        }
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
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Jee;
