import React, { useState } from 'react';

const PricingCard = ({ 
  title, 
  price, 
  isFeatured = false, 
  features,
  highlightedFeatures = [],
  period = 'month'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`flex flex-col h-full rounded-xl overflow-hidden transition-all duration-500 ${
        isFeatured 
          ? 'shadow-2xl border-t-4 border-nutricare-green relative z-20 bg-white transform scale-105'
          : `shadow-lg ${isHovered ? 'transform -translate-y-2 shadow-xl' : 'bg-white'}`
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFeatured && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-nutricare-green text-white text-xs py-1 px-3 rounded-full font-bold shadow-md">
            POPULAR
          </div>
        </div>
      )}
      
      <div className={`py-8 text-center relative overflow-hidden ${
        isFeatured ? 'bg-nutricare-green bg-opacity-10' : 'bg-gray-800'
      }`}>
        <h3 className={`text-2xl font-bold relative z-10 ${isFeatured ? 'text-nutricare-primary-dark' : 'text-white'}`}>{title}</h3>
        
        <div className={`absolute inset-0 bg-gradient-to-r ${
          isFeatured 
            ? 'from-nutricare-green-dark to-nutricare-green opacity-5' 
            : 'from-gray-700 to-gray-900 opacity-20'
        } transition-transform duration-700 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}></div>
      </div>
      
      <div className="p-8 text-center bg-white flex-grow flex flex-col relative">
        <div className="mb-1 transition-all duration-500 flex items-center justify-center">
          <span className={`text-5xl font-bold ${isFeatured ? 'text-nutricare-primary-dark' : 'text-gray-800'}`}>{price}</span>
        </div>
        
        <p className="text-nutricare-text-gray text-sm mb-6">{period !== 'custom' ? `per ${period}` : ''}</p>
        
        <div className={`bg-nutricare-bg-light rounded-full py-2 px-4 mb-8 inline-block mx-auto transition-all duration-500 ${
          isHovered ? 'bg-nutricare-primary-light bg-opacity-10' : ''
        }`}>
          <p className="text-nutricare-primary-light font-medium text-sm">7 Days Free Trial</p>
        </div>
        
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((feature, index) => {
            const isHighlighted = highlightedFeatures.includes(feature);
            return (
              <li 
                key={index} 
                className={`flex items-center transition-all duration-300 ${
                  isHighlighted 
                    ? 'text-nutricare-primary-dark font-medium' 
                    : 'text-nutricare-text-gray'
                }`}
              >
                <svg 
                  className={`w-5 h-5 mr-3 flex-shrink-0 transition-colors duration-300 ${
                    isHighlighted 
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
          <span className="relative z-10">Get Started</span>
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
  const [activeTab, setActiveTab] = useState('regular');
  
  const features = {
    regular: [
      'Fresh Daily Meals',
      'Customizable Menu',
      'Free Delivery',
      'Nutrition Tracking',
      'Customer Support'
    ],
    monthly: [
      '24 Meals per Month',
      'Fresh Daily Delivery',
      'Balanced Nutrition',
      'Meal Customization',
      'Support Included'
    ],
    singleMeal: [
      'Nutritionally Balanced',
      'Chef-Crafted Recipe',
      'Premium Ingredients',
      'Calorie Controlled',
      'Same-Day Delivery'
    ],
    weeklyMeal: [
      '7 Fresh Meals',
      'Variety of Options',
      'Nutritionist Approved',
      'Free Delivery',
      'Flexible Scheduling'
    ]
  };

  const highlightedFeatures = {
    '1 Month': ['Fresh Daily Meals', 'Free Delivery'],
    '2 Months': ['Fresh Daily Meals', 'Free Delivery', 'Nutrition Tracking'],
    '3 Months': ['Fresh Daily Meals', 'Customizable Menu', 'Free Delivery', 'Nutrition Tracking'],
    '6 Months': ['Fresh Daily Meals', 'Customizable Menu', 'Free Delivery', 'Nutrition Tracking', 'Customer Support'],
    'Monthly Meal Plan': ['24 Meals per Month', 'Fresh Daily Delivery', 'Balanced Nutrition'],
    'Single Meal': ['Nutritionally Balanced', 'Premium Ingredients'],
    'Weekly Meal Plan': ['7 Fresh Meals', 'Free Delivery', 'Nutritionist Approved']
  };

  return (
    <section className="py-20 bg-nutricare-bg-light relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-nutricare-primary-light opacity-5 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-nutricare-green opacity-5 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-nutricare-primary-dark opacity-5 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-nutricare-primary-light bg-opacity-10 text-nutricare-primary-dark font-medium mb-4">Pricing Plans</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-nutricare-text-dark">Nutrition Plans That Fit Your Lifestyle</h2>
          <p className="text-xl text-nutricare-text-gray mb-10">
            Choose from our carefully designed meal plans, tailored to meet your nutritional needs and budget.
          </p>
          
          {/* Toggle between regular plans and monthly meal plan */}
          <div className="inline-flex bg-white p-1 rounded-full shadow-md mb-8">
            <button 
              className={`py-2 px-6 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'regular' 
                  ? 'bg-nutricare-green text-white shadow-md' 
                  : 'text-nutricare-text-gray hover:text-nutricare-primary-dark'
              }`}
              onClick={() => setActiveTab('regular')}
            >
              Subscription Plans
            </button>
            <button 
              className={`py-2 px-6 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'monthly' 
                  ? 'bg-nutricare-green text-white shadow-md' 
                  : 'text-nutricare-text-gray hover:text-nutricare-primary-dark'
              }`}
              onClick={() => setActiveTab('monthly')}
            >
              Food Delivery
            </button>
          </div>
        </div>
        
        {activeTab === 'regular' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div>
              <PricingCard
                title="1 Month"
                price="₹4,000"
                period="month"
                features={features.regular}
                highlightedFeatures={highlightedFeatures['1 Month']}
              />
            </div>
            
            <div>
              <PricingCard
                title="2 Months"
                price="₹7,000"
                period="2 months"
                features={features.regular}
                highlightedFeatures={highlightedFeatures['2 Months']}
              />
            </div>
            
            <div>
              <PricingCard
                title="3 Months"
                price="₹9,000"
                period="3 months"
                isFeatured={true}
                features={features.regular}
                highlightedFeatures={highlightedFeatures['3 Months']}
              />
            </div>
            
            <div>
              <PricingCard
                title="6 Months"
                price="₹18,000"
                period="6 months"
                features={features.regular}
                highlightedFeatures={highlightedFeatures['6 Months']}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div>
              <PricingCard
                title="Single Meal"
                price="₹200"
                period="meal"
                features={features.singleMeal}
                highlightedFeatures={highlightedFeatures['Single Meal']}
              />
            </div>
            
            <div>
              <PricingCard
                title="Weekly Meal Plan"
                price="₹1,400"
                period="week"
                isFeatured={true}
                features={features.weeklyMeal}
                highlightedFeatures={highlightedFeatures['Weekly Meal Plan']}
              />
            </div>
            
            <div>
              <PricingCard
                title="Monthly Meal Plan"
                price="₹4,800"
                period="month"
                features={features.monthly}
                highlightedFeatures={highlightedFeatures['Monthly Meal Plan']}
              />
            </div>
          </div>
        )}
        
        <div className="text-center mt-16 bg-white rounded-xl shadow-md p-8 max-w-xl mx-auto">
          <div className="inline-block rounded-full bg-nutricare-green bg-opacity-10 p-3 mb-4">
            <svg className="w-6 h-6 text-nutricare-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-nutricare-primary-dark mb-2">Need a custom nutrition plan?</h4>
          <p className="text-nutricare-text-gray mb-4">Our nutrition experts can create a personalized meal plan tailored to your specific health goals and dietary requirements.</p>
          <button className="px-8 py-3 rounded-full bg-nutricare-green hover:bg-nutricare-green-dark text-white font-medium transition-colors duration-300 shadow-md hover:shadow-lg">
            Get a Custom Plan
          </button>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-nutricare-text-gray">
            <span className="font-medium text-nutricare-primary-dark">100% Satisfaction Guarantee</span> - If you're not completely satisfied within your first 7 days, we'll give you a full refund.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;