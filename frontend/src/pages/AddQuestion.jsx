import React,{useState} from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const AddQuestion=()=>{
   const [question,setQuestion]=useState("");
   const [options,setOptions] = useState(["","","",""]);
   const [correctAnswer, setCorrectAnswer] = useState("");
   const [course,setCourse]= useState("");
   const [level,setLevel] =useState("");
   const [testBox,setTestBox]=useState("");
   const navigate = useNavigate();
   
   const handleOptions=(index,value)=>{
        const optionArray=[...options];
        optionArray[index]=value;
        setOptions(optionArray);
   }

   
   const handleSubmit= async(e)=>{
      e.preventDefault();

      const questionData={
        question,
        options,
        correctAnswer,
        course,
        level,
        testBox
      };
      try{
         const response= await axios.post("http://localhost:5000/addQuestion",questionData);
         alert(response.data);
           if(response.status === 201){
            navigate("/addQuestion");
         
        // reseting the boxes to add further questions
         setQuestion("");
         setOptions(["","","",""]);
         setCorrectAnswer("");
         setCourse("");
         setLevel("");
         setTestBox("");
      }}
      catch(err){
      	 alert('Error adding question');
      }


   };
   

   return(
   	<>
   	<h2>Add Questions Panel</h2>
   	<form onSubmit={handleSubmit}>
      
        {/* adding question */}
   	  <label>Question :</label>
   	  <input 
   	  type="text"
      value={question}
      onChange={(e)=>setQuestion(e.target.value)}
      placeholder="add question"
      required
   	   />

   	   {/* adding options */}
   	  <label>Options :</label>
   	  {options.map((option,index)=>(
         <input 
          type="text"
          key={index}
          placeholder={`add option ${index+1}`}
          value={option}
          onChange={(e)=>handleOptions(index,e.target.value)}
          requried
         />
   	  	))}
      
      {/* adding correct answer */}
   	  <label>Correct Answer :</label>
   	    <input 
          type="text"
          placeholder="add correct answer"
          value={correctAnswer}
          onChange={(e)=>setCorrectAnswer(e.target.value)}
          requried
        />

        {/* adding course options */}
   	  <label>Course Options :</label>
   	  <select value={course} onChange={(e)=>setCourse(e.target.value)} required>
   	  	<option value="">Select Course</option>
   	  	<option value="10th">10th</option>
   	  	<option value="12th">12th</option>
   	  	<option value="JEE">JEE</option>
   	  	<option value="NEET">NEET</option>
   	  </select>


   	    {/* adding different levels */}
   	  <label>Difficulty Level :</label>
   	  <select value={level} onChange={(e)=>setLevel(e.target.value)} required>
   	  	<option value="">Select Difficulty</option>
   	  	<option value="Easy">Easy</option>
   	  	<option value="Medium">Medium</option>
   	  	<option value="Hard">Hard</option>
   	  </select>



  
   	    {/* adding testbox options */}
   	  <label>TestBox Options :</label>
   	  <select value={testBox} onChange={(e)=>setTestBox(e.target.value)} required>
   	  	<option value="">Select TestBox</option>
   	  	<option value="t1">Test 1</option>
   	  	<option value="t2">Test 2</option>
   	  	<option value="t3">Test 3</option>
   	  	<option value="t4">Test 4</option>
   	  </select>


     {/* Submit Button*/}

   	  <button type="submit">Add</button>
  
    </form>
   	</>
   	);
};


export default AddQuestion;