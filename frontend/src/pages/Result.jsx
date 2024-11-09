import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./Result.css"; // Importing the CSS file
import { FaPencilRuler } from "react-icons/fa";
import { BiSolidBadgeCheck } from "react-icons/bi"; 
import { MdDangerous } from "react-icons/md";
import { IoMdTimer } from "react-icons/io";

const Result = () => {
  const [resultData, setResultData] = useState(null); 
  const [attemptData, setAttemptData] = useState(null);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));  
    
    if (userData && userData.userId) {
      const userId = userData.userId;

      const fetchResult = async () => {
        try {
          const response = await axios.post('http://localhost:5000/fetchResult', { userId });
          setResultData(response.data.result);          
          setAttemptData(response.data.attempt);
        } 
        catch (error) {
          setError("No test Given Yet!");   
        }
      };
      
      fetchResult();
    } else {
      setError("User not logged in or invalid data in localStorage");
    }
  }, []);
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const testResults = [
    { testId: 't1', status: resultData?.statusT1, score: resultData?.scoreT1, start: attemptData?.startT1, end: attemptData?.endT1 },
    { testId: 't2', status: resultData?.statusT2, score: resultData?.scoreT2, start: attemptData?.startT2, end: attemptData?.endT2 },
    { testId: 't3', status: resultData?.statusT3, score: resultData?.scoreT3, start: attemptData?.startT3, end: attemptData?.endT3 }
  ];

  return (
    
    <div className="result-container">
    
      {resultData && (
        <div className="result-header">
          <h1>Quiz Result</h1>
          <h2>{resultData.name.toUpperCase()}</h2>
          <h3>COURSE: {resultData.course}</h3>
        </div>
      )}

      
        <div className="test-results">
          {testResults.map((test, index) =>
            test.status ? (
              <div key={index} className="test-card">
                <div className="test-info">
                  <p><strong>Test Id:</strong> {test.testId.toUpperCase()}</p>
          
                  <p><strong><FaPencilRuler />:  </strong> {test.score}/2</p>
                  <p>
                  
                  {test.status.toLowerCase() === 'passed' ? (
                    <span>
                      <BiSolidBadgeCheck style={{ color: 'green',fontSize:'26px' }} /> Passed
                    </span>
                  ) : (
                    <span>
                      <MdDangerous style={{ color: 'red',fontSize:'26px' }} /> Failed
                    </span>
                  )}
                </p>
                </div>                  
                <div className="test-times">
                  <p className="time-item">
                    <IoMdTimer className="time-icon" />
                    <strong>Start:  </strong>
                    {format(new Date(test.start), 'dd/MM/yyyy HH:mm:ss')}
                  </p>
                  <p className="time-item">
                    <IoMdTimer className="time-icon" />
                    <strong>Finish: </strong>
                    {format(new Date(test.end), 'dd/MM/yyyy HH:mm:ss')}
                  </p>
                </div>

              </div>
            ) : null
          )}
        </div>
      
    </div>
  );
};

export default Result;
