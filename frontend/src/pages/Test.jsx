// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Test = () => {
//     const { testId } = useParams(); // Extract testId from URL
//     const [questions, setQuestions] = useState([]); // Store questions
//     const [questionIds,setQuestionIds] = useState([]); // store question ids 
//     const [answers, setAnswers] = useState({}); // Store user's answers
//     const navigate = useNavigate();

//     // Retrieve user data from localStorage
//     const userData = JSON.parse(localStorage.getItem('user')); 
//     const username = userData.username;
//     const userId = userData.userId;
//     const course = userData.course; // Fetch course from localStorage
    

//     useEffect(() => {
//         // Fetch questions when the component loads
//         const fetchQuestions = async () => {
//           try {
//              const response = await axios.post('http://localhost:5000/fetchQuestions', { course, testId});
//              setQuestions(response.data.questions);
//            }
//            catch (error) {
//             alert(error.response ? error.response.data : 'No Question');
//            }
//     };
    
//         fetchQuestions();
//       }, [course, testId]);        // it works each time course or id changes 


//   // to extract and save all question ids of a particular exam page
//    useEffect(()=>{
//          const ids = questions.map((question)=>question._id);
//          setQuestionIds(ids);
//    },[questions]);


//    // storing the answers of the clicked user
//    // it stores all the previous answers along with the new ones in the format of  q1:answer1 , q2:answer2 ,  q3: answer3 ...
//     const handleAnswerSelect = (questionId, option) => {
//         setAnswers((prevAnswers) => ({
//             ...prevAnswers,             
//             [questionId]: option,
//         }));
//     };


//      // Handle test submission and score calculation
//     const handleSubmitTest = async () => {

//        try {
//             const response = await axios.post('http://localhost:5000/endTest', {
//                 userId,username,course,testId,answers,questionIds,});
            
//             const {feedback} = response.data;  // get the feedback object containing all the information
//             //pass the feedback object along with username,course,testId
//             navigate("/feedback",{state:{feedback,username,course,testId}});
//         } 
//         catch (err) {
//             alert(err.response.data || 'Error submitting test');
//         }
//     };


//     return (
//         <>
//     <h2>Test for {course} - Test {testId}</h2>
//     {questions.map((question, index) => (
//     <div key={question._id}>
//         <h4>Question {index + 1}:</h4>
//         <p>{question.question}</p>
//         <ul>
//             {question.options.map((option, i) => (
//                 <li key={i}>
//                     <input
//                         type="radio"
//                         name={question-${question._id}}  // Use question._id as part of the name
//                         value={option}
//                         onChange={() => handleAnswerSelect(question._id, option)}  // Pass question._id here
// //                     />
//                     />
//                     {option}
//                 </li>
//             ))}
//         </ul>
//     </div>
// ))}
//     <button onClick={handleSubmitTest}>Submit Test</button>
//     </>
//     );
// };

// export default Test;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Test = () => {
    const { testId } = useParams(); // Extract testId from URL
    const [questions, setQuestions] = useState([]); // Store questions
    const [questionIds,setQuestionIds] = useState([]); // store question ids 
    const [answers, setAnswers] = useState({}); // Store user's answers
    const navigate = useNavigate();

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user')); 
    const username = userData.username;
    const userId = userData.userId;
    const course = userData.course; // Fetch course from localStorage
    

    useEffect(() => {
        // Fetch questions when the component loads
        const fetchQuestions = async () => {
          try {
             const response = await axios.post('http://localhost:5000/fetchQuestions', { course, testId});
             setQuestions(response.data.questions);
           }
           catch (error) {
            alert(error.response ? error.response.data : 'No Question');
           }
    };
    
        fetchQuestions();
      }, [course, testId]);        // it works each time course or id changes 


  // to extract and save all question ids of a particular exam page
   useEffect(()=>{
         const ids = questions.map((question)=>question._id);
         setQuestionIds(ids);
   },[questions]);


   // storing the answers of the clicked user
   // it stores all the previous answers along with the new ones in the format of  q1:answer1 , q2:answer2 ,  q3: answer3 ...
    const handleAnswerSelect = (questionId, option) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,             
            [questionId]: option,
        }));
    };


     // Handle test submission and score calculation
     const handleSubmitTest = async () => {
        try {
            const response = await axios.post('http://localhost:5000/endTest', {
                userId, username, course, testId, answers, questionIds,
            });
    
            const { feedback,score,status } = response.data; // Get the feedback object
            //alert(Test submitted! Your score is ${feedback.score}/${feedback.questions.length});
            
            // Pass the feedback object along with username, course, and testId
            navigate('/feedback', { state: { feedback,score,status, username, course, testId } });
        } 
        catch (err) {
            alert(err.response.data || 'Error submitting test');
        }
    };
    


    return (
        <>
    <h2>Test for {course} - Test {testId}</h2>
    {questions.map((question, index) => (
    <div key={question._id}>
        <h4>Question {index + 1}:</h4>
        <p>{question.question}</p>
        <ul>
            {question.options.map((option, i) => (
                <li key={i}>
                    <input
                        type="radio"
                        name={`question-${question._id}`}  // Use question._id as part of the name
                        value={option}
                        onChange={() => handleAnswerSelect(question._id, option)}  // Pass question._id here
//                     />
                    />
                    {option}
                </li>
            ))}
        </ul>
    </div>
))}
    <button onClick={handleSubmitTest}>Submit Test</button>
    </>
    );
};

export default Test;