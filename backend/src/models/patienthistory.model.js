const mongoose = require("mongoose");

const patientHistorySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',  // Reference to Patient schema
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
});

const PatientHistory= mongoose.model('PatientHistory', patientHistorySchema);
module.exports=PatientHistory; 
