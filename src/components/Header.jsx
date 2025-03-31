import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/Logo.png"; // Ensure the path is correct
import Appointment from "../components/form/Appointment"; // Update with the correct path to your Appointment component

const Header = () => {
  // State to control modal visibility
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // Function to open the appointment modal
  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
  };

  // Function to close the appointment modal
  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  return (
    <div className="hidden sm:block w-full bg-white shadow-sm font-sans">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-6 sm:gap-4">
          {/* Left: Emergency Contact */}
          <div className="sm:col-span-4 flex items-center justify-center sm:justify-start space-x-3">
            <div className="bg-nutricare-primary-light text-white p-3 rounded-full flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h3m-3-8a3 3 0 01-3-3H5a3 3 0 003 3m0 0h7m0 0a3 3 0 003 3h2a3 3 0 00-3-3m0 0V6"
                />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-nutricare-text-gray text-sm font-medium">24/7 Emergency Care</p>
              <h2 className="text-lg sm:text-xl font-bold text-nutricare-text-dark hover:text-nutricare-primary-light transition-colors duration-300">
                +00 900 145 7890
              </h2>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="sm:col-span-4 flex justify-center order-first sm:order-none">
            <Link to="/">
              <img
                src={Logo}
                alt="NutriDietMitra"
                className="h-14 sm:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Right: Appointment */}
          <div className="sm:col-span-4 flex items-center justify-center sm:justify-end space-x-3">
            <div className="text-center sm:text-right">
              <p className="text-nutricare-text-gray text-sm font-medium">Request an</p>
              <h2 className="text-lg sm:text-xl font-bold">
                {/* Changed from Link to button */}
                <button
                  onClick={openAppointmentModal}
                  className="text-nutricare-text-dark hover:text-nutricare-primary-light transition-colors duration-300 font-bold"
                >
                  Get Appointment
                </button>
              </h2>
            </div>
            <div
              className="bg-nutricare-primary-light text-white p-3 rounded-full flex-shrink-0 cursor-pointer hover:bg-nutricare-primary-dark transition-colors duration-300"
              onClick={openAppointmentModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <Appointment
        isOpen={isAppointmentModalOpen}
        onClose={closeAppointmentModal}
      />
    </div>
  );
};

export default Header;