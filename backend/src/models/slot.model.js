const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',   // Reference to Hospital Schema
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',    // Reference to Patient Schema
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department', // Reference to Department Schema
    required: true
  },
  slot_time: {
    type: String,
    required: true
  }
});

const Slot= mongoose.model('Slot', slotSchema);
module.exports=Slot;
