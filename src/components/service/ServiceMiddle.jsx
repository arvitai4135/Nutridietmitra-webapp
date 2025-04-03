import React from 'react';
import HealthCoach1 from '/assets/Images/HealthCoach1.jpg'
import PersonalisedNutrionist from  '/assets/Images/PersonalisedNutrionist.jpg'
import BestFitness from '/assets/Images/BestFitness.jpg'

const ServiceMiddle = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Image and Office Info */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative mb-10 lg:pr-10">
              {/* Main Image */}
              <div className="text-left">
                <img 
                  className="w-full rounded-lg shadow-lg" 
                  src={HealthCoach1} 
                  alt="Nutrition center building"
                />
              </div>
              
              {/* Overlaid Office Information */}
              <div className="relative mt-8 lg:mt-0 mx-auto max-w-md">
                <div className="bg-nutricare-primary-dark text-white p-8 rounded-lg shadow-lg text-center">
                  <h4 className="text-xl font-bold mb-1">Our Main Office</h4>
                  <p className="text-white">OM RESIDENCY 93/B2 Mauji Colony, Malviya Nagar,Jaipur</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - About Text and Features */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            {/* Section Title */}
            <div className="mb-10">
              <h5 className="uppercase text-nutricare-primary-light font-bold tracking-wide mb-2">about nutrition</h5>
              <h2 className="text-3xl lg:text-4xl font-bold text-nutricare-text-dark mb-6">
                We Are Nice People With <br className="hidden md:block" /> A Lot Of Experience
              </h2>
              <p className="text-nutricare-text-gray leading-relaxed">
                Through our integrative approach, we bring together a team of nutritionists and the health-care professionals 
                from a broad range of disciplines, combining years of an experience, diverse specialties, and wealth of 
                knowledge plus experience.
              </p>
            </div>
            
            {/* Features Row */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Feature 1 */}
              <div className="w-full md:w-1/2">
                <div className="bg-nutricare-bg-light rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img 
                      className="w-full object-cover" 
                      src={PersonalisedNutrionist} 
                      alt="Personalized Nutrition"
                    />
                  </div>
                  <div className="p-6">
                    <h5 className="font-bold text-xl text-nutricare-primary-dark mb-3">
                      Personalized Nutrition
                    </h5>
                    <p className="text-nutricare-text-gray">
                      To know where our bodies are and to maintain the desired positions.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="w-full md:w-1/2">
                <div className="bg-nutricare-bg-light rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img 
                      className="w-full object-cover" 
                      src={BestFitness} 
                      alt="Best Fitness"
                    />
                  </div>
                  <div className="p-6">
                    <h5 className="font-bold text-xl text-nutricare-primary-dark mb-3">
                      Best Fitness
                    </h5>
                    <p className="text-nutricare-text-gray">
                      Once you grasp a workout routine, you will get it is not too a difficult.
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