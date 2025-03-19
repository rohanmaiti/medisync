const Slot = require('../models/slot.model');
const User = require('../models/user.model');

exports.getSlotDetails = async (req, res) => {
  try {
    const { hospitalId, departmentId, date, time } = req.query;

    if (!hospitalId || !departmentId || !date || !time) {
      return res.status(400).json({ message: 'Missing required query parameters' });
    }

    // Find the slot
    const slot = await Slot.findOne({
      hospital: hospitalId,
      department: departmentId,
      date,
      slot_time: time
    }).populate('patient'); // populate patient details

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // Send only required patient info
    const patient = {
      name: slot.patient?.name || '',
      gender: slot.patient?.gender || '',
      profilePic: slot.patient?.profilePic || '',
      patientId: slot.patient?._id || ''
    };

    return res.status(200).json({ slotTime: slot.slot_time, patient });

  } catch (error) {
    console.error('Error fetching slot details:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
