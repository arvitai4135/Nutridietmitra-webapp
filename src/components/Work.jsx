import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SportsNutrionist from '../assets/images/SportsNutrionist.jpg';
import PersonalisedNutrionist from '../assets/images/PersonalisedNutrionist.jpg';
import WeightLoss from '../assets/images/WeightLoss.jpg';
import IndividualCoaching from '../assets/images/IndividualCoaching.jpg';
import ChildNutrition from '../assets/images/ChildNutrition.jpg';

const services = [
  {
    id: 1,
    image: SportsNutrionist,
    icon: 'bicycle',
    title: 'Sports Nutritionist',
    description: 'We are specializing in sports nutrition. Our sports nutrition team love the benefits of exercise brings.',
    link: 'sports-nutritionist.html'
  },
  {
    id: 2,
    image: PersonalisedNutrionist,
    icon: 'fruits',
    title: 'Personalized Nutrition',
    description: 'Our personalized nutrition foods are right for you & supplements should be taking with diet plan.',
    link: 'personalized-nutrition.html'
  },
  {
    id: 3,
    image: WeightLoss,
    icon: 'reduce',
    title: 'Weight Loss Programs',
    description: 'Weight loss process doesn\'t mean strive to body but make the eating process healthy and fully exotic.',
    link: 'weight-loss-programs.html'
  },
  {
    id: 4,
    image: IndividualCoaching,
    icon: 'meditation',
    title: 'Individual Coaching',
    description: 'We provide comprehensive coaching to help you achieve your fitness and nutrition goals.',
    link: 'individual-coaching.html'
  },
  {
    id: 5,
    image: ChildNutrition,
    icon: 'nutritionist-1',
    title: 'Child Nutrition',
    description: 'Our main goal for the child nutrition is to provide a healthy and nutritious breakfast to child for better health.',
    link: 'child-nutrition.html'
  }
];

const NutriCareServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="bg-nutricare-bg-light py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h5 className="text-nutricare-primary-light font-bold mb-2 text-sm uppercase tracking-wider">What We Offers</h5>
          <h2 className="text-3xl md:text-4xl font-bold text-nutricare-text-dark mb-4">How It Works?</h2>
          <p className="text-nutricare-text-gray text-sm md:text-base max-w-2xl mx-auto">
            If you're looking for a fast-paced, collaborative environment You'll enjoy an innovative & results-oriented culture driven by the facts.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows for Mobile */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-10 md:hidden">
            <button 
              onClick={prevSlide}
              className="bg-nutricare-green/70 text-white p-2 rounded-full shadow-lg hover:bg-nutricare-green-dark transition -ml-6"
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="bg-nutricare-green/70 text-white p-2 rounded-full shadow-lg hover:bg-nutricare-green-dark transition -mr-6"
            >
              <ArrowRight size={24} />
            </button>
          </div>

          {/* Main Carousel */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch"
            >
              {/* Image Section */}
              <div className="relative rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                <img 
                  src={services[currentIndex].image} 
                  alt={services[currentIndex].title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                {/* Hidden on mobile, shown on larger screens */}
                <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4 text-center">
                  <h3 className="text-xl font-bold">{services[currentIndex].title}</h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 flex flex-col justify-between order-1 md:order-2">
                <div>
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="bg-nutricare-primary-light text-white p-3 md:p-4 rounded-full mr-4">
                      <i className={`flaticon flaticon-${services[currentIndex].icon} text-xl md:text-2xl`}></i>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-nutricare-text-dark">
                      {services[currentIndex].title}
                    </h3>
                  </div>
                  
                  <p className="text-nutricare-text-gray text-sm md:text-base mb-6 leading-relaxed">
                    {services[currentIndex].description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href={services[currentIndex].link}
                    className="inline-block px-4 md:px-6 py-2 md:py-3 bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition text-sm md:text-base"
                  >
                    Read More
                  </a>
                  {/* Page Indicator */}
                  <div className="text-nutricare-text-gray text-sm">
                    {currentIndex + 1} / {services.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="hidden md:flex justify-center mt-6 space-x-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-nutricare-primary-dark scale-125' 
                    : 'bg-nutricare-text-gray'
                }`}
              />
            ))}
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:block">
            <button 
              onClick={prevSlide}
              className="absolute top-1/2 -translate-y-1/2 left-0 -ml-16 bg-nutricare-green text-white p-3 rounded-full shadow-lg hover:bg-nutricare-green-dark transition"
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 right-0 -mr-16 bg-nutricare-green text-white p-3 rounded-full shadow-lg hover:bg-nutricare-green-dark transition"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutriCareServiceCarousel;