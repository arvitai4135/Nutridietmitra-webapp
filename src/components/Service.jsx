import React, { useState } from 'react';
import HealthCoach from '../assets/Images/health-coach.jpg'; 
import Consultency from '../components/form/Consultency.jsx'; // Import the Consultency component

const Service = () => {
  // State to control the visibility of the consultation form
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Function to open the consultation form
  const openConsultationForm = () => {
    setIsConsultationOpen(true);
  };

  // Function to close the consultation form
  const closeConsultationForm = () => {
    setIsConsultationOpen(false);
  };

  return (
    <section className="w-full py-20 bg-gray-50 font-sans">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header with subtle accent */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-nutricare-green"></div>
            <span className="mx-3 text-nutricare-green font-medium text-sm tracking-wider">OUR EXPERTISE</span>
            <div className="h-px w-8 bg-nutricare-green"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Why Choose Our Service</h2>
          <p className="max-w-2xl mx-auto text-gray-600">We combine science-backed methodologies with personalized care to create the most effective health transformation experience.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left Image Column with floating elements */}
          <div className="hidden md:block lg:w-1/2 relative">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <img 
                src={HealthCoach}
                alt="Health coaching session" 
                className="w-full h-full object-cover"
              />
              
              {/* Floating accent squares */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-nutricare-green opacity-90 z-20"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-nutricare-green opacity-90 z-20"></div>
              
              {/* Testimonial card floating on image */}
              <div className="absolute bottom-8 -right-8 bg-white p-5 rounded-lg shadow-xl max-w-xs z-20">
                <div className="flex items-center space-x-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm">"The nutrition program completely transformed my relationship with food. I've never felt better!"</p>
                <div className="mt-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                  <div className="ml-3">
                    <p className="text-xs font-bold text-gray-800">Sarah Johnson</p>
                    <p className="text-xs text-gray-500">Lost 25lbs in 12 weeks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content Column - Card style with shadow highlights */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              {/* Features with minimalist design */}
              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-nutricare-green bg-opacity-10 group-hover:bg-nutricare-green group-hover:bg-opacity-100 transition-all duration-300">
                        <svg className="w-6 h-6 text-nutricare-green group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,5c-3.859,0-7,3.141-7,7s3.141,7,7,7s7-3.141,7-7S15.859,5,12,5z M12,17c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S14.757,17,12,17z"></path>
                          <path d="M12,9c-1.627,0-3,1.373-3,3s1.373,3,3,3s3-1.373,3-3S13.627,9,12,9z"></path>
                          <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-nutricare-green transition-colors duration-300">Personalized Nutrition Plans</h3>
                      <p className="text-gray-600">
                        Our evidence-based approach uses 5 metabolic optimization techniques tailored to your unique body composition and lifestyle needs.
                      </p>
                      <div className="mt-4 h-px w-16 bg-nutricare-green opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
                
                {/* Feature 2 */}
                <div className="group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-nutricare-green bg-opacity-10 group-hover:bg-nutricare-green group-hover:bg-opacity-100 transition-all duration-300">
                        <svg className="w-6 h-6 text-nutricare-green group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16,9c0,2.209-1.791,4-4,4s-4-1.791-4-4s1.791-4,4-4S16,6.791,16,9z"></path>
                          <path d="M17,14h-0.268c-0.115-0.08-0.233-0.155-0.355-0.228C17.967,12.76,19,10.992,19,9c0-3.86-3.141-7-7-7S5,5.14,5,9c0,1.992,1.033,3.76,2.623,4.772c-0.122,0.074-0.24,0.148-0.355,0.228H7c-3.86,0-7,3.14-7,7v2h24v-2C24,17.14,20.86,14,17,14z M12,4c2.757,0,5,2.243,5,5s-2.243,5-5,5s-5-2.243-5-5S9.243,4,12,4z M22,21H2v-0.5c0-2.208,1.792-4,4-4h12c2.208,0,4,1.792,4,4V21z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-nutricare-green transition-colors duration-300">Continuous Coaching Support</h3>
                      <p className="text-gray-600">
                        Beyond meal plans, our certified coaches provide accountability and motivational strategies proven to foster long-term behavior change.
                      </p>
                      <div className="mt-4 h-px w-16 bg-nutricare-green opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
                
                {/* Feature 3 */}
                <div className="group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-nutricare-green bg-opacity-10 group-hover:bg-nutricare-green group-hover:bg-opacity-100 transition-all duration-300">
                        <svg className="w-6 h-6 text-nutricare-green group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.707,5.293L16.414,2H4v20h16V5.586L19.707,5.293z M19,20H6V4h10v4h3V20z"></path>
                          <path d="M8 12H16V14H8zM8 16H16V18H8zM8 8H16V10H8z"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-nutricare-green transition-colors duration-300">Comprehensive Health Analysis</h3>
                      <p className="text-gray-600">
                        We track over 15 key health markers to give you real-time feedback on your progress and make data-driven adjustments to your plan.
                      </p>
                      <div className="mt-4 h-px w-16 bg-nutricare-green opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA Button - Updated to open the consultation form */}
              <div className="mt-10">
                <button 
                  onClick={openConsultationForm}
                  className="bg-nutricare-green text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg hover:bg-opacity-90 transition duration-300 flex items-center"
                >
                  Schedule a Free Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Include the Consultency component here with the required props */}
      <Consultency 
        isOpen={isConsultationOpen} 
        onClose={closeConsultationForm} 
      />
    </section>
  );
};

export default Service;