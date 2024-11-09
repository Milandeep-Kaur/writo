import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from 'react-icons/io5'; // Import the icons
import './Test.css';

const Test = () => {
    const { testId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State for the current question index
    const [questionIds,setQuestionIds] = useState([]); // store question ids 
    const [answers, setAnswers] = useState({}); // State for answers
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem('user'));
    const username = userData.username;
    const userId = userData.userId;
    const course = userData.course;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.post('http://localhost:5000/fetchQuestions', { course, testId });
                setQuestions(response.data.questions);
            } catch (error) {
                alert(error.response ? error.response.data : 'No Question');
            }
        };
        fetchQuestions();
    }, [course, testId]);

    // to extract and save all question ids of a particular exam page
   useEffect(()=>{
         const ids = questions.map((question)=>question._id);
         setQuestionIds(ids);
   },[questions]);

    const handleOptionChange = (option) => {
        // Update the answer for the current question
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questions[currentQuestionIndex]._id]: option,
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleSubmitTest = async () => {
        try {
            const response = await axios.post('http://localhost:5000/endTest', {
                userId, username, course, testId, answers, questionIds,
            });

            const { feedback, score, status } = response.data;
            navigate('/feedback', { state: { feedback, score, status, username, course, testId } });
        } catch (err) {
            alert(err.response.data || 'Error submitting test');
        }
    };

    return (
        <>
            <div className='test-header'>
                <h1>Question Page</h1>
                <h2>{username.toUpperCase()}</h2>
                <h3 className="course">COURSE: {course}</h3>
                <h3>TEST ID: {testId.toUpperCase()}</h3>
                <h4><span>NOTE:</span> Choose the correct answer. There is a limit of 1 hr. Best of Luck🤞</h4>
            </div>

            {questions.length > 0 && (
                <div className="question-wrapper">
                    <div className='question-text'>
                        <h4>{currentQuestionIndex + 1} Out of {questions.length}</h4>
                        <p>{questions[currentQuestionIndex].question}</p>
                    </div>
                    <div className="options-container">
                        {questions[currentQuestionIndex].options.map((option, i) => (
                            <div 
                                key={i} 
                                className={`option ${answers[questions[currentQuestionIndex]._id] === option ? 'selected' : ''}`}
                            >
                                <input
                                    type="radio"
                                    id={`option-${questions[currentQuestionIndex]._id}-${i}`}
                                    name={`question-${questions[currentQuestionIndex]._id}`}
                                    value={option}
                                    onChange={() => handleOptionChange(option)}
                                    checked={answers[questions[currentQuestionIndex]._id] === option} // Control the radio button
                                />
                                <label htmlFor={`option-${questions[currentQuestionIndex]._id}-${i}`}>{option}</label>
                            </div>

                        ))}
                    </div>
                </div>
            )}
            
        <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
                <IoArrowBackCircleOutline 
                    className="prev-icon"
                    onClick={handlePreviousQuestion}
                    size={46}
                />
            )}
             <div className="spacer" /> {/* Spacer for flex alignment */}
            {currentQuestionIndex < questions.length - 1 ? (
                <IoArrowForwardCircleOutline 
                    className="next-icon"
                    onClick={handleNextQuestion}
                    size={46}
                />
            ) : (
                <button onClick={handleSubmitTest}>Submit Test</button>
            )}
        </div>

        </>
    );
};

export default Test;