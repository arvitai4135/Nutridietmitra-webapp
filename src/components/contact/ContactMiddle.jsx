import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HealthyEating from '/assets/Images/HealthyEating.jpg';
import Appointment from '../form/Appointment';

const ContactMiddle = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const navigate = useNavigate();

  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  const handleExplorePrograms = () => {
    navigate('/services');
  };

  const colors = {
    primaryDark: '#9E0B7F',
    primaryLight: '#D93BB1',
    green: '#ADD01C',
    greenDark: '#8CA417',
    bgLight: '#FCF0F8',
    textDark: '#333333',
    textGray: '#718096',
  };

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: colors.bgLight, fontFamily: 'Arial, sans-serif' }}
    >
      {/* Background design elements */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full"
        style={{ backgroundColor: colors.primaryLight, opacity: 0.1 }}
      ></div>
      <div
        className="absolute bottom-20 -left-20 w-80 h-80 rounded-full"
        style={{ backgroundColor: colors.green, opacity: 0.1 }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content area */}
          <div className="lg:w-1/2 space-y-8">
            {/* Logo/icon with animation */}
            <div className="mb-2">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white transform hover:rotate-12 transition-transform duration-300"
                style={{ backgroundColor: colors.primaryDark }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path d="M12 1.5a.75.75 0 0 1 .75.75V4h8.25a.75.75 0 0 1 0 1.5h-.89l-1.83 8.13a3.75 3.75 0 0 1-3.69 2.87H9.42a3.75 3.75 0 0 1-3.69-2.87L3.9 5.5H3a.75.75 0 0 1 0-1.5h8.25V2.25A.75.75 0 0 1 12 1.5ZM6.08 5.5l1.83 8.12a2.25 2.25 0 0 0 2.21 1.72h5.76a2.25 2.25 0 0 0 2.21-1.72L19.92 5.5H6.08ZM3.5 17.5a.75.75 0 0 0-.75.75v1.5c0 .69.56 1.25 1.25 1.25h16a1.25 1.25 0 0 0 1.25-1.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.25.25 0 0 1-.25.25H4a.25.25 0 0 1-.25-.25v-1.5a.75.75 0 0 0-.75-.75Z" />
                </svg>
              </div>
            </div>

            {/* Updated heading */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 leading-tight" style={{ color: colors.primaryDark }}>
                Achieve Your Health Goals <br /> with Nutridietmitra
              </h2>
              <div className="w-24 h-1 mb-6" style={{ backgroundColor: colors.green }}></div>
            </div>

            {/* Updated paragraph text */}
            <p className="text-lg mb-2" style={{ color: colors.textGray }}>
              Led by Dt. Tanu Bhargava with 17+ years of expertise, Nutridietmitra offers personalized, kitchen-based nutrition plans to transform your health sustainably, without supplements.
            </p>

            {/* Updated feature points */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.green}30` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.green }}></div>
                </div>
                <p style={{ color: colors.textDark }}>Tailored diet plans for your medical and lifestyle needs</p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.green}30` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.green }}></div>
                </div>
                <p style={{ color: colors.textDark }}>Expert guidance from a trusted dietitian</p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.green}30` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.green }}></div>
                </div>
                <p style={{ color: colors.textDark }}>Healthy salad and fruit bouquet delivery in Jaipur</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-8 py-4 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 hover:bg-[#D93BB1]"
                style={{ backgroundColor: colors.primaryDark }}
                onClick={openAppointmentModal}
              >
                Book Free Consultation
              </button>
              <button
                className="px-8 py-4 border-2 font-medium rounded-full transition-all duration-300 hover:bg-[#ADD01C] hover:text-white"
                style={{
                  borderColor: colors.green,
                  color: colors.textDark,
                }}
                onClick={handleExplorePrograms}
              >
                Explore Services
              </button>
            </div>
          </div>

          {/* Right image area */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Decorative elements */}
              <div
                className="absolute -top-3 -right-3 w-full h-full rounded-2xl border-2"
                style={{ borderColor: colors.primaryLight }}
              ></div>

              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src={HealthyEating} alt="Healthy Eating" className="w-full h-auto object-cover" />
              </div>

              {/* Floating card element */}
              <div className="absolute -bottom-10 -left-10 bg-white p-5 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primaryLight}20` }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                      style={{ color: colors.primaryDark }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium" style={{ color: colors.textDark }}>
                    Trusted Expertise
                  </span>
                </div>
                <p className="text-sm" style={{ color: colors.textGray }}>
                  Over 5000 clients transformed with compassionate, science-backed nutrition care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <Appointment isOpen={isAppointmentModalOpen} onClose={closeAppointmentModal} />
    </section>
  );
};

export default ContactMiddle;