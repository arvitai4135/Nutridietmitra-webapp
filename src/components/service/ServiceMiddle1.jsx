import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';
import Appointment from '../form/Appointment';

const NutritionServices = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Categories for services
  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'weight', name: 'Weight Management' },
    { id: 'chronic', name: 'Chronic Conditions' },
    { id: 'hormonal', name: 'Hormonal Health' },
    { id: 'wellness', name: 'General Wellness' },
    { id: 'lifestyle', name: 'Lifestyle Support' }
  ];

  const services = [
    {
      id: 1,
      title: "Weight Loss Plan",
      description: "Personalized diet plans to shed excess weight sustainably using kitchen-based meals, no supplements, and no fad diets.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M16.2 3.8a2.7 2.7 0 0 0 -3.81 0l-10.6 10.59a2.7 2.7 0 0 0 0 3.82l7 7a2.7 2.7 0 0 0 3.81 0l10.6 -10.59a2.7 2.7 0 0 0 0 -3.82l-7 -7" />
          <path d="M4.9 19.1l7 -7" />
        </svg>
      ),
      benefits: ["Sustainable weight loss", "Improved metabolism", "Healthy eating habits"],
      color: "from-pink-500 to-pink-600",
      category: "weight"
    },
    {
      id: 2,
      title: "Weight Gain Plan",
      description: "Customized plans for healthy weight gain, ideal for low appetite or recovery, using nutrient-dense, kitchen-based meals.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M14 6a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h4z" />
        </svg>
      ),
      benefits: ["Healthy weight gain", "Muscle growth", "Energy optimization"],
      color: "from-blue-500 to-blue-600",
      category: "weight"
    },
    {
      id: 3,
      title: "PCOS/PCOD Management",
      description: "Tailored diet and lifestyle strategies to balance hormones, improve menstrual health, and reduce PCOS symptoms.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M10 12h4" />
        </svg>
      ),
      benefits: ["Hormone balance", "Symptom relief", "Menstrual health"],
      color: "from-emerald-500 to-emerald-600",
      category: "hormonal"
    },
    {
      id: 4,
      title: "Pre and Post-Pregnancy Plan",
      description: "Expert maternal nutrition guidance for a healthy pregnancy and postpartum recovery using kitchen-based diets.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1" />
        </svg>
      ),
      benefits: ["Healthy pregnancy", "Postpartum recovery", "Maternal nutrition"],
      color: "from-purple-500 to-purple-600",
      category: "hormonal"
    },
    {
      id: 5,
      title: "Diabetes Management",
      description: "Kitchen-based meal plans to control blood sugar levels naturally, enhance insulin function, and boost energy.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 9l.01 0" />
          <path d="M15 15l.01 0" />
        </svg>
      ),
      benefits: ["Blood sugar control", "Insulin support", "Energy stability"],
      color: "from-teal-500 to-teal-600",
      category: "chronic"
    },
    {
      id: 6,
      title: "Thyroid Management",
      description: "Natural, kitchen-based diets to support thyroid function, boost metabolism, and reduce fatigue.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M7 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M17 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        </svg>
      ),
      benefits: ["Thyroid support", "Metabolism boost", "Fatigue reduction"],
      color: "from-amber-500 to-amber-600",
      category: "hormonal"
    },
    {
      id: 7,
      title: "Child Nutrition",
      description: "Fun, healthy meal plans for kids to support growth, immunity, and lifelong healthy eating habits.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M3 12h1m8 -9v1m8 8h1" />
        </svg>
      ),
      benefits: ["Growth support", "Immunity boost", "Healthy habits"],
      color: "from-orange-500 to-orange-600",
      category: "lifestyle"
    },
    {
      id: 8,
      title: "Immunity Boosting Plan",
      description: "Antioxidant-rich, kitchen-based diets to strengthen immunity and protect against illness naturally.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      benefits: ["Immune strength", "Illness resistance", "Energy boost"],
      color: "from-yellow-500 to-yellow-600",
      category: "wellness"
    },
    {
      id: 9,
      title: "Sports Nutrition",
      description: "Performance-focused nutrition to fuel athletes, enhance endurance, and support muscle recovery.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M18.5 8.5l-2.5 2.5" />
          <path d="M5.5 8.5l2.5 2.5" />
        </svg>
      ),
      benefits: ["Enhanced performance", "Muscle recovery", "Endurance support"],
      color: "from-indigo-500 to-indigo-600",
      category: "lifestyle"
    },
    {
      id: 10,
      title: "Arthritis Management",
      description: "Nutrient-rich, anti-inflammatory diets to reduce joint pain and support mobility.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 15l3 -3l3 3" />
        </svg>
      ),
      benefits: ["Pain reduction", "Joint mobility", "Inflammation control"],
      color: "from-red-500 to-red-600",
      category: "chronic"
    },
    {
      id: 11,
      title: "Anti-Inflammatory Diet",
      description: "Gut-friendly meals to reduce inflammation, alleviate chronic issues, and promote overall wellness.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 9v6" />
        </svg>
      ),
      benefits: ["Inflammation reduction", "Gut health", "Chronic issue relief"],
      color: "from-green-500 to-green-600",
      category: "wellness"
    },
    {
      id: 12,
      title: "Healthy Heart Plan",
      description: "Heart-friendly, kitchen-based meals to balance cholesterol and boost cardiovascular health.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 20a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2" />
          <path d="M9 13l-3 -3l3 -3" />
          <path d="M15 13l3 -3l-3 -3" />
        </svg>
      ),
      benefits: ["Cholesterol balance", "Heart health", "Blood pressure support"],
      color: "from-rose-500 to-rose-600",
      category: "chronic"
    },
    {
      id: 13,
      title: "Post-Menopause Management",
      description: "Nutritional plans to balance hormones, support bone health, and manage menopausal symptoms.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 9l6 6" />
        </svg>
      ),
      benefits: ["Hormone balance", "Bone health", "Symptom management"],
      color: "from-violet-500 to-violet-600",
      category: "hormonal"
    },
    {
      id: 14,
      title: "Glowing Skin Diet",
      description: "Antioxidant-rich meals and hydration plans for radiant, clear, and glowing skin.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M12 3v3" />
          <path d="M12 18v3" />
        </svg>
      ),
      benefits: ["Radiant skin", "Blemish reduction", "Hydration support"],
      color: "from-fuchsia-500 to-fuchsia-600",
      category: "wellness"
    },
    {
      id: 15,
      title: "Detox Diet",
      description: "Natural, fiber-rich meals to gently cleanse the body and boost energy levels.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
      benefits: ["Body cleansing", "Energy boost", "Digestive health"],
      color: "from-lime-500 to-lime-600",
      category: "wellness"
    },
    {
      id: 16,
      title: "Celiac Disease Management",
      description: "Delicious gluten-free diets to manage celiac disease and support gut healing.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M15 9l-6 6" />
        </svg>
      ),
      benefits: ["Gluten-free nutrition", "Gut healing", "Symptom relief"],
      color: "from-cyan-500 to-cyan-600",
      category: "chronic"
    },
    {
      id: 17,
      title: "Fatty Liver Management",
      description: "Low-fat, liver-supportive meals to reverse fatty liver symptoms and enhance detoxification.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 15l6 -6" />
        </svg>
      ),
      benefits: ["Liver detox", "Symptom reversal", "Fat reduction"],
      color: "from-emerald-600 to-emerald-700",
      category: "chronic"
    },
    {
      id: 18,
      title: "Acid Reflux Management",
      description: "Stomach-friendly diets to soothe digestion and eliminate acid reflux triggers.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 9l3 3l-3 3" />
        </svg>
      ),
      benefits: ["Reflux relief", "Digestive comfort", "Trigger elimination"],
      color: "from-blue-600 to-blue-700",
      category: "chronic"
    },
    {
      id: 19,
      title: "Fresh Fruit Bouquet Delivery",
      description: "Customizable, visually appealing fresh fruit bouquets as a healthy gift for any occasion, delivered to your doorstep.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M9 9l6 6" />
        </svg>
      ),
      benefits: ["Healthy gifting", "Customizable options", "Visual appeal"],
      color: "from-pink-600 to-pink-700",
      category: "wellness"
    },
    {
      id: 20,
      title: "Healthy Salad Delivery",
      description: "Customized, organic salads designed by experts, rich in fiber and nutrients, delivered in Jaipur.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 12h6" />
        </svg>
      ),
      benefits: ["Nutrient-rich meals", "Digestive health", "Weight management"],
      color: "from-green-600 to-green-700",
      category: "wellness"
    }
  ];

  const handleServiceClick = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setAppointmentOpen(true);
  };

  // Filter services based on active category
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <div className="font-sans bg-white text-nutricare-text-dark">
      <section className="py-20 bg-gradient-to-b from-nutricare-bg-light to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-nutricare-green bg-opacity-20 rounded-full text-nutricare-green-dark font-semibold text-sm mb-3">OUR SERVICES</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nutricare-primary-dark mb-6">Personalized Nutrition <span className="text-nutricare-green">by Nutridietmitra</span></h2>
            <p className="max-w-2xl mx-auto text-nutricare-text-gray text-lg">
              Founded by Dt. Tanu Bhargava, Nutridietmitra offers 17+ years of expertise with 5000+ clients, providing 100% personalized, kitchen-based nutrition plans with no supplements for sustainable health.
            </p>
          </div>

          {/* Category Filter - Modified for mobile column layout */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full transition-all duration-300 w-full sm:w-auto ${
                  activeCategory === category.id
                    ? 'bg-nutricare-green text-white shadow-md'
                    : 'bg-gray-100 text-nutricare-text-gray hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Category Heading - only show if not "all" */}
          {activeCategory !== 'all' && (
            <div className="mb-8 flex items-center justify-center">
              <div className="h-px bg-gray-200 flex-1"></div>
              <h3 className="text-xl font-medium text-nutricare-primary-dark mx-4 flex items-center">
                <Filter size={18} className="mr-2 text-nutricare-green" />
                {categories.find(cat => cat.id === activeCategory)?.name}
              </h3>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
          )}

          {/* Display Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredServices.map(service => (
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
                <div className={`h-3 bg-gradient-to-r ${service.color} rounded-t-2xl`}></div>
                
                <div className="bg-white p-6 h-full border-t-0 border border-gray-100 rounded-b-2xl">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl mb-5 p-3 text-white transform 
                    transition-all duration-300 relative z-10 shadow-lg`} 
                    style={{ 
                      transform: hoveredService === service.id ? 'rotate(8deg) scale(1.05)' : 'rotate(3deg)', 
                    }}>
                    {service.icon}
                    <div className="absolute -inset-0.5 bg-white opacity-20 rounded-2xl blur"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-nutricare-primary-dark mb-3 group-hover:text-nutricare-green transition-colors">{service.title}</h3>
                  
                  <p className="text-nutricare-text-gray mb-5 text-sm">{service.description}</p>
                  
                  <div className="mb-4 bg-gray-50 p-3 rounded-xl">
                    <h4 className="text-xs font-semibold text-nutricare-green-dark mb-2">KEY BENEFITS</h4>
                    <ul>
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start mb-2 text-sm text-nutricare-text-gray">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0 mt-1 mr-2`}>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
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

      <section className="py-16 bg-nutricare-primary-dark">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light rounded-2xl p-10 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 flex justify-between opacity-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 bg-white"></div>
              ))}
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Nutridietmitra Family</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
                Book your free consultation to start your journey toward a healthier lifestyle with personalized, science-backed nutrition plans.
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <Appointment 
        isOpen={appointmentOpen} 
        onClose={() => setAppointmentOpen(false)}
        selectedService={selectedService} 
      />
    </div>
  );
};

export default NutritionServices;