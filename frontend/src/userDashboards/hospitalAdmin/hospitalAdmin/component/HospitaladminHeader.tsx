import { Home, Hospital, LogOut, Menu, X } from 'lucide-react'
import React, { useState } from 'react'

// Define types
type NavLinkProps = {
  children: React.ReactNode;
  active?: boolean;
};

export const HospitaladminHeader = () => {
      const [menuOpen, setMenuOpen] = useState<boolean>(false);
      // Toggle menu
      const toggleMenu = (): void => {
        setMenuOpen(!menuOpen);
      };
  return (
    <header className="bg-gray-800/80 p-4 border-b border-emerald-500/30 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hospital className="text-emerald-400" size={24} />
              <h1 className="text-2xl font-bold text-emerald-400">
                HOSPITAL ADMIN DASHBOARD
              </h1>
            </div>
            <div className="flex items-center"> 
              <nav className="hidden md:flex space-x-8 mr-8">
                <NavLink active>
                  <Home size={18} />
                  Home
                </NavLink>
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
                <NavLink active>
                  <Home size={18} />
                  Home
                </NavLink>
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
  )
}

const NavLink: React.FC<NavLinkProps> = ({ children, active }) => {
    return (
      <a
        href="#"
        className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors hover:text-emerald-400 ${
          active ? "text-emerald-400 font-medium" : "text-gray-300"
        }`}
      >
        {children}
      </a>
    );
  };