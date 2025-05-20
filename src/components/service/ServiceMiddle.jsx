import React from 'react';
import HealthCoach1 from '/assets/Images/HealthCoach1.jpg';
import PersonalisedNutrionist from '/assets/Images/PersonalisedNutrionist.jpg';
import BestFitness from '/assets/Images/BestFitness.jpg';

const ServiceMiddle = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Image and Office Info */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative lg:pr-10">
              {/* Main Image */}
              <div className="text-left">
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={HealthCoach1}
                  alt="Nutridietmitra Nutrition Clinic"
                />
              </div>

              {/* Overlaid Office Information */}
              <div className="relative mt-6 mx-auto max-w-md">
                <div className="bg-nutricare-primary-dark text-white p-8 rounded-lg shadow-lg text-center min-h-[200px] flex flex-col justify-center">
                  <h4 className="text-xl font-bold mb-1">Our Main Office</h4>
                  <p className="text-white">OM RESIDENCY 93/B2 Mauji Colony, Malviya Nagar, Jaipur</p>
                  <p className="text-white mt-2">+91-7568153534 | nutridietmitra@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - About Text and Features */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            {/* Section Title */}
            <div className="mb-10">
              <h5 className="uppercase text-nutricare-primary-light font-bold tracking-wide mb-2">OUR SERVICES </h5>
              <h2 className="text-3xl lg:text-4xl font-bold text-nutricare-text-dark mb-6">
                Purposeful living with customized nutrition.  
              </h2>
              <p className="text-nutricare-text-gray leading-relaxed">
                Every body is unique and so is every diet plan we offer. At 
Nutridietmitra, our expert will guide you through different 
issues like struggle with weight management, managing with 
a health issue or a condition, or struggling with having a 
balanced life. Our diet plan will help you to heal, energize and 
maintain with a tailored diet coaching. Just for you.
              </p>
            </div>

            {/* Features Row */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Feature 1 */}
              <div className="w-full md:w-1/2">
                <div className="bg-nutricare-bg-light rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={PersonalisedNutrionist}
                      alt="Nutridietmitra Tailored Diet Plans"
                    />
                  </div>
                  <div className="p-6 h-[220px] flex flex-col">
                    <h5 className="font-bold text-xl text-nutricare-primary-dark mb-3">
                      Tailored Diet Plans
                    </h5>
                    <p className="text-nutricare-text-gray text-sm">
                      Customized, kitchen-based diets designed to address weight loss, PCOS/PCOD, diabetes, and more, without supplements or crash diets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="w-full md:w-1/2">
                <div className="bg-nutricare-bg-light rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={BestFitness}
                      alt="Nutridietmitra Holistic Wellness"
                    />
                  </div>
                  <div className="p-6 h-[220px] flex flex-col">
                    <h5 className="font-bold text-xl text-nutricare-primary-dark mb-3">
                      Holistic Wellness
                    </h5>
                    <p className="text-nutricare-text-gray text-sm">
                      A lifestyle-focused approach integrating nutrition, exercise, and wellness strategies to achieve sustainable health transformations for all ages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMiddle;