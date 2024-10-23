const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//connect to mongo database
mongoose.connect("mongodb://localhost:27017/writo",{
	useNewUrlParser: true,
  useUnifiedTopology: true,
});

//defining the user schema
const userdataSchema = new mongoose.Schema({
   username : String,
   email : String , 
   password : String , 
   cpassword : String,
   course: String,
   mobile: {
    type: String, // You can also use Number type if needed
    required: false, // Make it optional for now
  }

});

const Userdata = mongoose.model("Userdata",userdataSchema);


// defining the admin schema
const admindataSchema = new mongoose.Schema({
   username : String,
   email : String , 
   password : String , 
   cpassword : String,
   
});

const Admindata = mongoose.model("Admindata",admindataSchema);


// defining the test schema
const testDataSchema =new mongoose.Schema({
	    question : String,
        options :[String],
        correctAnswer :String,
        course :String,
        level :String,
        testBox :String
});
const TestData = mongoose.model("TestData",testDataSchema);


// Defining the attempt schema
const attemptDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Userdata', required: true }, // Reference to the user
    name:String,
    course:String,
    
    statusT1:{type:String , default:"not attempted"},
    startT1:{type:Date ,default:null},
    endT1:{type:Date ,default:null},
    
    statusT2:{type:String , default:"not attempted"},
    startT2:{type:Date ,default:null},
    endT2:{type:Date ,default:null},
    
    statusT3:{type:String , default:"not attempted"},
    startT3:{type:Date ,default:null},
    endT3:{type:Date ,default:null},

});

const AttemptData = mongoose.model("AttemptData", attemptDataSchema);



// Defining the result schema
const resultDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Userdata', required: true }, // Reference to the user
    name:String,
    course:String,
    
    statusT1:{type:String , default:null},
    scoreT1:{type:String , default:null},
        
    statusT2:{type:String , default:null},
    scoreT2:{type:String , default:null},
        
    statusT3:{type:String , default:null},
    scoreT3:{type:String , default:null},
    
});

const ResultData = mongoose.model("ResultData", resultDataSchema);


// user registeration page -------------------------------------------------------------------------------------------------------
app.post("/register",async(req ,res)=>{
	const {username,email,password,cpassword,course} = req.body;

	if(!username || !email || !password || !cpassword || !course ){
		return( res.status(400).send("please provide information"));
	}

	const existingUser = await Userdata.findOne({email});
	if(existingUser){
		return(res.status(400).send("user exists"));
	}
	if(password !== cpassword){
		return(res.status(400).send("password not matched"));
	}
	const newUser = new Userdata({username,email,password,course});
	await newUser.save();

	const newAttempt = new AttemptData({
		   userId :newUser._id,
		   name:username,
		   course:course,
		   //all the rest things are defaultly so no need to add them specifically
	   });
    await newAttempt.save();
	res.status(201).send("user registered");
});


//  user login page ------------------------------------------------------------------------------------------------------------------
app.post("/login",async(req ,res)=>{
      const {email,password} =req.body;
      if (!email || !password) {
         return res.status(400).send('Please provide both email and password');
       }
      const User = await Userdata.findOne({email,password});
      if(!User){
      	return res.status(400).send({message:'Invalid username or password'});
      }
      res.status(200).json({message:'Login successful', userId:User._id ,username:User.username , course: User.course });

});

// app.post("/profile",async(req,res)=>{
//     const {userId} = req.body;
//     if(!userId){
//        return res.status(400).send("error in fetching");
//     }
//     const Profile = await Userdata.findOne({userId});
//     res.json(Profile);
// });

app.post("/profile", async (req, res) => {
  const { userId } = req.body;
  let _id  =userId;
  if (!userId) {
    return res.status(400).send("Error in fetching profile: Missing userId");
  }

  try {
    const profile = await Userdata.findOne({ _id });
    
    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send("Server error");
  }
});


//add mobile number to the existing user
app.post("/addMobile",async(req,res)=>{
  const { userId, mobile } = req.body;
  let _id = userId;
  if (!userId || !mobile) {
    return res.status(400).send('User ID and mobile number are required.');
  }
  const user = await Userdata.findOne({ _id });
  if (!user) {
      return res.status(404).send('User not found');
  }
  if (!user.mobile) {
      user.mobile = mobile;
      await user.save();

    }
     res.json({message:"Mobile added successfully",user});

});

// before starting test it will check fot the attempt of that test ---------------------------------------------------------------------
app.post("/startTest",async(req,res)=>{
    const {userId,username,course,testId} =req.body;
    const user = await AttemptData.findOne({userId,course});
    console.log(user);
    if(!user){
    	return res.status(400).send("Attempt Data Not Found");
    }
    
    if(testId==="t1" && user.statusT1 !== "not attempted"){
    	return res.status(400).send("Test1 Attempted Before");
    }
    if(testId==="t2" && user.statusT2 !== "not attempted"){
    	return res.status(400).send("Test2 Attempted Before");
    }
    if(testId==="t3" && user.statusT3 !== "not attempted"){
    	return res.status(400).send("Test3 Attempted Before");
    }

    const startTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    if(testId==="t1"){
    	user.statusT1 = "in-progress";
    	user.startT1 = startTime;
    }
    else if(testId==="t2"){
    	user.statusT2 = "in-progress";
    	user.startT2 = startTime;
    }
    else if(testId==="t3"){
    	user.statusT3 = "in-progress";
    	user.startT3 = startTime;
    }
    await user.save();
    return res.status(200).send({message: `Test ${testId} has started successfully`});
});


// Fetch questions for a specific test using an aggregate pipeline ------------------------------------------------------
app.post("/fetchQuestions", async (req, res) => {
    const { course, testId } = req.body;

    try {
        const questions = await TestData.aggregate([
            { $match: { course: course, testBox: testId } },  // Use testId here
            { $sample: { size: 2 } }
        ]);

        if (questions.length === 0) {
            return res.status(400).send("No questions found for the selected course and test. ");
        }

        return res.status(200).json({ questions });
    } catch (error) {
        console.error("Error fetching questions:", error);
        return res.status(500).send("Error fetching questions");
    }
});


//End Test Page-----------------------------------------------------------------------------------------------------------------------------
app.post('/endTest', async (req, res) => {
    const { userId,username, course, testId, answers, questionIds } = req.body;

    try {
        const user = await AttemptData.findOne({ userId, course });

        // Prevent re-attempting the same test after completion
        if ((testId === "t1" && user.statusT1 === "completed") ||
            (testId === "t2" && user.statusT2 === "completed") ||
            (testId === "t3" && user.statusT3 === "completed")) {
            return res.status(400).send("Test Attempted Before");
        }

        // Fetch questions that appeared in the test
        const questions = await TestData.find({ _id: { $in: questionIds }, course, testBox: testId });

        let score = 0;
        let feedback =[];

        // Compare user's answers with correct answers
        questions.forEach((question) => {
            const userAnswer = answers[question._id];
            const isCorrect = userAnswer===question.correctAnswer;

        //array of objects of feedback
            feedback.push({
               questionId : question._id,
               question: question.question,
               correctAnswer: question.correctAnswer,
               userAnswer: userAnswer || "Not Answered",
               isCorrect: isCorrect,
            });

            if (isCorrect) {
                 score += 1;
            }
        });
        
        const totalQuestions = questions.length;
        const passingScore = Math.ceil(totalQuestions / 2); // Half of the total questions
        const status = score >= passingScore ? 'Passed' : 'Failed';
        
        const endTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

        // Update the user's test status
        if (testId === 't1') {
            user.statusT1 = "completed";
            user.endT1 = endTime;
        } else if (testId === 't2') {
            user.statusT2 = "completed";
            user.endT2 = endTime;
        } else if (testId === 't3') {
            user.statusT3 = "completed";
            user.endT3 = endTime;
        }
        await user.save();
        

       // Check if a result document for this user already exists
        let result = await ResultData.findOne({ userId: userId });

        if (result) {
            // If a document exists, update it based on the testId
            if (testId === "t1") {
                result.statusT1 = status;
                result.scoreT1 = score;
            } else if (testId === "t2") {
                result.statusT2 = status;
                result.scoreT2 = score;
            } else if (testId === "t3") {
                result.statusT3 = status;
                result.scoreT3 = score;
            }

            await result.save();
        } 
        else {
            // If no document exists, create a new one
            result = new ResultData({
                userId: userId,
                name: username,
                course: course,
                statusT1: testId === "t1" ? status : undefined,
                scoreT1: testId === "t1" ? score : undefined,
                statusT2: testId === "t2" ? status : undefined,
                scoreT2: testId === "t2" ? score : undefined,
                statusT3: testId === "t3" ? status : undefined,
                scoreT3: testId === "t3" ? score : undefined,
            });

            await result.save();
        }
    
        // Send the feedback object to the client
        res.status(200).send({ feedback,score,status });
    } 

    catch (err) {
        console.error('Error ending test:', err);
        res.status(500).send('Error ending test');
    }
});


//Result Data Page---------------------------------------------------------------------------------------------------------------------------
app.post('/fetchResult',async(req,res)=>{
     const {userId} = req.body;
     const result = await ResultData.findOne({userId});
     const attempt = await AttemptData.findOne({userId});
     if(!result || !attempt){
        return res.status(400).send("No test given");
     }
     res.status(200).send({result,attempt});
});
// admin registeration page -----------------------------------------------------------------------------------------------------------------
app.post("/register-admin", async (req, res) => {
	const { username, email, password, cpassword } = req.body;
  
	if (!username || !email || !password || !cpassword) {
	  return res.status(400).send("Please provide complete information");
	}
  
	const existingUser = await Admindata.findOne({ email });
	if (existingUser) {
	  return res.status(400).send("Admin already exists");
	}
  
	if (password !== cpassword) {
	  return res.status(400).send("Passwords do not match");
	}
  
	const newAdmin = new Admindata({ username, email, password}); 
	await newAdmin.save();
	res.status(201).send("Admin registered successfully");
  });
  

// admin login page ---------------------------------------------------------------------------------------------------------------
app.post("/admin/login",async(req ,res)=>{
	const {email,password} =req.body;
	if (!email || !password) {
	   return res.status(400).send('Please provide both email and password');
	 }
	const Admin = await Admindata.findOne({email,password});
	if(!Admin){
		return res.status(400).send({message:'Invalid username or password'});
	}
	res.status(200).json({message:'Login successful', username:Admin.username});

});


// Fetch all registered students
app.get('/admin/students', async (req, res) => {
    try {
      const students = await Userdata.find();
      res.json(students);
    }
     catch (error) {
      console.error('Error fetching student data:', error);
      res.status(500).send('Server error');
    }
  });


// Fetch all result of all students of particular course
app.post('/admin/scoreboard', async (req, res) => {
    try {
      let {course} = req.body;
      course = course.toUpperCase();
      const students = await ResultData.find({course});
      res.json(students);
    }
     catch (error) {
      console.error('Error fetching student data:', error);
      res.status(500).send('Server error');
    }
  });
// app.post('/admin/scoreboard', async (req, res) => {
//     try {
//       let { course } = req.body;   // Destructure course from req.body
//       course = course.toUpperCase();  // Convert course to uppercase

//       const students = await ResultData.find({ course });
      
//       res.json(students);
//     }
//     catch (error) {
//       console.error('Error fetching student data:', error);
//       res.status(500).send('Server error');
//     }
// });

// question adding page---------------------------------------------------------------------------------------------------------
app.post("/addQuestion",async(req,res)=>{
    const {question,options,correctAnswer,course,level,testBox} = req.body;
    const newQuestion= new TestData({question,options,correctAnswer,course,level,testBox});
    await newQuestion.save();
    res.status(201).send("added successfully");

});


//server listening port ---------------------------------------------------------------------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port,()=>console.log("server is running "));