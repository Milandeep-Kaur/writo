import React, { useEffect, useState } from "react";
import axios from "axios";
import {format} from "date-fns"; // it is used for formating the date format

const Result = () => {
  const [resultData, setResultData] = useState(null);     //used to store the result data recieved
  const [attemptData, setAttemptData] = useState(null);   //used to store the attempt data recieved
  const [error, setError] = useState(null);              //used to set the error message of no test gven 
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));   //to get the user id which is saved in key user
    
    // Check if userData exists before trying to access userId
    if (userData && userData.userId) {
      const userId = userData.userId;

      const fetchResult = async () => {
        try {
          const response = await axios.post('http://localhost:5000/fetchResult', { userId });
          setResultData(response.data.result);          
          setAttemptData(response.data.attempt);
        } 
        catch (error) {
          setError("No test Given Yet!");   //if there is no result then no test is shown
        }
      };
      
      fetchResult();
    } else {
      setError("User not logged in or invalid data in localStorage");
    }
  }, []);
  
  // If there's an error, display it
  if (error) {
    return <div>{error}</div>;
  }

  // Define the tests' data
  const testResults = [
    { testId: 't1', status: resultData?.statusT1, score: resultData?.scoreT1, start: attemptData?.startT1, end: attemptData?.endT1 },
    { testId: 't2', status: resultData?.statusT2, score: resultData?.scoreT2, start: attemptData?.startT2, end: attemptData?.endT2 },
    { testId: 't3', status: resultData?.statusT3, score: resultData?.scoreT3, start: attemptData?.startT3, end: attemptData?.endT3 }
  ];

  return (
    <>
      {resultData && (
        <>
          <h1>Name: {resultData.name}</h1>
          <h3>Course: {resultData.course}</h3>
        </>
      )}

      {testResults.map((test, index) =>
        test.status ? (
          <div key={index}>
            <p>Test Id: {test.testId}</p>
            <p>Status: {test.status}</p>
            <p>Score: {test.score}</p>
             <p>Starting Time: {format(new Date(test.start), 'dd/MM/yyyy HH:mm:ss')}</p>
             <p>Finishing Time: {format(new Date(test.end), 'dd/MM/yyyy HH:mm:ss')}</p>
          </div>
        ) : null
      )}
    </>
  );
};

export default Result;