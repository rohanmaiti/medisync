import mongoose from "mongoose";
    const departmentSchema = new mongoose.Schema({
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    },   
    dept_id: {
        type: String,
        required: true,
        unique: true
    },    
    dept_name: {
        type: String,
        required: true
    }
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;