import React,{useState,useEffect} from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const AddTest=()=>{
   
   const [test,setTest]= useState("");
   const [description,setDescription]= useState("");
   const [courses,setCourses] = useState([]);
   const [courseId,setCourseId] = useState("");
   const navigate = useNavigate();
   
   useEffect(()=>{
      const fetchCourses = async()=>{
      const response = await axios.get("http://localhost:5000/getCoursesName");
      setCourses(response.data);
      };
      fetchCourses();
    },[]);
   
  
  const handleSubmit= async(e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:5000/addTest", { test,description, courseId });
        if (response?.status === 201) {
            alert(response.data || "Test added successfully");
            setTest("");  // Reset subject input field
            setDescription("");  // Reset description input field
            navigate("/addQuestion");
        } else {
            alert("Unexpected response from server");
        }
    } catch (err) {
        // Ensure err.response exists to avoid accessing undefined
        alert(err.response?.data || "An error occurred while adding the subject");
    }
};


   return(
   	<>
   	<h2>Add Test Panel</h2>
   	<form onSubmit={handleSubmit}>
      
        {/* adding exam title */}
   	  <label>Exam Title :</label>
   	  <input 
   	  type="text"
      value={test}
      onChange={(e)=>setTest(e.target.value)}
      placeholder="add test name like T1,T2..etc"
      required
   	   />

   	   {/* adding description */}
   	  <label>Exam Description :</label>
      <input 
      type="text"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      placeholder="add exam description"
      />
 
        {/* adding course options */}
   	  <label>Course Options :</label>
   	  <select value={courseId} onChange={(e)=>setCourseId(e.target.value)} required>
      <option value="">Select Course</option>
      {courses.map((course)=>(   	  	
   	  	<option key={course._id} value={course._id}>{course.course}</option>
        ))}
   	  </select>


   
     {/* Submit Button*/}

   	  <button type="submit">Add</button>
  
    </form>
   	</>
   	);
};


export default AddTest;