// const Slot = require('../models/slot.model');
// const Hospital = require('../models/hospital.model');
// const Department = require('../models/department.model');

// exports.bookSlot = async (req, res) => {
//   try {
//     // console.log(req.body);
//     const { hospitalId, departmentId, date, slotTime, patientId } = req.body;

//     const existingSlot = await Slot.findOne({ hospital: hospitalId, department: departmentId, date, slot_time: slotTime });
//     if (existingSlot) return res.status(400).json({ message: 'Slot already booked' });
//     const newSlot = new Slot({
//         hospital: hospitalId,
//         department: departmentId,
//         date:date,
//         slot_time: slotTime,
//         patient: patientId
//     });
//     console.log(req.body);
//     console.log(newSlot);
    
//     await newSlot.save();
//     console.log("amit");
//     res.status(200).json({ message: 'Slot booked successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// };

// exports.getHospitals = async (req, res) => {
//   try {
//     const hospitals = await Hospital.find();
//     res.status(200).json(hospitals);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching hospitals', error });
//   }
// };

// exports.getDepartmentsByHospital = async (req, res) => {
//   try {
//     const departments = await Department.find({ hospital: req.params.hospitalId });
//     res.status(200).json(departments);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching departments', error });
//   }
// };








const Slot = require('../models/slot.model');
const Hospital = require('../models/hospital.model');
const Department = require('../models/department.model');

exports.bookSlot = async (req, res) => {
  try {
    // console.log(req.body);
    const { hospitalId, departmentId, date, slotTime, patientId } = req.body;

    const existingSlot = await Slot.findOne({ hospital: hospitalId, department: departmentId, date, slot_time: slotTime });
    if (existingSlot) return res.status(400).json({ message: 'Slot already booked' });

    const newSlot = new Slot({
      hospital: hospitalId,
      department: departmentId,
      date: date,
      slot_time: slotTime,
      patient: patientId
    });

    await newSlot.save();
    console.log("amit");
    res.status(200).json({ message: 'Slot booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospitals', error });
  }
};

exports.getDepartmentsByHospital = async (req, res) => {
  try {
    const departments = await Department.find({ hospital: req.params.hospitalId });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error });
  }
};

// ✅ NEW: Get Available Slots for frontend (exclude booked ones)
exports.getAvailableSlots = async (req, res) => {
  try {
    const { hospital, department, date } = req.query;
    const bookedSlots = await Slot.find({ hospital, department, date }).select('slot_time');
    const bookedSlotTimes = bookedSlots.map(slot => slot.slot_time);

    const allSlots = [
      '10:00 AM', '10:05 AM', '10:10 AM',
      '10:15 AM', '10:20 AM', '10:25 AM',
      '10:30 AM', '10:35 AM', '10:40 AM'
    ];

    const availableSlots = allSlots.filter(slot => !bookedSlotTimes.includes(slot));
    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available slots', error });
  }
};
