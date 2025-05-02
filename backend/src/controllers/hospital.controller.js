import Hospital from "../models/hospital.model.js";
import Slot from '../models/slot.model.js';
import User from '../models/user.model.js';
import Department from "../models/department.model.js";

export async function handleApplyForHospital(req,res){
  try {
    console.log("Request body:", req.body);
    res.status(200).json({message: "Apply hospital endpoint"});
  } catch (error) {
    res.status(500).json({message: "Error in handleApplyForHospital"});
  }
}

export async function handleGetApprovedHospitals(req,res){
  console.log("Fetching approved hospitals...");
  try {
    const hospitals = await Hospital.find({approve_status:true});
    const result = hospitals.map(hospital => {
      return {hospital_name:hospital.hospital_name, hospital_id:hospital._id};
    })
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: "Error fetching hospitals"});
  }
}

export async function getAllDepartments(req,res){
  console.log("get all department");
  try {
    const hospitalId = req.params.hospitalId;
    console.log("id is "+hospitalId)
    if (!hospitalId) {
      return res.status(400).json({ message: 'hospitalId is required' });
    }

    const departments = await Department.find({ hospital: hospitalId });
    console.log(departments);
    res.status(200).json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export async function bookAppointment(req, res) {
  const { name, age, gender, hospitalId, departmentId, date, time } = req.body;

  try {
    // Find the patient (User) based on the name
    let patient = await User.findOne({ name });
    
    if (!patient) {
      // If the patient does not exist, respond with a specific status
      return res.status(401).json({ message: 'User not found. Please log in.' });
    }

    // Check if the slot for that date, time, hospital and department is already booked
    const existingSlot = await Slot.findOne({
      hospital: hospitalId,
      department: departmentId,
      date,
      slot_time: time,
      status: 'booked'
    });

    if (existingSlot) {
      return res.status(409).json({ message: 'This slot has already been booked. Please select another slot.' });
    }

    // Create and save a new slot booking with status 'booked'
    const newSlot = new Slot({
      hospital: hospitalId,
      patient: patient._id,
      department: departmentId,
      date,
      slot_time: time,
      status: 'booked'
    });

    await newSlot.save();

    return res.status(201).json({ message: 'Booking successful!', slot: newSlot });
  } catch (error) {
    console.error('Error booking appointment:', error);
    return res.status(500).json({ message: 'Booking failed.', error: error.message });
  }
}




export async function getBookedSlots(req, res) {
  const { hospitalId, date } = req.query;
  try {
    const bookedSlots = await Slot.find({ hospital: hospitalId, date, status: 'booked' });
    res.status(200).json(bookedSlots);
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ message: 'Error fetching booked slots' });
  }
}