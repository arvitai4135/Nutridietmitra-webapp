import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Activity, Scale, Baby, X } from 'lucide-react';

// Image paths
const SportsNutrition = '/assets/Images/SportsNutrition.jpg';
const PCOSManagement = '/assets/Images/PersonalisedNutrionist.jpg';
const WeightLoss = '/assets/Images/WeightLoss.jpg';
const DiabetesDiet = '/assets/Images/DiabetesDiet.jpg';
const ChildNutrition = '/assets/Images/ChildNutrition.jpg';

const services = [
  {
    id: 1,
    image: SportsNutrition,
    iconType: 'image',
    iconImage: '/Icon/sports.ico',
    iconAlt: 'Sports Nutrition Icon',
    title: 'Sports Nutrition',
    description: 'Boost performance with tailored, kitchen-based nutrition plans designed by Dt. Tanu Bhargava to enhance endurance, recovery, and strength, without supplements.',
    modalContent: {
      overview: 'Our Sports Nutrition plans are crafted to fuel athletes and fitness enthusiasts with nutrient-dense, kitchen-based meals. With 17+ years of expertise, Dt. Tanu Bhargava designs diets to optimize energy, muscle recovery, and performance, avoiding supplements for sustainable results.',
      benefits: [
        'Improved stamina and endurance',
        'Faster muscle recovery with natural foods',
        'Personalized plans for your sport and goals',
      ],
      success: '90% of athletes report enhanced performance within 6 weeks.',
    },
  },
  {
    id: 2,
    image: PCOSManagement,
     iconType: 'image',
    iconImage: '/Icon/women.ico',
    iconAlt: 'Sports Nutrition Icon',
    title: 'PCOS/PCOD Management',
    description: 'Balance hormones and ease PCOS symptoms with personalized diet plans from Dt. Tanu Bhargava, crafted to support menstrual health and holistic wellness.',
    modalContent: {
      overview: 'Our PCOS/PCOD Management plans address hormonal imbalances through customized, supplement-free diets and lifestyle changes. Backed by Dt. Tanu Bhargava’s global expertise, these plans promote regular cycles, weight management, and overall well-being.',
      benefits: [
        'Regulated menstrual cycles',
        'Reduced symptoms like acne and hair loss',
        'Improved energy and mood',
      ],
      success: '85% of clients see symptom improvement in 8 weeks.',
    },
  },
  {
    id: 3,
    image: WeightLoss,
    iconType: 'image',
    iconImage: '/Icon/weightLoss.ico',
    iconAlt: 'Sports Nutrition Icon',
    title: 'Weight Loss ',
    description: 'Achieve sustainable weight loss with delicious, kitchen-based meal plans by Dt. Tanu Bhargava, designed to nourish your body without starvation diets.',
    modalContent: {
      overview: 'Our Weight Loss plans focus on sustainable, supplement-free nutrition tailored to your lifestyle. With 17+ years of expertise, Dt. Tanu Bhargava creates delicious, kitchen-based diets that promote healthy weight loss while maintaining energy and satisfaction.',
      benefits: [
        'Gradual, sustainable weight reduction',
        'No hunger or restrictive diets',
        'Improved metabolism and energy levels',
      ],
      success: '80% of clients achieve their goal weight within 12 weeks.',
    },
  },
  {
    id: 4,
    image: DiabetesDiet,
    iconType: 'image',
    iconImage: '/Icon/diabetes.ico',
    iconAlt: 'Sports Nutrition Icon',
    title: 'Diabetes Diet',
    description: 'Manage blood sugar naturally with customized, nutrient-rich diets by Dt. Tanu Bhargava, balancing energy and insulin without supplements.',
    modalContent: {
      overview: 'Our Diabetes Diet plans help control blood sugar levels through personalized, kitchen-based nutrition. Dt. Tanu Bhargava’s science-backed approach ensures balanced meals that stabilize insulin, improve energy, and support long-term health without supplements.',
      benefits: [
        'Stable blood sugar levels',
        'Reduced dependency on medications',
        'Enhanced energy and vitality',
      ],
      success: '75% of clients report better glucose control in 10 weeks.',
    },
  },
  {
    id: 5,
    image: ChildNutrition,
     iconType: 'image',
    iconImage: '/Icon/child.ico',
    iconAlt: 'Sports Nutrition Icon',
    title: 'Child Nutrition',
    description: 'Support your child’s growth with fun, healthy, nutrient-dense meals tailored by Dt. Tanu Bhargava to build lifelong health and immunity.',
    modalContent: {
      overview: 'Our Child Nutrition plans are designed to support growing kids with balanced, kitchen-based meals. Dt. Tanu Bhargava’s expertise ensures fun, tasty diets that boost immunity, growth, and cognitive development, setting the foundation for lifelong health.',
      benefits: [
        'Stronger immunity and growth',
        'Improved focus and energy for school',
        'Kid-friendly, nutrient-rich meals',
      ],
      success: '95% of parents notice improved health in 8 weeks.',
    },
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const renderIcon = (service, className) => {
    if (service.iconType === 'image') {
      return (
        <img
          src={service.iconImage}
          alt={service.iconAlt}
          className={`filter-accent ${className}`}
        />
      );
    }
    const IconComponent = service.iconComponent;
    return <IconComponent className={className} />;
  };

  return (
    <section className="bg-nutricare-bg-light py-10">
      <div className="container mx-auto px-3">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h5 className="text-nutricare-primary-light font-bold mb-2 text-sm uppercase tracking-wider">Our Nutrition Services</h5>
          <h2 className="text-3xl md:text-4xl font-bold text-nutricare-text-dark mb-4">Tailored Nutrition Plans</h2>
          <p className="text-nutricare-text-gray text-sm md:text-base max-w-2xl mx-auto">
            Led by Dt. Tanu Bhargava, Nutridietmitra transforms 5000+ lives globally with personalized, kitchen-based nutrition plans. Awarded Best Dietitian (2020) and featured in Times of India, we support your health without supplements or crash diets.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows for Mobile */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-8 md:hidden">
            <button
              onClick={prevSlide}
              className="bg-nutricare-green/70 text-white p-2 rounded-full shadow-lg hover:bg-nutricare-green-dark transition -ml-4"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-nutricare-green/70 text-white p-2 rounded-full shadow-lg hover:bg-nutricare-green-dark transition -mr-4"
            >
              <ArrowRight size={20} />
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
              className="grid md:grid-cols-2 gap-4 md:gap-6 items-stretch"
            >
              {/* Image Section */}
              <div className="relative rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                <img
                  src={services[currentIndex].image}
                  alt={`${services[currentIndex].title} by Nutridietmitra`}
                  className="w-full h-56 md:h-80 object-cover"
                />
                <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-black/40 text-white p-3 text-center">
                  <h3 className="text-lg font-bold">{services[currentIndex].title}</h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 flex flex-col justify-between order-1 md:order-2">
                <div>
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="bg-nutricare-primary-light p-2 md:p-3 rounded-full mr-3">
                      {renderIcon(services[currentIndex], 'w-6 h-6 md:w-8 md:h-8 text-white')}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-nutricare-text-dark">
                      {services[currentIndex].title}
                    </h3>
                  </div>

                  <p className="text-nutricare-text-gray text-sm md:text-base mb-4 leading-relaxed">
                    {services[currentIndex].description}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openModal(services[currentIndex])}
                    className="inline-block px-4 md:px-5 py-2 md:py-2.5 bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition text-sm md:text-base"
                  >
                    Read More
                  </button>
                  <div className="text-nutricare-text-gray text-sm">
                    {currentIndex + 1} / {services.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="hidden md:flex justify-center mt-4 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
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
              className="absolute top-1/2 -translate-y-1/2 left-0 -ml-12 bg-nutricare-green text-white p-2 rounded-full shadow-lg hover:bg-nutricare-green-dark transition"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 right-0 -mr-12 bg-nutricare-green text-white p-2 rounded-full shadow-lg hover:bg-nutricare-green-dark transition"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-lg shadow-xl p-4 md:p-6 max-w-lg w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="bg-nutricare-primary-light p-2 rounded-full mr-3">
                      {renderIcon(selectedService, 'w-8 h-8 text-white')}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-nutricare-text-dark">
                      {selectedService.title}
                    </h3>
                  </div>
                  <button onClick={closeModal} className="text-nutricare-text-gray hover:text-nutricare-text-dark">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-nutricare-text-dark">Overview</h4>
                    <p className="text-nutricare-text-gray text-sm md:text-base">
                      {selectedService.modalContent.overview}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-nutricare-text-dark">Key Benefits</h4>
                    <ul className="list-disc pl-5 text-nutricare-text-gray text-sm md:text-base">
                      {selectedService.modalContent.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-nutricare-text-dark">Client Success</h4>
                    <p className="text-nutricare-text-gray text-sm md:text-base italic">
                      {selectedService.modalContent.success}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="mt-4 w-full px-4 py-2 bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition text-sm md:text-base"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Work;