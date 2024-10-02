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
   cpassword : String 
});

const Userdata = mongoose.model("Userdata",userdataSchema);

//Routing 

app.post("/register",async(req ,res)=>{
	const {username,email,password,cpassword} = req.body;

	if(!username || !email || !password || !cpassword ){
		return( res.status(400).send("please provide information"));
	}

	const existingUser = await Userdata.findOne({email});
	if(existingUser){
		return(res.status(400).send("user exists"));
	}
	if(password !== cpassword){
		return(res.status(400).send("password not matched"));
	}
	const newUser = new Userdata({username,email,password});
	await newUser.save();
	res.status(201).send("user registered");
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
      res.status(200).json({message:'Login successful', username:User.username});

});

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log("server is running "));