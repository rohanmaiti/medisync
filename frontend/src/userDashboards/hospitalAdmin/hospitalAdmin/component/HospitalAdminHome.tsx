import React, { useState } from "react";
import { Users,  BedDouble,  Plus, ClipboardList,  Settings,
Edit,  UserPlus,  Calendar,  FileText,  BarChart2,  Activity,}
from "lucide-react";

type ColorOption = "emerald" | "amber" | "olive" | "blue" | "purple" | "red";
type ActionButtonProps = {
  icon: React.ReactNode;
  text: string;
  color?: ColorOption;
  fullWidth?: boolean;
  actionto?: string;
};

export const HospitalAdminHome = () => {
  const [selectedContent, setSelectedContent] = useState<string>("");
  const renderSelectedArea = () => {
    switch (selectedContent) {
      case "addEmployee":
        return <div>Add Employee Component</div>;
      case "seeEmployees":
        return <div>Employee List Component</div>;
      case "changeDetails":
        return <div>Change Hospital Details Component</div>;
      case "bedDetails":
        return <div>Bed Details Component</div>;
      case "addBeds":
        return <div>Add Beds Component</div>;
      case "inventoryDetails":
        return <div>Inventory Details Component</div>;
      default:
        return <div>Hospital Overview</div>;
    }
  };
  // Action Button Component
  const ActionButton: React.FC<ActionButtonProps> = ({
    icon,
    text,
    color = "emerald",
    fullWidth = false,
    actionto = "",
  }) => {
    // Color mapping for Tailwind classes
    const colorMap: Record<ColorOption, string> = {
      emerald: "bg-emerald-700 hover:bg-emerald-600 text-emerald-100",
      amber: "bg-amber-700 hover:bg-amber-600 text-amber-100",
      olive: "bg-green-800 hover:bg-green-700 text-green-100", // Using green as a substitute for olive
      blue: "bg-blue-700 hover:bg-blue-600 text-blue-100",
      purple: "bg-purple-700 hover:bg-purple-600 text-purple-100",
      red: "bg-red-700 hover:bg-red-600 text-red-100",
    };

    const colorClasses =
      colorMap[color] || "bg-gray-700 hover:bg-gray-600 text-gray-100";

    return (
      <button
        onClick={() => setSelectedContent(actionto)}
        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer ${colorClasses} ${
          fullWidth ? "w-full" : ""
        }`}
      >
        {icon}
        <span className="font-medium">{text}</span>
      </button>
    );
  };
  return (
    <>
      <main className="grid md:grid-cols-3 h-full gap-6 p-6 bg-gray-800/40 ">
        {/* Left Column - Carousel */}
        <div className="md:col-span-2 ">
          <div className="h-64 md:h-96 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden relative">
            <div className="flex items-center justify-center h-full">
              {renderSelectedArea()}
            </div>
          </div>

          {/* Bottom Navigation - Now with more action buttons in a responsive grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            <ActionButton
              icon={<BedDouble size={20} />}
              text="See Bed Details"
              color="olive"
              fullWidth
            />
            <ActionButton
              icon={<Plus size={20} />}
              text="Add Beds"
              color="olive"
              fullWidth
            />
            <ActionButton
              icon={<ClipboardList size={20} />}
              text="Inventory Details"
              color="olive"
              fullWidth
            />
            <ActionButton
              icon={<Edit size={20} />}
              text="Edit Bed Details"
              color="olive"
              fullWidth
            />
            <ActionButton
              icon={<UserPlus size={20} />}
              text="Add Department"
              color="olive"
              fullWidth
            />
            <ActionButton
              icon={<Edit size={20} />}
              text="Edit Inventory Details"
              color="olive"
              fullWidth
            />
            <ActionButton
              icon={<Calendar size={20} />}
              text="Doctor & Staff Schedules"
              color="emerald"
              fullWidth
            />
            <ActionButton
              icon={<FileText size={20} />}
              text="Bed Patient Records"
              color="emerald"
              fullWidth
            />
            <ActionButton
              icon={<BarChart2 size={20} />}
              text="Reports & Analytics"
              color="emerald"
              fullWidth
            />
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-4 cursor-pointer">
            <ActionButton
              icon={<Plus size={30} />}
              text="Add Employee"
              color="amber"
              actionto="addEmployee"
              fullWidth
            />
            <ActionButton
              icon={<Users size={30} />}
              text="See Employees"
              color="amber"
              actionto="seeEmployees"
              fullWidth
            />
            <ActionButton
              icon={<Settings size={30} />}
              text="Change Hospital Details"
              color="amber"
              fullWidth
            />
            <ActionButton
              icon={<Activity size={30} />}
              text="See OPD Status"
              color="amber"
              fullWidth
            />
          </div>
          <div className="h-full rounded-md bg-amber-300 text-black hidden md:block">
            chat message
          </div>
        </div>
      </main>
    </>
  );
};
