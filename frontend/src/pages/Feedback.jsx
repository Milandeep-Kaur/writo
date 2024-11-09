import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Feedback.css'; // Import the Feedback.css for styling

const Feedback = () => {
    const location = useLocation(); // Get data passed from the previous page
    const navigate = useNavigate(); // Hook to navigate between routes
    const { feedback, score, status, username, course, testId } = location.state; // Extract feedback object

    // Function to handle navigation back to JEE page
    const handleDone = () => {
        navigate(-2); // Go back to the previous page
    };

    return (
        <>
            <div className="feedback-header">
                <h1>Test Feedback</h1>
                <h2>{username.toUpperCase()}</h2>
                
                <div className="feedback-row">
                    <h3 className="course">COURSE: {course}</h3>
                    <p className="score">SCORE: {score}/{feedback.length}</p>
                </div>

                <div className="feedback-row">
                    <h3 className="testId">TESTID: {testId.toUpperCase()}</h3>
                    <p>
                    <strong className={status.toLowerCase() === 'passed' ? 'status-passed' : 'status-failed'}>
                        {status}
                    </strong>
                    </p>

                </div>
            </div>
            {feedback.map((question, index) => (
            <div key={question.questionId} className="feedback-card">
                <div className={`question-wrapper ${question.isCorrect ? 'correct-wrapper' : 'incorrect-wrapper'}`}>
                <h4>{index + 1} Out of {feedback.length}</h4>
                <p>{question.question}</p>
                </div>

                {/* Show user's answer in green if correct, red if wrong */}
                <p className={question.isCorrect ? 'correct' : 'incorrect'}>
                Your Answer: {question.userAnswer}
                </p>

                {/* Always display the correct answer */}
                <p className="correct">
                Correct Answer: {question.correctAnswer}
                </p>
            </div>
            ))}


            {/* Done button to return to the previous page */}
            <button className="review-button" onClick={handleDone}>Seen</button>
        </>
    );
};

export default Feedback;