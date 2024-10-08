import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Test = () => {
    const { course, testId } = useParams();
    const navigate = useNavigate();
    const [testContent, setTestContent] = useState('');
    const [answers, setAnswers] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        const fetchTestContent = async () => {
            try {
                const response = await axios.post('http://localhost:5000/getTestContent', { course, testId });
                setTestContent(response.data.testContent);
            } catch (error) {
                console.error('Error fetching test content:', error);
                setErrorMessage('Error fetching test content.');
            }
        };

        fetchTestContent();
    }, [course, testId]);

    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: selectedOption }));
    };

    const handleSubmitTest = async () => {
        try {
            const response = await axios.post('http://localhost:5000/submitTest', {
                email: userEmail,
                testId: testId,
                answers: answers,
            });
            const { message } = response.data;
            console.log(message);
            navigate('/results');
        } catch (error) {
            console.error('Error submitting test:', error);
            setErrorMessage('There was an error submitting the test. Please try again.');
        }
    };

    return (
        <div className="test-container">
            <h1>{course} - {testId.toUpperCase()} Page</h1>
            {testContent ? (
                <div>
                    <p>{testContent}</p>
                    {testContent.questions && testContent.questions.map((question) => (
                        <div key={question.id} className="question-section">
                            <h3>{question.question}</h3>
                            <ul>
                                {question.options.map((option, index) => (
                                    <li key={index}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={option}
                                                onChange={() => handleAnswerChange(question.id, option)}
                                            />
                                            {option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <button className="submit-test-btn" onClick={handleSubmitTest}>Submit Test</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            ) : (
                <p>Loading test content...</p>
            )}
        </div>
    );
};

export default Test;
