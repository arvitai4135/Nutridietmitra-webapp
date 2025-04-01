import React, { useState } from 'react';
import NutrionistPreparing from '/assets/Images/NutrionistPreparing.jpg';
import Appointment from '../form/Appointment'; // Import the Appointment component

const WhoWeAreSection = () => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const openAppointmentModal = () => {
    setIsAppointmentOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentOpen(false);
  };

  return (
    <section className="w-full py-16 md:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-nutricare-bg-light opacity-30"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-nutricare-bg-light opacity-20"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
          {/* Content Section */}
          <div className="w-full lg:w-7/12 bg-nutricare-text-dark rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 md:p-10">
              {/* Section title */}
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-1 bg-nutricare-green mr-3"></div>
                  <h5 className="text-nutricare-green font-medium uppercase tracking-wider text-sm">Who We Are</h5>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nutrition Experts You Can Trust</h2>
                <p className="text-gray-300">
                  We combine scientific knowledge with personalized care to help you achieve your optimal health through proper nutrition and lifestyle choices.
                </p>
              </div>
              
              {/* Feature items */}
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-5">
                    <div className="w-12 h-12 rounded-full bg-nutricare-primary-light flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-white mb-2">Evidence-Based Nutrition Guidance</h5>
                    <p className="text-gray-300">Our advice is backed by scientific research and tailored to your unique body needs, goals, and preferences.</p>
                  </div>
                </div>
                
                <div className="w-full h-px bg-gray-700 my-6"></div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-5">
                    <div className="w-12 h-12 rounded-full bg-nutricare-primary-light flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold text-white mb-2">Personalized Wellness Programs</h5>
                    <p className="text-gray-300">We create custom nutrition plans that fit your lifestyle, addressing specific health concerns and supporting your journey.</p>
                  </div>
                </div>
                
                <div className="w-full h-px bg-gray-700 my-6"></div>
                
                {/* Changed from an anchor to a button with onClick handler */}
                <button 
                  onClick={openAppointmentModal}
                  className="group inline-flex items-center text-white font-medium text-lg hover:text-nutricare-green transition-colors duration-300"
                >
                  <span>Schedule a Consultation</span>
                  <div className="ml-3 w-8 h-8 rounded-full bg-nutricare-green flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-nutricare-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="w-full lg:w-5/12 relative">
            {/* Main image with styling */}
            <div className="h-full relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={NutrionistPreparing} 
                alt="Nutritionist preparing healthy food" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-nutricare-primary-dark/70 to-transparent opacity-60"></div>
              
              {/* Floating stats card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <div className="flex justify-between">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-nutricare-primary-dark">10+</h3>
                    <p className="text-nutricare-text-gray text-sm">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-nutricare-primary-dark">500+</h3>
                    <p className="text-nutricare-text-gray text-sm">Happy Clients</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-nutricare-primary-dark">95%</h3>
                    <p className="text-nutricare-text-gray text-sm">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-nutricare-green/20 rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-nutricare-primary-light/20 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Add the Appointment modal component */}
      <Appointment isOpen={isAppointmentOpen} onClose={closeAppointmentModal} />
    </section>
  );
};


export default WhoWeAreSection;