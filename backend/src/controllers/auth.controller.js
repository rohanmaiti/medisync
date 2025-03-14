const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../lib/utils.js");
const cloudinary = require("../lib/cloudinary.js")

// SIGNUP
async function signup(req,res){
    console.log("signup route");
    try {
    const {email, fullName, password} = req.body;
    if(!email || !fullName || !password){
        return res.status(400).send({message:"All fields are required"});
    }
    if(password.length < 6){
        return res.status(400).send({message:"Password must be at least 6 characters long"});
    }
    var user = await User.findOne({email:email});
    console.log("usr", user);
    if(user){
        return res.status(400).send({message:"email already exists"});
    }
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // creating a new user
    const newUser = new User({email:email,fullName:fullName, password:hashedPassword});
    
    if(newUser){
    // JWT AUTHENTICATION HERE
        generateToken(newUser._id, res);
        await newUser.save();
        return res.status(201).send(newUser);
    }
    else{
        return res.satus(400).send({message:"User not created"});
    }
    } 
    catch (error) {
    res.status(500).send({message:"Server Error "+error.message});
    }
    

}

// LOGIN
async function login(req,res){
    try{
    console.log("login route");
    const {email , password} = req.body;

    const user =await User.findOne({email:email});
    if(!user){
        return res.status(400).send({message:"Invalid Credentials"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).send({message:"Invalid Credentials, password not matched"});
    }
    else{
    generateToken(user._id, res);
    return res.status(200).send(user);
    }
    
    }
    catch(err){
        return res.status(500).send({message:"Server Error "+err.message});
    }
}

// LOGOUT
function logout(req,res){
    try {
        res.clearCookie("jwt");
        res.status(200).send({message:"Logged Out"});
    } catch (error) {
        res.status(500).send({message:"Server Error "+error.message});
    }
   
}

 

// UPDATE PROFILE
async function updateProfile(req,res){
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
    
        if (!profilePic) {
          return res.status(400).json({ message: "Profile pic is required" });
        }
    
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profilePic: uploadResponse.secure_url },
          { new: true }
        );
    
        res.status(200).json(updatedUser);
      } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}

// CHECK AUTH FOR HANDLING REQUEST
function checkAuth(req,res){
    console.log("checkauth route")
    try {
        res.status(200).json(req.user); 
    } catch (error) {
        res.status(500).json({message:"server error "+error.message});
    }
}

module.exports = {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth
}