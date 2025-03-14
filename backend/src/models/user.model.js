const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        require:true,
        unique:true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    address:{
        type:String,
    },
    aadharCard:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    profilePic:{
        type:String,
        default:""
    }
},
{timestamps:true}
)

const User = mongoose.model("user",userSchema);
module.exports = User;