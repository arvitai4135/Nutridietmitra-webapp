import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, ClipboardCheck, Globe, Clock, Users, Award, Heart, X } from "lucide-react";
import NutrionistPreparing from "/assets/Images/NutrionistPreparing.jpg";
import Appointment from "../form/Appointment";

const WhoWeAreSection = () => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  const openAppointmentModal = () => {
    setIsAppointmentOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentOpen(false);
  };

  const openReadMoreModal = () => {
    setIsReadMoreOpen(true);
  };

  const closeReadMoreModal = () => {
    setIsReadMoreOpen(false);
  };

  return (
    <section className="w-full py-6 sm:py-8 md:py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-10 -left-10 w-32 sm:w-40 md:w-56 h-32 sm:h-40 md:h-56 rounded-full bg-nutricare-bg-light opacity-20 sm:opacity-30"></div>
      <div className="absolute -bottom-16 -right-16 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 rounded-full bg-nutricare-bg-light opacity-15 sm:opacity-20"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-4 sm:gap-6 md:gap-8">
          {/* Content Section */}
          <div className="w-full lg:w-7/12 bg-nutricare-text-dark rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-6 md:p-8">
              {/* Section title */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-8 sm:w-10 h-1 bg-nutricare-green mr-2 sm:mr-3"></div>
                  <h5 className="text-nutricare-green font-medium uppercase tracking-wider text-xs sm:text-sm">
                    Who We Are
                  </h5>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                  Dt. Tanu Bhargava & Nutridietmitra
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                  Founded in 2014 by Dt. Tanu Bhargava, a Jaipur-based dietitian with over 17+ years of expertise, Nutridietmitra empowers 5000+ clients globally with holistic, kitchen-based nutrition plans. Awarded Best Dietitian (2020) and featured in Times of India and Zee News, we deliver sustainable health without supplements.
                </p>
              </div>

              {/* Feature items */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 sm:mr-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-nutricare-primary-light flex items-center justify-center text-white">
                      <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                      Science-Backed Nutrition
                    </h5>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                      With an MSc in Nutrition and Diabetes Educator certification, Dt. Tanu Bhargava’s 17+ years of experience across hospitals, fitness centers, and corporate wellness deliver evidence-based solutions for weight management, PCOS, diabetes, and more.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-700 my-3 sm:my-4"></div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 sm:mr-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-nutricare-primary-light flex items-center justify-center text-white">
                      <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                      Tailored Wellness Plans
                    </h5>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                      Our customized plans for child nutrition, sports performance, pregnancy, and chronic conditions are sustainable, kitchen-based, and free of supplements, serving 5000+ clients with a no-starvation approach.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-700 my-3 sm:my-4"></div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 sm:mr-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-nutricare-primary-light flex items-center justify-center text-white">
                      <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                      Global Impact & Recognition
                    </h5>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                      Serving clients worldwide with 100% satisfaction, Nutridietmitra’s expertise is recognized in Times of India, Zee News, and awards like Healthcare Achievement (2022), transforming lives globally.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-700 my-3 sm:my-4"></div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <button
                    onClick={openAppointmentModal}
                    className="group inline-flex items-center text-white font-medium text-sm sm:text-base md:text-lg hover:text-nutricare-green transition-colors duration-300"
                  >
                    <span>Book Free Consultation</span>
                    <div className="ml-2 sm:ml-3 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-nutricare-green flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-nutricare-text-dark"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </button>
                  <button
                    onClick={openReadMoreModal}
                    className="group inline-flex items-center text-white font-medium text-sm sm:text-base md:text-lg hover:text-nutricare-green transition-colors duration-300"
                  >
                    <span>Read More</span>
                    <div className="ml-2 sm:ml-3 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-nutricare-green flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-nutricare-text-dark"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-5/12 relative">
            <div className="h-full relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={NutrionistPreparing}
                alt="Nutridietmitra Personalized Nutrition Plans"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nutricare-primary-dark/70 to-transparent opacity-60"></div>

              {/* Floating stats card */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-nutricare-green" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-nutricare-primary-dark">17+</h3>
                      <p className="text-nutricare-text-gray text-xs">Years Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 sm:w-5 h-4 sm:h-5 text-nutricare-green" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-nutricare-primary-dark">5000+</h3>
                      <p className="text-nutricare-text-gray text-xs">Transformed Lives</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 sm:w-5 h-4 sm:h-5 text-nutricare-green" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-nutricare-primary-dark">6</h3>
                      <p className="text-nutricare-text-gray text-xs">Awards Won</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-nutricare-green" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-nutricare-primary-dark">100%</h3>
                      <p className="text-nutricare-text-gray text-xs">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-20 sm:w-28 h-20 sm:h-28 bg-nutricare-green/20 rounded-full"></div>
            <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-16 sm:w-20 h-16 sm:h-20 bg-nutricare-primary-light/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <Appointment isOpen={isAppointmentOpen} onClose={closeAppointmentModal} />

      {/* Read More Modal */}
      <AnimatePresence>
        {isReadMoreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={closeReadMoreModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-md sm:max-w-lg w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div className="flex items-center">
                  <div className="bg-nutricare-primary-light text-white p-2 sm:p-2 rounded-full mr-2 sm:mr-3">
                    <Users className="w-6 sm:w-8 h-6 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-nutricare-text-dark">
                    About Nutridietmitra
                  </h3>
                </div>
                <button onClick={closeReadMoreModal} className="text-nutricare-text-gray hover:text-nutricare-text-dark">
                  <X size={20} sm={24} />
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-nutricare-text-dark">Our Mission</h4>
                  <p className="text-nutricare-text-gray text-xs sm:text-sm md:text-base">
                    Founded by Dt. Tanu Bhargava in 2014, Nutridietmitra is dedicated to transforming lives through holistic, kitchen-based nutrition plans. Our science-backed, supplement-free approach empowers clients to achieve sustainable health, focusing on mind, body, and lifestyle without crash diets.
                  </p>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-nutricare-text-dark">Achievements</h4>
                  <p className="text-nutricare-text-gray text-xs sm:text-sm md:text-base">
                    Nutridietmitra has been honored with awards like Best Dietitian (2020) and Healthcare Achievement (2022), and featured in Times of India, Zee News, and other media for our innovative approach to nutrition and wellness.
                  </p>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-nutricare-text-dark">Global Reach</h4>
                  <p className="text-nutricare-text-gray text-xs sm:text-sm md:text-base">
                    Serving over 5000 clients worldwide with 100% satisfaction, we offer personalized plans for weight management, PCOS, diabetes, child nutrition, sports performance, and more, delivered through expert online consultations.
                  </p>
                </div>
              </div>

              <button
                onClick={closeReadMoreModal}
                className="mt-3 sm:mt-4 w-full px-4 py-2 bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition text-sm sm:text-base"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhoWeAreSection;