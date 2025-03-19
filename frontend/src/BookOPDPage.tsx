import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, addDays } from 'date-fns';

interface Hospital {
  _id: string;
  hospital_name: string;
}

interface Department {
  _id: string;
  dept_name: string;
}

const BookOPDPage: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [patientId, setPatientId] = useState<string>('');

  const today = new Date();
  const maxDate = addDays(today, 5);

  const slotTimings: string[] = [
    '10:00 AM', '10:05 AM', '10:10 AM',
    '10:15 AM', '10:20 AM', '10:25 AM',
    '10:30 AM', '10:35 AM', '10:40 AM'
  ];

  useEffect(() => {
    axios.get<Hospital[]>('http://localhost:9000/hospitals').then(res => setHospitals(res.data));
  }, []);

  const handleHospitalChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hospitalId = e.target.value;
    setSelectedHospital(hospitalId);
    setSelectedDepartment('');
    const res = await axios.get<Department[]>(`http://localhost:9000/departments/${hospitalId}`);
    setDepartments(res.data);
  };

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedHospital && selectedDepartment && date) {
        try {
          const res = await axios.get<string[]>('http://localhost:9000/slots/available', {
            params: {
              hospital: selectedHospital,
              department: selectedDepartment,
              date,
            },
          });
          setAvailableSlots(res.data);
        } catch (err) {
          console.error('Error fetching available slots:', err);
        }
      }
    };
    fetchAvailableSlots();
  }, [selectedHospital, selectedDepartment, date,patientId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patientId.trim()) {
      alert('Please enter a valid Patient ID');
      return;
    }

    const payload = {
      hospitalId: selectedHospital,
      departmentId: selectedDepartment,
      date,
      slotTime: selectedSlot,
      patientId: patientId,
    };

    try {
      await axios.post('http://localhost:9000/book', payload);
      alert('Slot booked successfully');
      setSelectedSlot('');
      setPatientId('');
    } catch (err) {
      alert('Failed to book slot');
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* Left Side */}
      <div className="p-4 space-y-4 border rounded shadow">
        <h2 className="text-xl font-semibold">Book OPD</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Patient ID</label>
            <input
              type="text"
              value={patientId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPatientId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Hospital</label>
            <select
              value={selectedHospital}
              onChange={handleHospitalChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">-- Choose Hospital --</option>
              {hospitals.map(h => (
                <option key={h._id} value={h._id}>
                  {h.hospital_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Department</label>
            <select
              value={selectedDepartment}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDepartment(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">-- Choose Department --</option>
              {departments.map(dep => (
                <option key={dep._id} value={dep._id}>
                  {dep.dept_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
              min={format(today, 'yyyy-MM-dd')}
              max={format(maxDate, 'yyyy-MM-dd')}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Time Slot</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedSlot}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSlot(e.target.value)}
              required
            >
              <option value="">-- Choose Slot --</option>
              {slotTimings.map((slot, index) => (
                <option key={index} value={slot} disabled={!availableSlots.includes(slot)}>
                  {slot} {availableSlots.includes(slot) ? '' : '(Not Available)'}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            disabled={!selectedSlot}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Side - Slot Timings */}
      <div className="p-4 space-y-4 border rounded shadow">
        <h2 className="text-xl font-semibold">Available Slot Timings</h2>
        <div className="grid grid-cols-3 gap-3">
          {slotTimings.map((slot, index) => {
            const isAvailable = availableSlots.includes(slot);
            const isSelected = selectedSlot === slot;
            return (
              <div
                key={index}
                className={`p-2 border rounded text-center cursor-pointer transition duration-200 ease-in-out ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : isAvailable
                    ? 'bg-gray-100 hover:bg-gray-200'
                    : 'bg-red-100 text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => isAvailable && setSelectedSlot(slot)}
              >
                {slot}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookOPDPage;
