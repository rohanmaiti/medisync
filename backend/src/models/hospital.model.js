import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  hospital_applicant_name: {
    type: String,
    required: true,
  },
  hospital_name: {
    type: String,
    required: true,
  },
  identity_type: {
    type: String,
    required: true,
  },
  identity_card: {
    type: [String], // Array of URLs or file names
    default: null,
  },
  hospital_contact_number: {
    type: String,
    unique: true,
    required: true,
  },
  hospital_email: {
    type: String,
    unique: true,
    required: true,
  },
  hospital_pincode: {
    type: String,
    required: true,
  },
  hospital_address: {
    type: String,
    required: true,
  },
  hospital_photoes: {
    type: [String], // Array of image URLs or file names
    default: null,
  },
  approve_status: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Hospital = mongoose.model("hospitals", hospitalSchema);
export default Hospital;