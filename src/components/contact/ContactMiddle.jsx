import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaLeaf, FaCarrot, FaRunning, FaStar, FaUserCheck, FaGlobe, FaHeart, FaAward } from 'react-icons/fa';
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
      className="relative py-8 sm:py-12 lg:py-16 overflow-hidden"
      style={{ backgroundColor: colors.bgLight, fontFamily: 'Arial, sans-serif' }}
    >
      {/* Background design elements */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 sm:w-56 sm:h-56 rounded-full"
        style={{ backgroundColor: colors.primaryLight, opacity: 0.1 }}
      ></div>
      <div
        className="absolute bottom-10 -left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full"
        style={{ backgroundColor: colors.green, opacity: 0.1 }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          {/* Left content area */}
          <div className="lg:w-1/2 space-y-4 sm:space-y-6">
            {/* Logo/icon with animation */}
            <div className="mb-2">
              <div
                className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full text-white transform hover:rotate-12 transition-transform duration-300"
                style={{ backgroundColor: colors.primaryDark }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                >
                  <path d="M12 1.5a.75.75 0 0 1 .75.75V4h8.25a.75.75 0 0 1 0 1.5h-.89l-1.83 8.13a3.75 3.75 0 0 1-3.69 2.87H9.42a3.75 3.75 0 0 1-3.69-2.87L3.9 5.5H3a.75.75 0 0 1 0-1.5h8.25V2.25A.75.75 0 0 1 12 1.5ZM6.08 5.5l1.83 8.12a2.25 2.25 0 0 0 2.21 1.72h5.76a2.25 2.25 0 0 0 2.21-1.72L19.92 5.5H6.08ZM3.5 17.5a.75.75 0 0 0-.75.75v1.5c0 .69.56 1.25 1.25 1.25h16a1.25 1.25 0 0 0 1.25-1.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.25.25 0 0 1-.25.25H4a.25.25 0 0 1-.25-.25v-1.5a.75.75 0 0 0-.75-.75Z" />
                </svg>
              </div>
            </div>

            {/* Updated heading */}
            <div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight"
                style={{ color: colors.primaryDark }}
              >
                Your Health, Our Mission
              </h2>
              <div className="w-16 sm:w-24 h-1 mb-3 sm:mb-4" style={{ backgroundColor: colors.green }}></div>
            </div>

            {/* Updated paragraph text */}
            <p className="text-sm sm:text-base lg:text-lg mb-2 leading-relaxed" style={{ color: colors.textGray }}>
              Founded by Dt. Tanu Bhargava, Nutridietmitra empowers over 5000 clients globally with personalized, kitchen-based nutrition plans. With 17+ years of expertise, our holistic, science-backed approach promotes sustainable health without starvation diets or supplements.
            </p>

            {/* Updated feature points with react-icons */}
            <div className="space-y-2 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-green-100 bg-opacity-30"
                >
                  <FaCheckCircle className="text-xs sm:text-sm text-green-600" />
                </div>
                <p className="text-sm sm:text-base" style={{ color: colors.textDark }}>
                  Customized plans for weight, PCOS, diabetes, and thyroid
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-green-100 bg-opacity-30"
                >
                  <FaLeaf className="text-xs sm:text-sm text-green-600" />
                </div>
                <p className="text-sm sm:text-base" style={{ color: colors.textDark }}>
                  No supplements, only practical, kitchen-based diets
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-green-100 bg-opacity-30"
                >
                  <FaCarrot className="text-xs sm:text-sm text-green-600" />
                </div>
                <p className="text-sm sm:text-base" style={{ color: colors.textDark }}>
                  Healthy salad and fruit bouquet delivery in Jaipur
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-green-100 bg-opacity-30"
                >
                  <FaRunning className="text-xs sm:text-sm text-green-600" />
                </div>
                <p className="text-sm sm:text-base" style={{ color: colors.textDark }}>
                  Specialized child nutrition and sports nutrition plans
                </p>
              </div>
            </div>

            {/* Why Choose Us section with react-icons */}
            <div className="mt-4 sm:mt-6">
              <h3
                className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3"
                style={{ color: colors.primaryDark }}
              >
                Why Choose Nutridietmitra?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-purple-100 bg-opacity-30"
                  >
                    <FaStar className="text-xs sm:text-sm" style={{ color: colors.primaryDark }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base" style={{ color: colors.textDark }}>
                      17+ Years of Expertise
                    </p>
                    <p className="text-xs sm:text-sm" style={{ color: colors.textGray }}>
                      Led by Dt. Tanu Bhargava, trusted by thousands.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-purple-100 bg-opacity-30"
                  >
                    <FaUserCheck className="text-xs sm:text-sm" style={{ color: colors.primaryDark }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base" style={{ color: colors.textDark }}>
                      100% Personalized Plans
                    </p>
                    <p className="text-xs sm:text-sm" style={{ color: colors.textGray }}>
                      Tailored to your body, lifestyle, and goals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-purple-100 bg-opacity-30"
                  >
                    <FaGlobe className="text-xs sm:text-sm" style={{ color: colors.primaryDark }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base" style={{ color: colors.textDark }}>
                      Global Consultations
                    </p>
                    <p className="text-xs sm:text-sm" style={{ color: colors.textGray }}>
                      Accessible worldwide with ongoing support.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-purple-100 bg-opacity-30"
                  >
                    <FaHeart className="text-xs sm:text-sm" style={{ color: colors.primaryDark }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base" style={{ color: colors.textDark }}>
                      Holistic Approach
                    </p>
                    <p className="text-xs sm:text-sm" style={{ color: colors.textGray }}>
                      Focus on mind, body, and lifestyle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right image area */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Decorative elements */}
              <div
                className="absolute -top-2 -right-2 w-full h-full rounded-2xl border-2"
                style={{ borderColor: colors.primaryLight }}
              ></div>

              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={HealthyEating}
                  alt="Healthy Eating"
                  className="w-full h-auto max-w-full object-cover"
                />
              </div>

              {/* Floating card element */}
              <div
                className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 bg-white p-3 sm:p-4 rounded-xl shadow-lg max-w-[8rem] sm:max-w-[10rem]"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <div
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-purple-100 bg-opacity-30"
                  >
                    <FaAward className="text-sm sm:text-base" style={{ color: colors.primaryDark }} />
                  </div>
                  <span className="font-medium text-sm sm:text-base" style={{ color: colors.textDark }}>
                    Recognized Excellence
                  </span>
                </div>
                <p className="text-xs sm:text-sm" style={{ color: colors.textGray }}>
                  Featured in Times of India, Zee News, and awarded Best Dietitian (2020).
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