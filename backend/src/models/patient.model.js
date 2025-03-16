const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  // Reference to Patient History (array if multiple histories)
  patientHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientHistory'
  }]
});

const Patient= mongoose.model('Patient', patientSchema);
module.exports=Patient; 
