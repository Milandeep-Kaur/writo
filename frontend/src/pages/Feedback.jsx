import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Feedback = () => {
    const location = useLocation(); // Get data passed from the previous page
    const navigate = useNavigate(); // Hook to navigate between routes
    const { feedback,score,status, username, course, testId } = location.state; // Extract feedback object

    // Determine passing score (e.g., 50% of total questions)
    // const passingScore = Math.ceil(feedback.length/ 2); // Half of the total questions
    // const status = score >= passingScore ? 'Passed' : 'Failed'; // Determine pass/fail status

    // Function to handle navigation back to JEE page
    const handleDone = () => {
        navigate(-2); // Go back to the previous page
    };

    return (
        <div>
            <h2>{username.toUpperCase()}</h2>
            <h3>{course} - Test {testId}</h3>
            <p>Score: {score}/{feedback.length}</p>
            <p>Status: <strong>{status}</strong></p>

            <h3>Test Feedback</h3>
            {feedback.map((question, index) => (
                <div key={question.questionId}>
                    <h4>Question {index + 1}:</h4>
                    <p>{question.question}</p>

                    {/* Show user's answer in green if correct, red if wrong */}
                   <p style={{ color: question.isCorrect ? 'green' : 'red' }}>
                        Your Answer: {question.userAnswer}
                    </p>

                    {/* Always display the correct answer */}
                    <p style={{ color: 'green' }}>
                        Correct Answer: {question.correctAnswer}
                    </p>
                </div>
            ))}

            {/* Done button to return to the previous page */}
            <button onClick={handleDone}>Review </button>
        </div>
    );
};

export default Feedback;