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

});

const Userdata = mongoose.model("Userdata",userdataSchema);


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

//Routing 

// Defining the attempt schema
const attemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Userdata', required: true }, // Reference to the user
    testId: { type: String, required: true }, // ID of the test attempted
    attemptedAt: { type: Date, default: Date.now }, // Timestamp of the attempt
});

const Attempt = mongoose.model("Attempt", attemptSchema);


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
	res.status(201).send("user registered");
});


app.post("/register-admin", async (req, res) => {
	const { username, email, password, cpassword } = req.body;
  
	if (!username || !email || !password || !cpassword) {
	  return res.status(400).send("Please provide complete information");
	}
  
	const existingUser = await Userdata.findOne({ email });
	if (existingUser) {
	  return res.status(400).send("Admin already exists");
	}
  
	if (password !== cpassword) {
	  return res.status(400).send("Passwords do not match");
	}
  
	const newAdmin = new Userdata({ username, email, password}); 
	await newAdmin.save();
	res.status(201).send("Admin registered successfully");
  });
  

app.post("/login",async(req ,res)=>{
      const {email,password} =req.body;
      if (!email || !password) {
         return res.status(400).send('Please provide both email and password');
       }
      const User = await Userdata.findOne({email,password});
      if(!User){
      	return res.status(400).send({message:'Invalid username or password'});
      }
      res.status(200).json({message:'Login successful', username:User.username , course: User.course });

});

app.post("/admin/login",async(req ,res)=>{
	const {email,password} =req.body;
	if (!email || !password) {
	   return res.status(400).send('Please provide both email and password');
	 }
	const User = await Userdata.findOne({email,password});
	if(!User){
		return res.status(400).send({message:'Invalid username or password'});
	}
	res.status(200).json({message:'Login successful', username:User.username});

});



app.post("/addQuestion",async(req,res)=>{
    const {question,options,correctAnswer,course,level,testBox} = req.body;
    const newQuestion= new TestData({question,options,correctAnswer,course,level,testBox});
    await newQuestion.save();
    res.status(201).send("added successfully");

});

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log("server is running "));