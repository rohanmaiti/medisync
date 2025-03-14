import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./Loginbutton";
import { IoMdMenu, IoMdClose } from "react-icons/io";

interface NavbarProps {
  links: string[];
  isLoggedIn: boolean;
  scrollToSection: (ref: HTMLDivElement | null) => void;
  refs: { [key: string]: HTMLDivElement | null };
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ links, isLoggedIn, scrollToSection, refs, isScrolled }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (typeOfUser: string) => {
    navigate("/login", { state: { typeOfUser } });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-20 flex items-center px-6 py-3 transition-all duration-300 
      ${isScrolled ? "bg-gray-900 shadow-lg" : "bg-gray-800"}`}
    >
      {/* Left - Logo */}
      <div className="flex items-center">
        <img src="/logo100.png" alt="Company Logo" className="h-10 w-auto" />
      </div>

      {/* Mobile Menu Toggle */}
      
      <button
        className="text-white md:hidden ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
      > 
        {menuOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex w-full items-center justify-between">
        <div className="flex space-x-6 ml-10">
          {links.map((link, index) => (
            <a
              key={index}
              href={`#${link}`}
              className="text-white text-lg transition hover:text-blue-400"
              onClick={() => scrollToSection(refs[`${link.toLowerCase()}Ref`])}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Auth Button */}
        <div>
          {isLoggedIn ? (
            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg transition-transform hover:scale-105">
              <img
                src="https://img.icons8.com/?size=100&id=vGj0AluRnTSa&format=png&color=000000"
                alt="Logout"
                className="w-6 mr-2"
              />
              Logout
            </button>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div>
        
        <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col items-center py-4 space-y-4 md:hidden">
        {isLoggedIn ? (
            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg transition-transform hover:scale-105">
              <img
                src="https://img.icons8.com/?size=100&id=vGj0AluRnTSa&format=png&color=000000"
                alt="Logout"
                className="w-6 mr-2"
              />
              Logout
            </button>
          ) : (
            <LoginButton />
          )}
          {links.map((link, index) => (
            <a
              key={index}
              href={`#${link}`}
              className="text-white text-lg transition hover:text-blue-400"
              onClick={() => {
                scrollToSection(refs[`${link.toLowerCase()}Ref`]);
                setMenuOpen(false);
              }}
            >
              {link}
            </a>
          ))}
        </div>
          {/* Mobile Auth Button */}
        </div>
          
      )}
    </nav>
  );
};

export default Navbar;
