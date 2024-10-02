import React, { useEffect, useRef } from "react";
import {useParams} from "react-router-dom";
import Typed from 'typed.js';
import './Home.css'; 
import logo from './logo.png';
import About from '../../components/About/index.js';
import Courses from '../../components/Courses/index.js';
import Footer from '../../components/Footer/index.js';
import Services from '../../components/Services/index.js';


const Home = () => {
    const el = useRef(null); // Create a reference to store the DOM element for animation
    const {username} = useParams();

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['a win', 'a thrill', 'a breeze'],
            typeSpeed: 150, // Typing speed
            backSpeed: 100, // Erasing speed
            backDelay: 1000, // Delay before starting to erase
            startDelay: 500, // Delay before starting typing
            loop: true, // Loop the animation
            showCursor: true, // Show the blinking cursor
            cursorChar: '|', // Customize the cursor character
        });

        // Cleanup the Typed instance on component unmount
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <>
        <div className="home-container">
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-img" />
                    <span className="company-name">WRITO EDUCATION {username}</span>
                </div>
                <div className="nav-buttons">
                    <button className="nav-btn">Login</button>
                    <button className="nav-btn">Signup</button>
                </div>
            </nav>

            <div className="main-content">
                <h1 className="main-heading">
                    Exams are <span className="dynamic-text" ref={el} />
                </h1>
                <h1 className="main-heading">with <span>Writo's</span> expertise!</h1>
                <p className="slogan">Tackle Math like a pro with India’s best teachers</p>
                <p className="hashtag">#WritoSeExamsHoJayeAsaan</p>
                <button className="explore-btn">Explore Courses</button>
            </div>
        </div>
        <About />
        <Courses />
        <Services />
        <Footer />
        </>
    );
};

export default Home;