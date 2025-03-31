import React, { useState } from 'react';

const PricingCard = ({ 
  title, 
  price, 
  isFeatured = false, 
  features,
  highlightedFeatures = []
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`flex flex-col h-full rounded-xl overflow-hidden transition-all duration-500 ${
        isFeatured 
          ? 'shadow-2xl border-t-4 border-nutricare-green relative z-20 bg-white'
          : `shadow-lg ${isHovered ? 'transform -translate-y-2 shadow-xl' : ''}`
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 text-center relative overflow-hidden ${
        isFeatured ? 'bg-nutricare-green bg-opacity-10' : 'bg-gray-800'
      }`}>
        {isFeatured && (
          <div className="absolute top-0 right-0">
            <div className="bg-nutricare-green text-white text-xs py-1 px-6 font-bold rotate-45 translate-x-5 translate-y-2">
              POPULAR
            </div>
          </div>
        )}
        <h3 className={`text-2xl font-bold relative z-10 ${isFeatured ? 'text-nutricare-primary-dark' : 'text-white'}`}>{title}</h3>
        
        {/* Animated background element */}
        <div className={`absolute inset-0 bg-gradient-to-r ${
          isFeatured 
            ? 'from-nutricare-green-dark to-nutricare-green opacity-5' 
            : 'from-gray-700 to-gray-900 opacity-20'
        } transition-transform duration-700 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}></div>
      </div>
      
      <div className="p-8 text-center bg-white flex-grow flex flex-col relative">
        {/* Animated price tag */}
        <div className={`mb-6 transition-all duration-500 ${isHovered ? 'transform scale-110' : ''}`}>
          <span className={`text-5xl font-bold ${isFeatured ? 'text-nutricare-primary-dark' : 'text-gray-800'}`}>{price}</span>
          <span className="text-lg text-nutricare-text-gray"> / per month</span>
        </div>
        
        <div className={`bg-nutricare-bg-light rounded-lg py-2 px-4 mb-8 inline-block mx-auto transition-all duration-500 ${
          isHovered ? 'bg-nutricare-primary-light bg-opacity-10' : ''
        }`}>
          <p className="text-nutricare-primary-light font-medium">With 7 Days Free Trial</p>
        </div>
        
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((feature, index) => {
            const isHighlighted = highlightedFeatures.includes(feature);
            return (
              <li 
                key={index} 
                className={`flex items-center justify-center transition-all duration-300 ${
                  isHovered && isHighlighted 
                    ? 'text-nutricare-primary-dark font-medium transform scale-105' 
                    : 'text-nutricare-text-gray'
                }`}
              >
                <svg 
                  className={`w-5 h-5 mr-2 transition-colors duration-300 ${
                    isHovered && isHighlighted 
                      ? 'text-nutricare-primary-light' 
                      : isFeatured ? 'text-nutricare-green' : 'text-gray-500'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            );
          })}
        </ul>
        
        <button 
          className={`w-full py-4 px-6 rounded-full font-bold text-white transition-all duration-500 ${
            isFeatured 
              ? 'bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light' 
              : isHovered 
                ? 'bg-nutricare-green shadow-lg' 
                : 'bg-gray-800'
          } hover:shadow-lg relative overflow-hidden group`}
        >
          <span className="relative z-10">Order Now</span>
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${
            isFeatured 
              ? 'from-nutricare-primary-light to-nutricare-primary-dark'
              : 'from-nutricare-green-dark to-nutricare-green'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        </button>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const features = [
    '24 H support',
    'Business Analyzing',
    'Custom Managements',
    'Complete Documentation',
    'Working Materials Format'
  ];

  // Define which features to highlight when hovered
  const highlightedFeatures = {
    'Basic': ['24 H support', 'Complete Documentation'],
    'Advance': ['24 H support', 'Business Analyzing', 'Custom Managements', 'Complete Documentation'],
    'Standard': ['24 H support', 'Business Analyzing', 'Working Materials Format']
  };

  // Toggle between monthly and yearly billing
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-20 bg-nutricare-bg-light relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-nutricare-primary-light opacity-5 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-nutricare-green opacity-5 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-nutricare-primary-dark opacity-5 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-nutricare-primary-light bg-opacity-10 text-nutricare-primary-dark font-medium mb-4">What We Plan</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-nutricare-text-dark">Our Plans &amp; Price</h2>
          <p className="text-xl text-nutricare-text-gray mb-10">
            We have set different meal plans for our clients. They can choose any of them from our services as per their convenient price.
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`text-sm font-medium mr-3 ${!isYearly ? 'text-nutricare-primary-dark' : 'text-nutricare-text-gray'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-12 items-center rounded-full"
            >
              <span className={`toggle-bg absolute inset-0 rounded-full transition-colors duration-300 ${isYearly ? 'bg-nutricare-green' : 'bg-gray-300'}`}></span>
              <span className={`toggle-dot bg-white h-5 w-5 rounded-full shadow transform transition-transform duration-300 ${isYearly ? 'translate-x-6' : 'translate-x-1'}`}></span>
            </button>
            <span className={`text-sm font-medium ml-3 ${isYearly ? 'text-nutricare-primary-dark' : 'text-nutricare-text-gray'}`}>
              Yearly <span className="text-nutricare-green">Save 20%</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="md:mt-8">
            <PricingCard
              title="Basic"
              price={isYearly ? "153.50$" : "15.99$"}
              features={features}
              highlightedFeatures={highlightedFeatures['Basic']}
            />
          </div>
          
          <div>
            <PricingCard
              title="Advance"
              price={isYearly ? "249.50$" : "25.99$"}
              isFeatured={true}
              features={features}
              highlightedFeatures={highlightedFeatures['Advance']}
            />
          </div>
          
          <div className="md:mt-8">
            <PricingCard
              title="Standard"
              price={isYearly ? "182.30$" : "18.99$"}
              features={features}
              highlightedFeatures={highlightedFeatures['Standard']}
            />
          </div>
        </div>
        
        <div className="text-center mt-12 bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
          <h4 className="text-xl font-bold text-nutricare-primary-dark mb-2">Need a custom plan?</h4>
          <p className="text-nutricare-text-gray mb-4">Contact our team for a personalized solution tailored to your needs.</p>
          <button className="px-6 py-2 rounded-full bg-nutricare-green hover:bg-nutricare-green-dark text-white font-medium transition-colors duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;