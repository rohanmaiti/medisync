// DoctorSlotView.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Slot {
  slot_time: string;
}

interface PatientDetails {
  name: string;
  gender: string;
  profilePic: string;
  _id: string;
}

const DoctorSlotView: React.FC = () => {
  const [selectedHourSlot, setSelectedHourSlot] = useState<string>('');
  const [miniSlots, setMiniSlots] = useState<string[]>([]);
  const [selectedMiniSlot, setSelectedMiniSlot] = useState<string>('');
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);

  const hospitalId = '67d6af533e0b077883d1e20a'; // replace with actual hospital id
  const departmentId = '67d6b1343e0b077883d1e20f'; // replace with actual department id
  const date = '2025-03-16'; // replace with selected date if dynamic

  const hourSlots = ['10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 01:00 PM', '02:00 PM - 03:00 PM'];

  const generateMiniSlots = (startHour: number) => {
    const slots: string[] = [];
    for (let i = 0; i < 60; i += 5) {
      const hour = startHour > 12 ? startHour - 12 : startHour;
      const time = `${hour.toString().padStart(2, '0')}:${i.toString().padStart(2, '0')} ${startHour >= 12 ? 'PM' : 'AM'}`;
      slots.push(time);
    }
    return slots;
  };

  const handleHourSlotClick = (slot: string) => {
    setSelectedHourSlot(slot);
    const startHour = parseInt(slot.split(':')[0]);
    const slots = generateMiniSlots(startHour);
    setMiniSlots(slots);
    setPatientDetails(null);
  };

  const handleMiniSlotClick = async (time: string) => {
    setSelectedMiniSlot(time);
    try {
      const response = await axios.get('http://localhost:9000/api/slots/details', {
        params: {
          hospitalId,
          departmentId,
          date,
          time,
        },
      });
      setPatientDetails(response.data.patient);
    } catch (error) {
      console.error('Error fetching slot details:', error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Left Side - Slots */}
      <div style={{ width: '50%' }}>
        <h2>Select Time Slot</h2>
        {hourSlots.map((slot, index) => (
          <div
            key={index}
            style={{ cursor: 'pointer', marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}
            onClick={() => handleHourSlotClick(slot)}
          >
            {slot}
          </div>
        ))}

        {miniSlots.length > 0 && (
          <>
            <h3>Mini Slots</h3>
            {miniSlots.map((slot, index) => (
              <div
                key={index}
                style={{ cursor: 'pointer', marginBottom: '5px', padding: '5px', backgroundColor: slot === selectedMiniSlot ? '#d3e0ff' : '#f0f0f0' }}
                onClick={() => handleMiniSlotClick(slot)}
              >
                {slot}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Right Side - Patient Details */}
      <div style={{ width: '50%' }}>
        <h2>Patient Details</h2>
        {patientDetails ? (
          <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <img src={patientDetails.profilePic || 'https://via.placeholder.com/100'} alt="Profile" width={100} height={100} /><br />
            <strong>Name:</strong> {patientDetails.name}<br />
            <strong>Patient ID:</strong> {patientDetails._id}<br />
            <strong>Gender:</strong> {patientDetails.gender}<br />
          </div>
        ) : (
          <p>Select a mini slot to view patient details.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorSlotView;
