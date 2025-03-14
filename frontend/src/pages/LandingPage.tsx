import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

export default function LandingPage() {
    // NAVBAR PROPS
    const links = ["Home", "About", "Services", "Contact", "ApplyForHospital"];
    const isLoggedIn = false;
    // referances for scrolling
    const homeRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const applyForHospitalRef = useRef<HTMLDivElement>(null);

    const [isScrolled, setIsScrolled] = useState(false);
    // Scroll to the selected section
    const scrollToSection = (ref: HTMLDivElement | null) => {
        if (ref) {
            ref.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="relative">
            <Navbar
                links={links}
                isLoggedIn={isLoggedIn}
                scrollToSection={scrollToSection}
                refs={{
                    Home: homeRef.current,
                    About: aboutRef.current,
                    Services: servicesRef.current,
                    Contact: contactRef.current,
                    ApplyForHospital: applyForHospitalRef.current,
                }}
                isScrolled={isScrolled}
            />

            <div ref={homeRef} id="Home" className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
                <p className="text-lg mt-4">Discover our services and apply for hospital registration.</p>
            </div>

            <div ref={aboutRef} id="About" className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
                <h1 className="text-3xl font-bold">About Us</h1>
                <p className="mt-4 text-lg">We provide top-notch healthcare services.</p>
            </div>

            <div ref={servicesRef} id="Services" className="h-screen flex flex-col items-center justify-center bg-gray-300 text-black">
                <h1 className="text-3xl font-bold">Our Services</h1>
                <p className="mt-4 text-lg">Explore a wide range of healthcare services we offer.</p>
            </div>

            <div ref={applyForHospitalRef} id="ApplyForHospital" className="h-screen flex flex-col items-center justify-center bg-gray-400 text-black">
                <h1 className="text-3xl font-bold">Apply for Hospital</h1>
                <p className="mt-4 text-lg">Register your hospital with us.</p>
            </div>

            <div ref={contactRef} id="Contact" className="h-screen flex flex-col items-center justify-center bg-gray-500 text-white">
                <h1 className="text-3xl font-bold">Contact Us</h1>
                <p className="mt-4 text-lg">Feel free to reach out for inquiries.</p>
            </div>
        </div>
    );
}
