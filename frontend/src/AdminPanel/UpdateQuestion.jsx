import React,{useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';


const UpdateQuestion = ()=>{
	const {questionId} = useParams();
	// const [questionData,setQuestionData] = useState(null);
	const navigate = useNavigate();
    
    const [question,setQuestion]=useState("");
    const [options,setOptions] = useState(["","","",""]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [course,setCourse]= useState("");
    const [level,setLevel] =useState("");
    const [testBox,setTestBox]=useState("");
	
	useEffect(()=>{
		const fetchQuestion = async()=>{
           try{
           	const response = await axios.get(`http://localhost:5000/getQuestion/${questionId}`);
           	setQuestion(response.data.question);
           	setOptions(response.data.options);
           	setCorrectAnswer(response.data.correctAnswer);
           	setCourse(response.data.course);
           	setLevel(response.data.level);
           	setTestBox(response.data.testBox);
           }
           catch(error){
           	console.error('Error fetching question details:', error);
           }
		};

		fetchQuestion();
	},[questionId]);
     
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.put(`http://localhost:5000/updateQuestion/${questionId}`, {
            question,
            options,
            correctAnswer,
            course,
            level,
            testBox,
          });
          
          alert(response.data.message);
          navigate("/admin/questions");
        } catch (err) {
          console.error("Error updating question:", err.response?.data || err.message);
          alert(err.response?.data.message || "Failed to update the question. Please try again.");
        }
      };
      const handleOptions=(index,value)=>{
        const optionArray=[...options];
        optionArray[index]=value;
        setOptions(optionArray);
   }


   return(
   	<>
   	<h2>Update Questions Panel</h2>
   	<form onSubmit={handleSubmit}>
      
        {/* adding question */}
   	  <label>Question :</label>
   	  <input 
   	  type="text"
      value={question}    
      onChange={(e)=>setQuestion(e.target.value)}
      required
   	   />

   	   {/* adding options */}
   	  <label>Options :</label>
   	  {options.map((option,index)=>(
         <input 
          type="text"
          key={index}
          value={option}         
          onChange={(e)=>handleOptions(index,e.target.value)}
          requried
         />
   	  	))}
      
      {/* adding correct answer */}
   	  <label>Correct Answer :</label>
   	    <input 
          type="text"
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

   	  <button type="submit">Update</button>
  
    </form>
   	</>
   	);
};
export default UpdateQuestion;