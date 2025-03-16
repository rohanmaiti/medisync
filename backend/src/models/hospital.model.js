const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  hospital_applicant_name: {
    type: String,
    required: true
  },
  hospital_name: {
    type: String,
    required: true
  },
  identity_type: {
    type: String,
    required: true
  },
  identity_card: {
    type: [String], // array of image URLs or file paths
    default: []
  },
  hospital_contact_number: {
    type: String,
    unique: true,
    required: true
  },
  hospital_email: {
    type: String,
    unique: true,
    required: true
  },
  hospital_pincode: {
    type: String,
    required: true
  },
  hospital_address: {
    type: String,
    required: true
  },
  hospital_photos: {
    type: [String], // array of image URLs or file paths
    default: []
  },
  approve_status: {
    type: Boolean,
    default: false
  },
  isRejected: {
    type: Boolean,
    default: false
  }
});

const Hospital= mongoose.model('Hospital', hospitalSchema);
module.exports =Hospital;
