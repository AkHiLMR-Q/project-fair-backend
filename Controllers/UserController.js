//1 import userSchema or models
const users=require('../Models/userSchema')

const jwt=require('jsonwebtoken')

//2 Register logic
exports.register=async(req,res)=>{
    //accept data from client
    const{username,email,password}=req.body
    console.log(username,email,password);

    try{
        //check the email is already registered
        const existingUser= await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("User already registered")
        }
        else{
            const newUser= new users({
                username,
                email,
                password,
                github:"",
                livelink:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        }
    catch(err){
        res.status(300).json("register failed...")
    }
}



//Login logic

exports.login=async(req,res)=>{
    //accept data from client
    const {email,password}=req.body
    try {
        //check email and password in db
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId: existingUser._id},"itsok2024")
            console.log(token);
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(404).json('invalid email or password')
        }
        
    } catch (err) {
        res.status(500).json("login failed..."+err)
    }
}


//add profile
exports.addProfile = async (req, res) => {
    console.log('inside the addProfile method'); // Logging to indicate that the function is executed

    // Destructuring data from the request body
    const { name, github, livelink } = req.body;

    // Extracting the filename of the uploaded file (profile picture)
    const profile = req.file.filename;

    console.log(name, github, livelink, profile); // Logging extracted data

    try {
        // Checking if a profile with the same GitHub username already exists
        const existingProfile = await projects.findOne({ github });

        if (existingProfile) {
            // If a profile with the same GitHub username exists, return a 409 status with an error message
            res.status(409).json("Profile already exists");
        } else {
            // If no existing profile found, create a new profile document
            const newProfile = new projects({ name, github, livelink, profile });
            // Save the new profile document to the database
            await newProfile.save();
            // Return a 201 status with the newly created profile data
            res.status(201).json(newProfile);
        }
    } catch (err) {
        // If an error occurs during the process, return a 401 status with an error message
        res.status(401).json({ message: err.message });
    }
}
