const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',   // Reference to Hospital Schema
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',    // Reference to User Schema
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department', // Reference to Department Schema
    required: true
  },
  date: {
    type: String, // or Date type if you prefer
    required: true
  },
  slot_time: {
    type: String,
    required: true
  },
  visit_status:{
    type:Boolean,
    default: false
  }
}, { timestamps: true });

const Slot= mongoose.model('Slot', slotSchema);
module.exports=Slot;
