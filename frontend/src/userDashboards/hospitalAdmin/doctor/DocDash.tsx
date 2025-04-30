import React, { useState } from "react";
import {
  Search,
  MinusCircle,
  PlusCircle,
  Calendar,
  Clock,
  User,
  FileText,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  UserCircle,
  Pill,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

// Type definitions
interface Medicine {
  id: number;
  name: string;
  quantity: number;
}

interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  patientId: string;
  profilePicture: string;
}

interface NavLinkProps {
  children: React.ReactNode;
  active?: boolean;
  color?: string;
}

const DocDash: React.FC = () => {
  const [searchMedicine, setSearchMedicine] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  const [medicineOptions, setMedicineOptions] = useState<Medicine[]>([
    { id: 1, name: "Amoxicillin 500mg", quantity: 0 },
    { id: 2, name: "Paracetamol 650mg", quantity: 0 },
    { id: 3, name: "Aspirin 75mg", quantity: 0 },
    { id: 4, name: "Cetirizine 10mg", quantity: 0 },
    { id: 5, name: "Omeprazole 20mg", quantity: 0 },
  ]);
  const [showMedicineDropdown, setShowMedicineDropdown] =
    useState<boolean>(false);

  // Generate time slots from 10 AM to 3 PM in 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 15; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        // Skip 3:15, 3:30, 3:45
        if (hour === 15 && minute > 0) continue;

        const ampm = hour >= 12 ? "PM" : "AM";
        const hourDisplay = hour > 12 ? hour - 12 : hour;
        const minuteDisplay = minute.toString().padStart(2, "0");
        slots.push(`${hourDisplay}:${minuteDisplay} ${ampm}`);
      }
    }
    return slots;
  };

  const appointmentTimes = generateTimeSlots();

  const patientInfo: PatientInfo = {
    name: "John Smith",
    age: 42,
    gender: "Male",
    patientId: "PT-7842",
    profilePicture: "/api/placeholder/64/64",
  };

  // Functions
  const handleAddMedicine = (): void => {
    if (searchMedicine.trim() !== "") {
      const newMedicine: Medicine = {
        id: Date.now(),
        name: searchMedicine,
        quantity: quantity,
      };
      setSelectedMedicines([...selectedMedicines, newMedicine]);
      setSearchMedicine("");
      setQuantity(1);
    }
  };

  const handleRemoveMedicine = (id: number): void => {
    setSelectedMedicines(
      selectedMedicines.filter((medicine) => medicine.id !== id)
    );
  };

  const incrementQuantity = (): void => setQuantity((prev) => prev + 1);
  const decrementQuantity = (): void =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleTimeSelect = (time: string): void => setSelectedTime(time);

  const handleMedicineSelect = (medicine: Medicine): void => {
    setSearchMedicine(medicine.name);
    setShowMedicineDropdown(false);
  };

  const markVisited = (): void => {
    // Logic to mark patient as visited
    console.log("Patient marked as visited");
    alert("Patient marked as visited successfully!");
  };

  return (
    <div className="w-full bg-gray-900 text-gray-200">
      {/* Navigation Bar */}
      <header className="bg-gray-800 p-4 border-b border-blue-500/30 flex items-center justify-between fixed w-full">
        <div className="flex items-center space-x-2">
          <Calendar className="text-blue-400" size={24} />
          <h1 className="text-xl font-bold text-blue-400">DOCTOR DASHBOARD</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink active>
            <Home size={18} />
            Home
          </NavLink>
          <NavLink>
            <Calendar size={18} />
            Appointments
          </NavLink>
          <NavLink>
            <FileText size={18} />
            Records
          </NavLink>
          <NavLink color="red">
            <LogOut size={18} />
            Logout
          </NavLink>
        </div>

        <button
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-blue-500/30">
          <NavLink active>
            <Home size={18} />
            Home
          </NavLink>
          <NavLink>
            <Calendar size={18} />
            Appointments
          </NavLink>
          <NavLink>
            <FileText size={18} />
            Records
          </NavLink>
          <NavLink color="red">
            <LogOut size={18} />
            Logout
          </NavLink>
        </div>
      )}
      <main className="grid md:grid-cols-5 gap-4   pt-24 max-h-screen overflow-y-auto">
        {/* Left Column - Appointment Selection */}
        <div className="md:col-span-1  rounded-lg border border-gray-700 p-4 flex flex-col">
          <div className="mb-6 ">
            <label className="block text-gray-300 mb-2">Appointment ID</label>
            <input
              type="text"
              value={appointmentId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAppointmentId(e.target.value)
              }
              placeholder="Enter appointment ID"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4  pb-3 w-full flex flex-col h-full">
            <h3 className="text-gray-300 mb-2 flex items-center">
              <Clock size={16} className="mr-2 text-blue-400" />
              Time Slots
            </h3>
            <div className="overflow-y-auto h-[425px] flex flex-col gap-2">
              {appointmentTimes.map((time, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(time)}
                  className={`w-[90%] p-2 rounded-lg text-gray-200 ${
                    selectedTime === time
                      ? "bg-blue-500"
                      : "bg-gray-600 hover:bg-gray-500 hover:cursor-pointer "
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Added Medicines List */}
        <div className="pb-3 col-span-1 bg-gray-800/80  overflow-y-scroll  rounded-lg border border-gray-700 p-4">
          <h3 className="text-gray-300 mb-2 flex items-center">
            <Pill size={16} className="mr-2 text-blue-400" />
            Prescribed Medicines
          </h3>
          <div className="bg-gray-700 rounded-lg p-2 border border-gray-600">
            {selectedMedicines.length > 0 ? (
              <ul className="space-y-2">
                {selectedMedicines.map((medicine) => (
                  <li
                    key={medicine.id}
                    className="flex items-center justify-between bg-gray-800 p-2 rounded"
                  >
                    <div>
                      <span className="text-blue-400">{medicine.name}</span>
                      <span className="text-gray-400 text-sm ml-2">
                        × {medicine.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveMedicine(medicine.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 text-center py-2">
                Add medicines to the prescription
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-3">
          {/* Patient Info */}
          <div className="bg-gray-800/80 rounded-lg border border-gray-700 p-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  <UserCircle size={48} className="text-blue-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-medium text-white truncate">
                  {patientInfo.name}
                </h2>
                <div className="flex flex-wrap text-sm text-gray-400">
                  <span className="mr-4">Age: {patientInfo.age}</span>
                  <span>Gender: {patientInfo.gender}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium text-blue-400">
                  {patientInfo.patientId}
                </div>
              </div>
            </div>
          </div>

          {/* Prescription Area */}
          <div className="bg-green-800/80 rounded-lg border border-gray-700 p-4 min-h-[510px]">
            {/* Medicine Search */}
            <div className="mb-4 relative">
              <label className="block text-gray-300 mb-2">
                Search Medicine
              </label>
              <div className="flex">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchMedicine}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchMedicine(e.target.value);
                      setShowMedicineDropdown(true);
                    }}
                    onFocus={() => setShowMedicineDropdown(true)}
                    placeholder="Search medicine name"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <Search
                    className="absolute right-3 top-3 text-gray-400"
                    size={20}
                  />

                  {/* Dropdown for medicine selection */}
                  {showMedicineDropdown && searchMedicine && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                      {medicineOptions
                        .filter((med) =>
                          med.name
                            .toLowerCase()
                            .includes(searchMedicine.toLowerCase())
                        )
                        .map((medicine) => (
                          <div
                            key={medicine.id}
                            className="p-2 hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleMedicineSelect(medicine)}
                          >
                            {medicine.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Control */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="p-2 bg-gray-700 border border-gray-600 rounded-l-lg hover:bg-gray-600"
                >
                  <MinusCircle size={20} />
                </button>
                <div className="px-4 py-2 bg-gray-700 border-y border-gray-600 text-center">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  className="p-2 bg-gray-700 border border-gray-600 rounded-r-lg hover:bg-gray-600"
                >
                  <PlusCircle size={20} />
                </button>

                <button
                  onClick={handleAddMedicine}
                  className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                placeholder="Write prescription instructions and notes"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 h-32"
              />
            </div>

            {/* Mark Visited Button */}
            <div className="text-right">
              <button
                onClick={markVisited}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 flex items-center ml-auto"
              >
                <CheckCircle2 size={18} className="mr-2" />
                Mark as Visited
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Navigation Link Component
const NavLink: React.FC<NavLinkProps> = ({ children, active, color }) => {
  const baseClasses =
    "flex items-center space-x-2 px-4 py-3 rounded-md transition-colors";

  let colorClasses = "hover:bg-gray-700 text-gray-300 hover:text-blue-400";

  if (active) {
    colorClasses = "bg-gray-700 text-blue-400 font-medium";
  }

  if (color === "red") {
    colorClasses = "hover:bg-gray-700 text-red-500 hover:text-red-400";
  }

  return (
    <a href="#" className={`${baseClasses} ${colorClasses}`}>
      {children}
    </a>
  );
};

export default DocDash;
