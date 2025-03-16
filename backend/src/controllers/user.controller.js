const Slot = require('../models/slot.model');
const Hospital = require('../models/hospital.model');
const Department = require('../models/department.model');

exports.bookSlot = async (req, res) => {
  try {
    const { hospitalId, departmentId, date, slotTime, patientId } = req.body;

    const existingSlot = await Slot.findOne({ hospital: hospitalId, department: departmentId, date, slot_time: slotTime });
    if (existingSlot) return res.status(400).json({ message: 'Slot already booked' });

    const newSlot = new Slot({
      hospital: hospitalId,
      department: departmentId,
      date,
      slot_time: slotTime,
      patient: patientId
    });

    await newSlot.save();
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