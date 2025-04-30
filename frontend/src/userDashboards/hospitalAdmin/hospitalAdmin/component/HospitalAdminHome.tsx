
import React, { useState } from 'react'
import { 
    Hospital, 
    Users, 
    Menu, 
    BedDouble, 
    Briefcase, 
    Plus, 
    ClipboardList, 
    Settings,
    Home,
    Edit,
    UserPlus,
    Calendar,
    FileText,
    BarChart2,
    Activity,
    UserCog,
    Stethoscope,
    LogOut,
    X
  } from 'lucide-react';
type NavLinkProps = {
  children: React.ReactNode;
  active?: boolean;
};
type SlideType = {
    id: number;
    content: string;
  };
type ColorOption = 'emerald' | 'amber' | 'olive' | 'blue' | 'purple' | 'red';  
type ActionButtonProps = {
  icon: React.ReactNode;
  text: string;
  color?: ColorOption;
  fullWidth?: boolean;
};
export const HospitalAdminHome = () => {
const [activeSlide, setActiveSlide] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const handleSlideChange = (index: number): void => {
        setActiveSlide(index);
      };
      // Slide content for the image carousel
  const slides: SlideType[] = [
    { id: 1, content: "Hospital Overview" },
    { id: 2, content: "Staff Performance" },
    { id: 3, content: "Patient Statistics" },
  ];
  return (
<>
<main className="grid md:grid-cols-3 h-full gap-6 p-6 bg-gray-800/40 ">
          {/* Left Column - Carousel */}
          <div className="md:col-span-2 ">
            <div className="h-64 md:h-96 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden relative">
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <h2 className="text-2xl font-medium text-gray-300">{slides[activeSlide].content}</h2>
                  <p className="mt-2 text-gray-400">Important metrics and statistics</p>
                </div>
              </div>
              
              {/* Carousel indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {slides.map((slide, index) => (
                  <button 
                    key={slide.id}
                    onClick={() => handleSlideChange(index)}
                    className={`w-2 h-2 rounded-full ${activeSlide === index ? 'bg-emerald-500' : 'bg-gray-600'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <span className="sr-only">Slide {index + 1}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Bottom Navigation - Now with more action buttons in a responsive grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              <ActionButton icon={<BedDouble size={20} />} text="See Bed Details" color="olive" fullWidth />
              <ActionButton icon={<Plus size={20} />} text="Add Beds" color="olive" fullWidth />
              <ActionButton icon={<ClipboardList size={20} />} text="Inventory Details" color="olive" fullWidth />
              <ActionButton icon={<Edit size={20} />} text="Edit Bed Details" color="olive" fullWidth />
              <ActionButton icon={<UserPlus size={20} />} text="Add Department" color="olive" fullWidth />
              <ActionButton icon={<Edit size={20} />} text="Edit Inventory Details" color="olive" fullWidth />
              <ActionButton icon={<Calendar size={20} />} text="Doctor & Staff Schedules" color="emerald" fullWidth />
              <ActionButton icon={<FileText size={20} />} text="Bed Patient Records" color="emerald" fullWidth />
              <ActionButton icon={<BarChart2 size={20} />} text="Reports & Analytics" color="emerald" fullWidth />
            </div>
          </div>
          
          {/* Right Column - Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-4 cursor-pointer">
              <ActionButton 
                icon={<Plus size={30} />} 
                text="Add Employee" 
                color="amber"
                fullWidth
              />
              <ActionButton 
                icon={<Users size={30} />} 
                text="See Employees" 
                color="amber"
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
)
}

// Navigation Link Component
const NavLink: React.FC<NavLinkProps> = ({ children, active }) => {
    return (
      <a 
        href="#" 
        className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors hover:text-emerald-400 ${
          active ? 'text-emerald-400 font-medium' : 'text-gray-300'
        }`}
      >
        {children}
      </a>
    );
  };
  
  // Action Button Component
  const ActionButton: React.FC<ActionButtonProps> = ({ 
    icon, 
    text, 
    color = "emerald", 
    fullWidth = false 
  }) => {
    // Color mapping for Tailwind classes
    const colorMap: Record<ColorOption, string> = {
      emerald: "bg-emerald-700 hover:bg-emerald-600 text-emerald-100",
      amber: "bg-amber-700 hover:bg-amber-600 text-amber-100",
      olive: "bg-green-800 hover:bg-green-700 text-green-100", // Using green as a substitute for olive
      blue: "bg-blue-700 hover:bg-blue-600 text-blue-100",
      purple: "bg-purple-700 hover:bg-purple-600 text-purple-100",
      red: "bg-red-700 hover:bg-red-600 text-red-100"
    };
    
    const colorClasses = colorMap[color] || "bg-gray-700 hover:bg-gray-600 text-gray-100";
    
    return (
      <button className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all hover:opacity-90 active:scale-95 cursor-pointer ${colorClasses} ${fullWidth ? "w-full" : ""}`}>
        {icon}
        <span className="font-medium">{text}</span>
      </button>
    );
  };
  