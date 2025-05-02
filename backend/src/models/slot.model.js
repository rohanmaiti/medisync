import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  slot_time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available'
  },
  visit_status: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;
