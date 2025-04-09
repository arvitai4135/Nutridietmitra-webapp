import React, { useState } from 'react';
import PricingCard from '../service/PricingCard';
import SubscriptionForm from '../form/OrderForm';

// Add global styles for animations
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Add styles to prevent body scrolling when modal is open */
body.modal-open {
  overflow: hidden;
}
`;

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState('regular');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  
  // Set body class when custom modal is open
  React.useEffect(() => {
    if (isCustomModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup function
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isCustomModalOpen]);
  
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

  const openCustomModal = () => setIsCustomModalOpen(true);
  const closeCustomModal = () => setIsCustomModalOpen(false);

  return (
    <section className="py-20 bg-nutricare-bg-light relative overflow-hidden">
      {/* Inject global styles */}
      <style>{globalStyles}</style>
      
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
          <button 
            onClick={openCustomModal}
            className="px-8 py-3 rounded-full bg-nutricare-green hover:bg-nutricare-green-dark text-white font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Get a Custom Plan
          </button>
        </div>
        
        {/* Custom Plan Modal */}
        <SubscriptionForm 
          isOpen={isCustomModalOpen}
          onClose={closeCustomModal}
          planTitle="Custom Nutrition Plan"
          planPrice="Custom"
          planType="subscription"
          planPeriod="custom"
        />
        
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