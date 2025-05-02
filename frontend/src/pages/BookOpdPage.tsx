import React, { useEffect, useState, ReactNode } from "react";
import { axiosInstance } from "../lib/axios";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";

interface Hospital {
  hospital_id: string;
  hospital_name: string;
}

interface Department {
  dept_name: ReactNode;
  _id: string;
  name: string;
}

interface BookedSlot {
  _id: string;
  slot_time: string;
}

export const BookOpdPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    hospitalId: "",
    departmentId: "",
  });

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await axiosInstance.get("/hospital/getApprovedHospitals");
      setHospitals(res.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async (hospitalId: string) => {
    try {
      const res = await axiosInstance.get(`/hospital/departments/${hospitalId}`);
      setDepartments(res.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
    }
  };

  const fetchBookedSlots = async () => {
    if (selectedDate && formData.hospitalId) {
      try {
        const res = await axiosInstance.get(`/hospital/booked-slots?hospitalId=${formData.hospitalId}&date=${selectedDate}`);
        setBookedSlots(res.data);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    }
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      const response = await axiosInstance.post("/hospital/opd-booking", payload);
      alert(response.data.message);
      if (response.status === 201) {
        setSelectedTime("");
        fetchBookedSlots();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("User not found. Please log in.");
        navigate("/login");
      } else if (error.response && error.response.status === 409) {
        alert("This slot has already been booked. Please select another slot.");
        fetchBookedSlots();
      } else {
        alert("Booking failed.");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "hospitalId") {
      fetchDepartments(value);
      setFormData((prev) => ({ ...prev, departmentId: "" }));
    }

    setFormData({ ...formData, [name]: value });

    if (name === "selectedDate") {
      setSelectedDate(value);
      fetchBookedSlots();
    }
  };

  const isBooked = (time: string) => {
    return bookedSlots.some((slot) => slot.slot_time === time);
  };

  const timeSlots = Array.from({ length: 61 }, (_, i) => {
    const totalMinutes = 600 + i * 5;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const suffix = hours >= 12 ? "PM" : "AM";
    const displayHour = hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${minutes.toString().padStart(2, "0")} ${suffix}`;
  });

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full min-h-screen bg-gray-900 text-white px-4 py-6 flex items-center justify-start">
          <div className="flex flex-col md:flex-row w-full max-w-6xl">
            <div className="md:w-[70%] w-full backdrop-blur-lg bg-white/3 border border-gray-700 rounded-2xl shadow-lg p-6 sm:p-10">
              <div>
                <button
                  className="float-left p-2 bg-gray-700 rounded hover:bg-gray-600 hover:cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  ← Back
                </button>
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
                  Book OPD Appointment
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-blue-300">Patient Details</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Patient Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                  <input
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                  <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />

                  <div>
                    <label className="block mb-1 text-sm text-gray-400">Select Hospital</label>
                    <select
                      name="hospitalId"
                      value={formData.hospitalId}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    >
                      <option value="">-- Select Hospital --</option>
                      {hospitals.map((hosp) => (
                        <option key={hosp.hospital_id} value={hosp.hospital_id}>
                          {hosp.hospital_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm text-gray-400">Select Department</label>
                    <select
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      disabled={!formData.hospitalId}
                      className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition disabled:opacity-50"
                    >
                      <option value="">-- Select Department --</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.dept_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-blue-300">Appointment Date & Time</h3>
                  <input
                    type="date"
                    name="selectedDate"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      fetchBookedSlots();
                    }}
                    title="Select Appointment Date"
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Select Time Slot</p>
                    <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                      {timeSlots.map((slot) => {
                        const booked = isBooked(slot);
                        return (
                          <button
                            key={slot}
                            disabled={booked}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                              booked
                                ? "bg-red-700 text-white cursor-not-allowed"
                                : selectedTime === slot
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-white hover:bg-blue-500"
                            }`}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={
                      !formData.name ||
                      !formData.age ||
                      !formData.gender ||
                      !formData.hospitalId ||
                      !formData.departmentId ||
                      !selectedDate ||
                      !selectedTime
                    }
                    className="w-full py-3 mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
