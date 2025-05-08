import mongoose, { SchemaTypes } from "mongoose";
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone_number: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["doctor", "inventory_manager", "hospital_admin", "receptionist"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hospital_id:{
    ref:"hospitals",
    type:mongoose.Schema.Types.ObjectId,
    require:true
  }

}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
