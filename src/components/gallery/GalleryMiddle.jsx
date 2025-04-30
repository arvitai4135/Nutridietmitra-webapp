import React, { useState } from 'react';

const PortfolioGallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  // Portfolio item data updated based on Nutridietmitra.pdf
  const portfolioItems = [
    {
      id: 1,
      title: "Weight Loss Program",
      categories: ["Weight Management", "Diet"],
      image: "/assets/Images/WeightLoss.jpg",
    },
    {
      id: 2,
      title: "PCOS/PCOD Nutrition",
      categories: ["Hormonal Health", "Diet"],
      image: "/assets/Images/PCOSNutrition.jpg",
    },
    {
      id: 3,
      title: "Diabetes Management",
      categories: ["Chronic Conditions", "Diet"],
      image: "/assets/Images/DiabetesManagement.jpg",
    },
    {
      id: 4,
      title: "Child Nutrition Plan",
      categories: ["Lifestyle Support", "Diet"],
      image: "/assets/Images/ChildNutrition.jpg",
    },
    {
      id: 5,
      title: "Sports Nutrition",
      categories: ["Lifestyle Support", "Diet"],
      image: "/assets/Images/SportsNutrition.jpg",
    },
    {
      id: 6,
      title: "Glowing Skin Diet",
      categories: ["General Wellness", "Diet"],
      image: "/assets/Images/GlowingSkinDiet.jpg",
    },
    {
      id: 7,
      title: "Thyroid Management",
      categories: ["Hormonal Health", "Diet"],
      image: "/assets/Images/ThyroidManagement.jpg",
    },
    {
      id: 8,
      title: "Healthy Salad Delivery",
      categories: ["General Wellness", "Food Delivery"],
      image: "/assets/Images/HealthyFood.jpg",
    },
    {
      id: 9,
      title: "Fresh Fruit Bouquet",
      categories: ["General Wellness", "Food Delivery"],
      image: "/assets/Images/FruitBouquet.jpg",
    }
  ];
  
  // Updated categories for filtering based on Nutridietmitra services
  const categories = ['All', 'Weight Management', 'Hormonal Health', 'Chronic Conditions', 'Lifestyle Support', 'General Wellness', 'Food Delivery'];
  
  // Filter portfolio items based on active tab
  const filteredItems = activeTab === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.categories.includes(activeTab));

  return (
    <div className="bg-nutricare-bg-light font-sans py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Portfolio Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nutricare-primary-dark mb-2">
            Nutridietmitra Programs & Services
          </h2>
          <div className="w-24 h-1 bg-nutricare-green mx-auto mb-4"></div>
          <p className="text-nutricare-text-gray max-w-2xl mx-auto">
            Discover our personalized, kitchen-based nutrition programs and food delivery services designed for your health goals.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${
                activeTab === category
                  ? 'bg-nutricare-primary-dark text-white shadow-lg transform scale-105'
                  : 'bg-white text-nutricare-text-dark hover:bg-nutricare-green hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-nutricare-primary-dark bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-4">
                      <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-nutricare-primary-dark hover:bg-nutricare-green hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-nutricare-primary-dark hover:bg-nutricare-green hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 10-5.656-5.656l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.categories.map((category, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 bg-nutricare-bg-light text-nutricare-primary-dark rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-nutricare-text-dark group-hover:text-nutricare-primary-dark transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-10 h-1 bg-nutricare-green mt-3 mb-2 group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button (optional) */}
        {filteredItems.length > 6 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors shadow-md hover:shadow-lg">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioGallery;