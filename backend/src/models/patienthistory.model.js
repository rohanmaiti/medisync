import mongoose from "mongoose";

const patientHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User schema
    required: true
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',     // Reference to Slot schema
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  medicine: {
    type: String,
    required: true
  },
  visit_status: {
    type: Boolean,
    default: false
  },
  secure: {
    type: Boolean,
    default: false   // true = confidential
  }
},
{timestamps:true}
);

const PatientHistory= mongoose.model('PatientHistory', patientHistorySchema);
module.exports=PatientHistory; 
