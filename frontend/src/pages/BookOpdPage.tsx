import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";

interface Hospital {
  hospital_id: string;
  hospital_name: string;
}

interface Department {
  _id: string;
  name: string;
}


export const BookOpdPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
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
    console.log("aura")
    try {
      const res = await axiosInstance.get(`/hospital/departments/${hospitalId}`);
      setDepartments(res.data);
      console.log("dj")
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      date: selectedDate,
      time: selectedTime,
    };
    console.log(payload)

    try {
      await axiosInstance.post("/opd-booking", payload);
      alert("Booking successful!");
    } catch (error) {
      alert("Booking failed.");
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
  };

  // Time slots every 5 minutes from 10:00 AM to 3:00 PM
  const timeSlots = Array.from({ length: 61 }, (_, i) => {
    const totalMinutes = 600 + i * 5;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const suffix = hours >= 12 ? "PM" : "AM";
    const displayHour = hours > 12 ? hours - 12 : hours;
    return `${displayHour}:${minutes.toString().padStart(2, "0")}${suffix}`;
  });

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full min-h-screen bg-gray-900 text-white px-4 py-6 flex items-center  justify-start">
          <div className="flex flex-col md:flex-row w-full max-w-6xl">
            {/* Form Section - 65% */}
            <div className="md:w-[to-70%] w-full backdrop-blur-lg bg-white/3 border border-gray-700 rounded-2xl shadow-lg p-6 sm:p-10">
              <div className="">
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
                {/* Left Section */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-blue-300">
                    Patient Details
                  </h3>
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
                    <label className="block mb-1 text-sm text-gray-400">
                      Select Hospital
                    </label>

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
                    <label className="block mb-1 text-sm text-gray-400">
                      Select Department
                    </label>
                    <select
                      id=""
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      disabled={!formData.hospitalId}
                      className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition disabled:opacity-50"
                    >
                      <option value="">-- Select Department --</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Section */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-blue-300">
                    Appointment Date & Time
                  </h3>
                  <label className="hidden mb-1 text-sm text-gray-400">
                    Select Appointment Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    title="Select Appointment Date"
                    className="w-full p-3 rounded-lg bg-[#2a2a2a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />

                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Select Time Slot
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-lg text-sm border border-gray-600 transition ${
                            selectedTime === time
                              ? "bg-blue-700 text-white"
                              : "bg-[#2a2a2a] hover:bg-[#3a3a3a]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-700 hover:bg-blue-800 p-3 rounded-lg font-semibold transition"
                >
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>
          </div>
          {/* Image Section - 35% (Hidden on Mobile) */}
          <div className="hidden md:flex md:w-[35%] items-center justify-center  px-4">
            <img
              src="doctorImageInOPDbooking.png" // Make sure the image exists in public folder or replace with full URL
              alt="Doctor"
              className="w-[350px] animate-floating drop-shadow-lg opacity-90"
            />
          </div>
        </div>
      )}
    </>
  );
};
