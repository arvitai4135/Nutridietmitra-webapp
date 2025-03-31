import React, { useState } from 'react';
import { ChevronUp, Home, ArrowRight, ExternalLink } from 'lucide-react';
import Appointment from '../form/Appointment';

const NutritionServices = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  
  // Services data
  const services = [
    {
      id: 1,
      title: "Sports Nutrition",
      description: "Expert guidance for athletes and active individuals. Our sports nutrition specialists create plans that enhance performance, support recovery, and optimize energy levels.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M14 6a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h4z" />
          <path d="M12 3v3" />
          <path d="M18.5 8.5l-2.5 2.5" />
          <path d="M12 18v3" />
          <path d="M5.5 8.5l2.5 2.5" />
        </svg>
      ),
      benefits: ["Performance optimization", "Recovery support", "Injury prevention"],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Personalized Nutrition",
      description: "Custom meal plans tailored to your unique needs, preferences, and health goals. We analyze your body composition and lifestyle to create sustainable nutrition strategies.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 10v4" />
          <path d="M10 12h4" />
        </svg>
      ),
      benefits: ["Customized meal planning", "Dietary assessments", "Supplement guidance"],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      id: 3,
      title: "Weight Management",
      description: "Sustainable approaches to weight loss that focus on nourishing your body. We emphasize healthy habits and balanced nutrition for long-term success.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M16.2 3.8a2.7 2.7 0 0 0 -3.81 0l-10.6 10.59a2.7 2.7 0 0 0 0 3.82l7 7a2.7 2.7 0 0 0 3.81 0l10.6 -10.59a2.7 2.7 0 0 0 0 -3.82l-7 -7" />
          <path d="M4.9 19.1l7 -7" />
          <path d="M15.7 15.7a1 1 0 0 0 1.4 -1.4" />
        </svg>
      ),
      benefits: ["Sustainable fat loss", "Metabolic optimization", "Habit formation"],
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 4,
      title: "Wellness Coaching",
      description: "Holistic support that addresses nutrition, physical activity, stress management, and sleep. Our coaches help you build habits that promote total wellbeing.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 9l.01 0" />
          <path d="M15 9l.01 0" />
          <path d="M8 13a4 4 0 0 0 8 0m0 0h-8" />
        </svg>
      ),
      benefits: ["Stress management", "Sleep optimization", "Work-life balance"],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      title: "Child Nutrition",
      description: "Age-appropriate nutrition guidance for growing bodies and minds. We help parents establish healthy eating patterns that support development and lifelong wellness.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </svg>
      ),
      benefits: ["Developmental support", "Allergy management", "Picky eater strategies"],
      color: "from-amber-500 to-amber-600"
    },
    {
      id: 6,
      title: "Fitness Programming",
      description: "Scientifically designed workout routines that complement your nutrition plan. We create balanced exercise programs that fit your schedule and preferences.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M7 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M17 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M10 12h4" />
        </svg>
      ),
      benefits: ["Personalized workouts", "Progress tracking", "Technique optimization"],
      color: "from-teal-500 to-teal-600"
    }
  ];

  // Make the entire service card clickable
  const handleServiceClick = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setAppointmentOpen(true);
  };

  return (
    <div className="font-sans bg-white text-nutricare-text-dark">
      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-nutricare-bg-light to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-nutricare-green bg-opacity-20 rounded-full text-nutricare-green-dark font-semibold text-sm mb-3">WHAT WE OFFER</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nutricare-primary-dark mb-6">Nutrition Services <span className="text-nutricare-green">Designed for You</span></h2>
            <p className="max-w-2xl mx-auto text-nutricare-text-gray text-lg">
              Our evidence-based approach combines clinical expertise with personalized care to help you 
              achieve sustainable results and transform your relationship with food and fitness.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div 
                key={service.id} 
                className="relative overflow-hidden rounded-2xl transition-all duration-300 group cursor-pointer"
                style={{ 
                  transform: hoveredService === service.id ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredService === service.id 
                    ? '0 20px 25px -5px rgba(157, 11, 127, 0.1), 0 10px 10px -5px rgba(157, 11, 127, 0.04)'
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
                onClick={() => handleServiceClick(service.title)}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Card Header with Gradient */}
                <div className={`h-3 bg-gradient-to-r ${service.color} rounded-t-2xl`}></div>
                
                <div className="bg-white p-8 h-full border-t-0 border border-gray-100 rounded-b-2xl">
                  {/* Icon with Animation */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl mb-6 p-3 text-white transform 
                    transition-all duration-300 relative z-10 shadow-lg`} 
                    style={{ 
                      transform: hoveredService === service.id ? 'rotate(8deg) scale(1.05)' : 'rotate(3deg)', 
                    }}>
                    {service.icon}
                    <div className="absolute -inset-0.5 bg-white opacity-20 rounded-2xl blur"></div>
                  </div>
                  
                  {/* Title with Animation */}
                  <h3 className="text-2xl font-bold text-nutricare-primary-dark mb-4 group-hover:text-nutricare-green transition-colors">{service.title}</h3>
                  
                  <p className="text-nutricare-text-gray mb-6">{service.description}</p>
                  
                  {/* Benefits with Enhanced Styling */}
                  <div className="mb-6 bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-nutricare-green-dark mb-3">KEY BENEFITS</h4>
                    <ul>
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start mb-3 text-nutricare-text-gray">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0 mt-1 mr-3`}>
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Decorative Dots */}
                <div className="absolute top-4 right-4 flex space-x-1 opacity-50">
                  <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`}></div>
                  <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`}></div>
                  <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-nutricare-primary-dark">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light rounded-2xl p-10 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 flex justify-between opacity-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 bg-white"></div>
              ))}
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Nutrition?</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
                Book a free consultation to discuss your goals and discover how our personalized approach can help you achieve lasting results.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => {
                    setSelectedService('General Consultation');
                    setAppointmentOpen(true);
                  }}
                  className="bg-nutricare-green hover:bg-nutricare-green-dark text-white py-3 px-8 rounded-full font-medium transition-colors"
                >
                  Book Free Consultation
                </button>
                <a 
                  href="/faq" 
                  className="border border-white text-white py-3 px-8 rounded-full font-medium hover:bg-white hover:text-nutricare-primary-dark transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Appointment Modal with selectedService passed */}
      <Appointment 
        isOpen={appointmentOpen} 
        onClose={() => setAppointmentOpen(false)}
        selectedService={selectedService} 
      />

      {/* Back to top button */}
      <a 
        href="#top" 
        className="fixed bottom-6 right-6 bg-nutricare-green hover:bg-nutricare-green-dark text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <ChevronUp size={24} />
      </a>
    
    </div>
  );
};

export default NutritionServices;