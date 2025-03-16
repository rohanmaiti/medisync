const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone_number: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['doctor', 'enventory_manager', 'hospital_admin', 'receptionist'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address:{
    type:String,
    require:true
  }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
