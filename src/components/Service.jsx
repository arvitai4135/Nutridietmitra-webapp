import React, { useState } from 'react';
import { Apple, UserCheck, Globe, ArrowRight } from 'lucide-react';
import HealthCoach from '/assets/Images/HealthCoach.jpg';
import Consultency from '../components/form/Consultency.jsx';

const Service = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultationForm = () => {
    setIsConsultationOpen(true);
  };

  const closeConsultationForm = () => {
    setIsConsultationOpen(false);
  };

  return (
    <section className="w-full py-20 bg-gray-50 font-sans">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-nutricare-green"></div>
            <span className="mx-3 text-nutricare-green font-medium text-sm tracking-wider">OUR APPROACH</span>
            <div className="h-px w-8 bg-nutricare-green"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Why Nutridietmitra</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Led by Dt. Tanu Bhargava, Nutridietmitra empowers over 5000 clients globally with personalized, kitchen-based nutrition plans, delivering sustainable health transformations without supplements or crash diets.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          {/* Left Image Column */}
          <div className="hidden md:block lg:w-1/2 relative">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <img src={HealthCoach} alt="Nutridietmitra Nutrition Expertise" className="w-full h-full object-cover" />

              {/* Floating accent squares */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-nutricare-green opacity-90 z-20"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-nutricare-green opacity-90 z-20"></div>

              {/* Testimonial card */}
              <div className="absolute bottom-8 -right-8 bg-white p-5 rounded-lg shadow-xl max-w-xs z-20">
                <div className="flex items-center space-x-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm">
                  "Nutridietmitra’s PCOS plan balanced my hormones and gave me back my energy. I feel like a new person!"
                </p>
                <div className="mt-4 flex items-center">
                  {/* <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="/assets/Images/client1.jpg"
                      alt="Anjali Mehta, Nutridietmitra Client"
                      className="w-full h-full object-cover"
                    />
                  </div> */}
                  <div className="ml-3">
                    <p className="text-xs font-bold text-gray-800">Anjali Mehta</p>
                    <p className="text-xs text-gray-500">Improved PCOS in 4 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              {/* Features */}
              <div className="space-y-8">
                {/* Feature 1 */}
                <div className="group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-nutricare-green bg-opacity-10 group-hover:bg-nutricare-green group-hover:bg-opacity-100 transition-all duration-300">
                        <Apple className="w-6 h-6 text-nutricare-green group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-nutricare-green transition-colors duration-300">
                        Tailored Nutrition Plans
                      </h3>
                      <p className="text-gray-600">
                        Our kitchen-based, supplement-free diets are customized to your health goals, from weight loss to managing PCOS, diabetes, and more.
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
                        <UserCheck className="w-6 h-6 text-nutricare-green group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-nutricare-green transition-colors duration-300">
                        Expert Guidance
                      </h3>
                      <p className="text-gray-600">
                        With 17+ years of experience, Dt. Tanu Bhargava provides science-backed solutions, ensuring sustainable results for your health journey.
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
                        <Globe className="w-6 h-6 text-nutricare-green group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-nutricare-green transition-colors duration-300">
                        Global Support
                      </h3>
                      <p className="text-gray-600">
                        Serving over 5000 clients worldwide, our online consultations offer 100% satisfaction with personalized care, wherever you are.
                      </p>
                      <div className="mt-4 h-px w-16 bg-nutricare-green opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              {/* <div className="mt-10">
                <button
                  onClick={openConsultationForm}
                  className="bg-nutricare-green text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg hover:bg-opacity-90 transition duration-300 flex items-center"
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Consultency isOpen={isConsultationOpen} onClose={closeConsultationForm} />
    </section>
  );
};

export default Service;