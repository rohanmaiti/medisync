import React, { useState } from 'react';
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
import { HospitalAdminHome } from './component/HospitalAdminHome';

// Define types
type SlideType = {
  id: number;
  content: string;
};

type NavLinkProps = {
  children: React.ReactNode;
  active?: boolean;
};

type ColorOption = 'emerald' | 'amber' | 'olive' | 'blue' | 'purple' | 'red';

type ActionButtonProps = {
  icon: React.ReactNode;
  text: string;
  color?: ColorOption;
  fullWidth?: boolean;
};

const HospitalAdminDashboard: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  
  // Slide content for the image carousel
  const slides: SlideType[] = [
    { id: 1, content: "Hospital Overview" },
    { id: 2, content: "Staff Performance" },
    { id: 3, content: "Patient Statistics" },
  ];
  
  // Function to handle slide change
  const handleSlideChange = (index: number): void => {
    setActiveSlide(index);
  };

  // Toggle menu
  const toggleMenu = (): void => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="min-w-screen min-h-screen mx-auto rounded-lg overflow-hidden border border-emerald-500/30">
        {/* Header */}
        <header className="bg-gray-800/80 p-4 border-b border-emerald-500/30 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hospital className="text-emerald-400" size={24} />
              <h1 className="text-2xl font-bold text-emerald-400">HOSPITAL ADMIN DASHBOARD</h1>
            </div>
            <div className="flex items-center">
              <nav className="hidden md:flex space-x-8 mr-8">
                <NavLink active><Home size={18} />Home</NavLink>
                <NavLink>About</NavLink>
                <NavLink>Contact</NavLink>
                <NavLink>Employees</NavLink>
              </nav>
              <button 
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-16 w-48 z-50 bg-gray-800 border border-gray-700 shadow-lg rounded-md overflow-hidden">
              <div className="md:hidden py-2 px-4">
                <NavLink active><Home size={18} />Home</NavLink>
                <NavLink>About</NavLink>
                <NavLink>Contact</NavLink>
                <NavLink>Employees</NavLink>
              </div>
              <button className="flex items-center space-x-2 w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors text-red-500">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </header>
        
        {/* Main Content */}
        <HospitalAdminHome/>
      </div>
    </div>
  );
};
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

export default HospitalAdminDashboard;