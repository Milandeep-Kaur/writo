import React,{useState} from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const AddCourse=()=>{
   const [course,setCourse]= useState("");
   const navigate = useNavigate();
     
   const handleSubmit= async(e)=>{
      e.preventDefault();

      try{
         const response= await axios.post("http://localhost:5000/addCourse",{course});
         alert(response.data);
           if(response.status === 201){
            navigate("/addSubject");
         
        // reseting the boxes to add further questions
         
         setCourse("");
         
      }}
      catch(err){
      	alert(err.response.data);
      }


   };
   

   return(
   	<>
   	<h2>Add Course Panel</h2>
   	<form onSubmit={handleSubmit}>
      
        {/* adding question */}
   	  <label>Course :</label>
   	  <input 
   	  type="text"
      value={course}
      onChange={(e)=>setCourse(e.target.value)}
      placeholder="add course"
      required
   	   />

     {/* Submit Button*/}

   	  <button type="submit">Add</button>
  
    </form>
   	</>
   	);
};


export default AddCourse;