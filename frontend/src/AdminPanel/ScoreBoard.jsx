import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './ScoreBoard.css'; // Import the CSS file

const ScoreBoard = () => {
  const [scoreBoardData, setScoreBoardData] = useState([]); // Array of objects
  const { course } = useParams();

  useEffect(() => {
    const fetchScoreBoardData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/admin/scoreboard', { course }); // Check this URL
        setScoreBoardData(response.data);
      } catch (error) {
        console.error('Error fetching scorecard data:', error.message); // Log the error message
      }
    };

    fetchScoreBoardData();
  }, [course]);

  return (
    <div className="scoreboard">
      <h1>Score Board</h1>
      <div className="table-container">
        <table className="scoreboard-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Course</th>
              <th>Score T1</th>
              <th>Status T1</th>
              <th>Score T2</th>
              <th>Status T2</th>
              <th>Score T3</th>
              <th>Status T3</th>
            </tr>
          </thead>
          <tbody>
            {scoreBoardData.map((student, index) => (
              <tr key={student._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.scoreT1 || ' '}</td>
                <td>{student.statusT1 || ' '}</td>
                <td>{student.scoreT2 || ' '}</td>
                <td>{student.statusT2 || ' '}</td>
                <td>{student.scoreT3 || ' '}</td>
                <td>{student.statusT3 || ' '}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreBoard;
