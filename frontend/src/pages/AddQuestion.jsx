// import React,{useState,useEffect} from "react";
// import {useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddQuestion=()=>{
//    const [question,setQuestion]=useState("");
//    const [options,setOptions] = useState(["","","",""]);
//    const [correctAnswer, setCorrectAnswer] = useState("");
//    const [course,setCourse]= useState("");
//    const [subject,setSubject]= useState("");
//    const [level,setLevel] =useState("");
//    const [testBox,setTestBox]=useState("");
//    const navigate = useNavigate();
   
//    const [courses,setCourses] = useState([]);
//    const [testBoxes,setTestBoxes] = useState([]);
//    const [subjects,setSubjects] = useState([]);

//    const handleOptions=(index,value)=>{
//         const optionArray=[...options];
//         optionArray[index]=value;
//         setOptions(optionArray);
//    }
 
//   useEffect(()=>{
//       const fetchTestsAndSubjects = async()=>{
//       const response = await axios.get("http://localhost:5000/getTestsAndSubjects");
//       setSubjects(response.data.subjects);
//       setTestBoxes(response.data.tests);
//       };
//       fetchTestsAndSubjects();
//     },[]);
   
//     useEffect(()=>{
//       const fetchCourses = async()=>{
//       const response = await axios.get("http://localhost:5000/getCoursesName");
//       setCourses(response.data);
//       };
//       fetchCourses();
//     },[]);
   
   
//    const handleSubmit= async(e)=>{
//       e.preventDefault();

//       const questionData={
//         question,
//         options,
//         correctAnswer,
//         course,
//         level,
//         testBox
//       };
//       try{
//          const response= await axios.post("http://localhost:5000/addQuestion",questionData);
//          alert(response.data);
//            if(response.status === 201){
//             navigate("/addQuestion");
         
//         // reseting the boxes to add further questions
//          setQuestion("");
//          setOptions(["","","",""]);
//          setCorrectAnswer("");
//          setCourse("");
//          setSubject("");
//          setLevel("");
//          setTestBox("");
//       }}
//       catch(err){
//       	 alert('Error adding question');
//       }


//    };
   

//    return(
//    	<>
//    	<h2>Add Questions Panel</h2>
//    	<form onSubmit={handleSubmit}>
      
//         {/* adding question */}
//    	  <label>Question :</label>
//    	  <input 
//    	  type="text"
//       value={question}
//       onChange={(e)=>setQuestion(e.target.value)}
//       placeholder="add question"
//       required
//    	   />

//    	   {/* adding options */}
//    	  <label>Options :</label>
//    	  {options.map((option,index)=>(
//          <input 
//           type="text"
//           key={index}
//           placeholder={`add option ${index+1}`}
//           value={option}
//           onChange={(e)=>handleOptions(index,e.target.value)}
//           requried
//          />
//    	  	))}
      
//       {/* adding correct answer */}
//    	  <label>Correct Answer :</label>
//    	    <input 
//           type="text"
//           placeholder="add correct answer"
//           value={correctAnswer}
//           onChange={(e)=>setCorrectAnswer(e.target.value)}
//           requried
//         />

//         {/* adding course options */}
//    	  <label>Course Options :</label>
//    	  {/*<select value={course} onChange={(e)=>setCourse(e.target.value)} required>
//    	  	<option value="">Select Course</option>
//    	  	<option value="10th">10th</option>
//    	  	<option value="12th">12th</option>
//    	  	<option value="JEE">JEE</option>
//    	  	<option value="NEET">NEET</option>*/}

//       <select value={course} onChange={(e)=>setCourse(e.target.value)} required>
//         <option value="">Select Course</option>
//         {courses.map((course)=>(          
//         <option key={course._id} value={course.course}>{course.course}</option>
//         ))}
//       </select>

//    	  {/*</select>*/}

//    	    {/* adding different levels */}
//    	  <label>Difficulty Level :</label>
//    	  <select value={level} onChange={(e)=>setLevel(e.target.value)} required>
//    	  	<option value="">Select Difficulty</option>
//    	  	<option value="Easy">Easy</option>
//    	  	<option value="Medium">Medium</option>
//    	  	<option value="Hard">Hard</option>
//    	  </select>



  
//    	    {/* adding testbox options */}
//    	  <label>TestBox Options :</label>
//    	  {/*<select value={testBox} onChange={(e)=>setTestBox(e.target.value)} required>
//    	  	<option value="">Select TestBox</option>
//    	  	<option value="t1">Test 1</option>
//    	  	<option value="t2">Test 2</option>
//    	  	<option value="t3">Test 3</option>
//    	  	<option value="t4">Test 4</option>
//    	  </select>*/}
//       <select value={testBox} onChange={(e)=>setTestBox(e.target.value)} required>
//         <option value="">Select TestBox</option>
//         {testBoxes.map((testBox)=>(          
//         <option key={testBox._id} value={testBox.test}>{testBox.test}</option>
//         ))}
//       </select>

//  <label>Subject Options :</label>
//       <select value={subject} onChange={(e)=>setSubject(e.target.value)} required>
//         <option value="">Select Subject</option>
//         {subjects.map((subject)=>(          
//         <option key={subject._id} value={subject.subject}>{subject.subject}</option>
//         ))}
//       </select>


//      {/* Submit Button*/}

//    	  <button type="submit">Add</button>
  
//     </form>
//    	</>
//    	);
// };


// export default AddQuestion;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddQuestion = () => {
   const [question, setQuestion] = useState("");
   const [options, setOptions] = useState(["", "", "", ""]);
   const [correctAnswer, setCorrectAnswer] = useState("");
   const [course, setCourse] = useState("");
   const [subject, setSubject] = useState("");
   const [level, setLevel] = useState("");
   const [testBox, setTestBox] = useState("");
   const navigate = useNavigate();

   const [courses, setCourses] = useState([]);
   const [testBoxes, setTestBoxes] = useState([]);
   const [subjects, setSubjects] = useState([]);

   const handleOptions = (index, value) => {
      const optionArray = [...options];
      optionArray[index] = value;
      setOptions(optionArray);
   };

   useEffect(() => {
      const fetchCourses = async () => {
         const response = await axios.get("http://localhost:5000/getCoursesName");
         setCourses(response.data);
      };
      fetchCourses();
   }, []);

   useEffect(() => {
      if (course) {
         const fetchTestsAndSubjects = async () => {
            const response = await axios.post("http://localhost:5000/getTestsAndSubjects", { course });
            setSubjects(response.data.subjects);
            setTestBoxes(response.data.tests);
         };
         fetchTestsAndSubjects();
      }
   }, [course]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const questionData = {
         question,
         options,
         correctAnswer,
         course,
         subject,
         level,
         testBox
      };
      try {
         const response = await axios.post("http://localhost:5000/addQuestion", questionData);
         alert(response.data);
         if (response.status === 201) {
            navigate("/addQuestion");

            // Resetting the form for further questions
            setQuestion("");
            setOptions(["", "", "", ""]);
            setCorrectAnswer("");
            setCourse("");
            setSubject("");
            setLevel("");
            setTestBox("");
         }
      } catch (err) {
         alert('Error adding question');
      }
   };

   return (
      <>
         <h2>Add Questions Panel</h2>
         <form onSubmit={handleSubmit}>

            {/* Question */}
            <label>Question :</label>
            <input
               type="text"
               value={question}
               onChange={(e) => setQuestion(e.target.value)}
               placeholder="Add question"
               required
            />

            {/* Options */}
            <label>Options :</label>
            {options.map((option, index) => (
               <input
                  type="text"
                  key={index}
                  placeholder={`Add option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptions(index, e.target.value)}
                  required
               />
            ))}

            {/* Correct Answer */}
            <label>Correct Answer :</label>
            <input
               type="text"
               placeholder="Add correct answer"
               value={correctAnswer}
               onChange={(e) => setCorrectAnswer(e.target.value)}
               required
            />

            {/* Course Options */}
            <label>Course Options :</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)} required>
               <option value="">Select Course</option>
               {courses.map((course) => (
                  <option key={course._id} value={course.course}>{course.course}</option>
               ))}
            </select>

            {/* Difficulty Level */}
            <label>Difficulty Level :</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} required>
               <option value="">Select Difficulty</option>
               <option value="Easy">Easy</option>
               <option value="Medium">Medium</option>
               <option value="Hard">Hard</option>
            </select>

            {/* TestBox Options */}
            <label>TestBox Options :</label>
            <select value={testBox} onChange={(e) => setTestBox(e.target.value)} required disabled={!course}>
               <option value="">Select TestBox</option>
               {testBoxes.map((testBox) => (
                  <option key={testBox._id} value={testBox.test}>{testBox.test}</option>
               ))}
            </select>

            {/* Subject Options */}
            <label>Subject Options :</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} required disabled={!course}>
               <option value="">Select Subject</option>
               {subjects.map((subject) => (
                  <option key={subject._id} value={subject.subject}>{subject.subject}</option>
               ))}
            </select>

            {/* Submit Button */}
            <button type="submit">Add</button>
         </form>
      </>
   );
};

export default AddQuestion;
