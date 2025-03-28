import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: 'bicycle',
    title: 'Sports Nutritionist',
    description: 'We are specializing in sports nutrition. Our sports nutrition team love the benefits of exercise brings.',
    link: 'sports-nutritionist.html'
  },
  {
    icon: 'fruits',
    title: 'Personalized Nutrition',
    description: 'Our personalized nutrition foods are right for you & supplements should be taking with diet plan.',
    link: 'personalized-nutrition.html'
  },
  {
    icon: 'reduce',
    title: 'Weight Loss Programs',
    description: 'Weight loss process doesn\'t mean strive to body but make the eating process healthy and fully exotic.',
    link: 'weight-loss-programs.html'
  },
  {
    icon: 'meditation',
    title: 'Individual Coaching',
    description: 'We provide air conditioning service, repair maintenance support 24/7, delivered by qualified service engineers.',
    link: 'individual-coaching.html'
  },
  {
    icon: 'nutritionist-1',
    title: 'Child Nutrition',
    description: 'Our main goal for the child nutrition is to provide a healthy and nutritious breakfast to child for better health.',
    link: 'child-nutrition.html'
  },
  {
    icon: 'nutritionist-1',
    title: 'Workout Routines',
    description: 'Our main goal for the child nutrition is to provide a healthy and nutritious breakfast to child for better health.',
    link: 'workout-routines.html'
  }
];

const Work = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const getVisibleServices = () => {
    const totalServices = services.length;
    const visibleCount = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    
    return services.slice(currentSlide, currentSlide + visibleCount)
      .concat(services.slice(0, Math.max(0, currentSlide + visibleCount - totalServices)));
  };

  return (
    <section className="bg-nutricare-bg-light py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-nutricare-primary-light font-bold mb-2">What We Offers</h5>
          <h2 className="text-4xl font-bold text-nutricare-text-dark">How It Works?</h2>
          <p className="text-nutricare-text-gray mt-4 max-w-2xl mx-auto">
            If you're looking for a fast-paced, collaborative environment You'll enjoy an innovative & results-oriented culture driven by the facts.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-center items-center space-x-4">
            <button 
              onClick={prevSlide} 
              className="hidden md:block p-2 bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition"
            >
              <ChevronLeft />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {getVisibleServices().map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
                >
                  <div className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-nutricare-primary-light text-white p-4 rounded-full inline-block">
                        <i className={`flaticon flaticon-${service.icon} text-2xl`}></i>
                      </div>
                    </div>
                    <h5 className="text-xl font-bold text-nutricare-text-dark mb-3">
                      {service.title}
                    </h5>
                    <p className="text-nutricare-text-gray mb-4">
                      {service.description}
                    </p>
                    <a 
                      href={service.link} 
                      className="text-nutricare-primary-dark hover:underline font-bold"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={nextSlide} 
              className="hidden md:block p-2 bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;