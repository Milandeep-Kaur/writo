import React from 'react';
import './index.css'; 
import jee from './jee.png';
import neet from './neet.png';
import twelve from './twelve.png';
import tenth from './tenth.png';

const Courses = () => {
    return (
        <div className="courses-container">
            <h1 className='courses-heading'>Courses / Exams</h1>
            <div className="courses-grid">
                <div className="course-item neet">
                    <img src={neet} alt="NEET" className="course-icon" />
                    <h2>NEET UG</h2>
                    <p>Crack NEET and Secure a seat in AIMS  by achieving top ranks!</p>
                </div>
                <div className="course-item jee">
                    <img src={jee} alt="JEE" className="course-icon" />
                    <h2>IIT JEE</h2>
                    <p>For those who want only IIT & nothing else!</p>
                </div>
                <div className="course-item twelve">
                    <img src={twelve} alt="12th" className="course-icon" />
                    <h2>Class 12th</h2>
                    <p>Excel in Your Finals, and Open Doors to Endless Opportunities</p>
                </div>
                <div className="course-item ten">
                    <img src={tenth} alt="10th" className="course-icon" />
                    <h2>Class 10th</h2>
                    <p>Master Your Subjects, and Pave the Way for Future Success</p>
                </div>
            </div>
        </div>
    );
};

export default Courses;
