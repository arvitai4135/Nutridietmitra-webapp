import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Appointment from "../components/form/Appointment"; // Import the Appointment component

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const toggleAppointment = () => {
    setIsAppointmentOpen(!isAppointmentOpen);
    // Close menu when appointment is opened on mobile
    if (!isAppointmentOpen && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Function to close the mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-nutricare-bg-light shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Menu Toggle for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none text-nutricare-primary-dark transition-transform duration-300 ease-in-out"
              aria-label="Toggle menu"
            >
              <i className={`fas fa-${isMenuOpen ? "times" : "bars"} text-xl`}></i>
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:space-x-6 font-sans absolute md:static top-16 left-0 w-full md:w-auto bg-nutricare-bg-light md:bg-transparent shadow md:shadow-none z-50 md:z-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 py-6 md:py-0 transition-all duration-700 ease-in-out ${
              isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 md:opacity-100 md:translate-x-0"
            }`}
          >
            <NavLink
              to="/"
              onClick={closeMenu} // Close menu on click
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu} // Close menu on click
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              onClick={closeMenu} // Close menu on click
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Service
            </NavLink>
            <NavLink
              to="/gallery"
              onClick={closeMenu} // Close menu on click
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/blogs"
              onClick={closeMenu} // Close menu on click
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMenu} // Close menu on click
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Contact Us
            </NavLink>

            {/* Appointment button for mobile view */}
            <button
              onClick={toggleAppointment}
              className="md:hidden py-2 px-6 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans"
            >
              Book Appointment
            </button>
          </nav>

          {/* Right: Cart, Search, and Appointment */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-nutricare-primary-dark transition-colors duration-300 hover:text-nutricare-green"
            >
              <i className="fas fa-search text-xl"></i>
            </button>

            {/* Appointment Button for desktop view */}
            <button
              onClick={toggleAppointment}
              className="hidden md:block py-2 px-6 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-nutricare-bg-light p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out scale-100">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-4 right-4 text-nutricare-text-dark hover:text-nutricare-green transition-colors duration-300"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              <form className="flex items-center">
                <input
                  type="search"
                  placeholder="Type Word Then Enter..."
                  className="w-full p-2 border border-nutricare-text-gray rounded-l focus:outline-none focus:border-nutricare-primary-dark font-sans"
                />
                <button
                  type="submit"
                  className="bg-nutricare-primary-dark text-white p-2 rounded-r hover:bg-nutricare-green transition-colors duration-300"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Appointment Modal */}
        <Appointment isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
      </div>
    </div>
  );
};

export default Navbar;