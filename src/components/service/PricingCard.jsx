import React, { useState } from 'react';
import SubscriptionForm from '../form/OrderForm';

const PricingCard = ({ 
  title, 
  price, 
  isFeatured = false, 
  features,
  highlightedFeatures = [],
  period = 'month',
  onSubscribe // Payment handler from PricingSection
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle modal state
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Determine the plan type based on the period
  const getPlanType = () => {
    return period === 'meal' || period === 'week' ? 'foodDelivery' : 'subscription';
  };

  return (
    <>
      <div 
        className={`flex flex-col h-full rounded-xl overflow-hidden transition-all duration-500 ${
          isFeatured 
            ? 'shadow-2xl border-t-4 border-nutricare-green relative z-10 bg-white transform scale-105'
            : `shadow-lg ${isHovered ? 'transform -translate-y-2 shadow-xl' : 'bg-white'}`
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isFeatured && (
          <div className="absolute top-4 right-4 z-20">
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
        
        <div className="p-8 bg-white flex-grow flex flex-col relative">
          <div className="mb-1 transition-all duration-500 flex items-center justify-center">
            <span className={`text-5xl font-bold ${isFeatured ? 'text-nutricare-primary-dark' : 'text-gray-800'}`}>{price}</span>
          </div>
          
          <p className="text-nutricare-text-gray text-sm mb-6 text-center">{period !== 'custom' ? `per ${period}` : ''}</p>
          
          <div className={`bg-nutricare-bg-light rounded-full py-2 px-4 mb-8 inline-block mx-auto transition-all duration-500 ${
            isHovered ? 'bg-nutricare-primary-light bg-opacity-10' : ''
          }`}>
            <p className="text-nutricare-primary-light font-medium text-sm">{period === 'meal' ? '10% Gym Member Discount' : 'Free Consultation'}</p>
          </div>
          
          {/* Feature List with Left Alignment */}
          <div className="mb-8 flex-grow">
            <ul className="space-y-4">
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
                    <span>{feature}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <button 
            onClick={openModal}
            className={`w-full py-4 px-6 rounded-full font-bold text-white transition-all duration-500 ${
              isFeatured 
                ? 'bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light' 
                : isHovered 
                  ? 'bg-nutricare-green shadow-lg' 
                  : 'bg-gray-800'
            } hover:shadow-lg relative overflow-hidden group`}
          >
            <span className="relative z-10">{period === 'meal' || period === 'week' ? 'Order Now' : 'Get Started'}</span>
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${
              isFeatured 
                ? 'from-nutricare-primary-light to-nutricare-primary-dark'
                : 'from-nutricare-green-dark to-nutricare-green'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
          </button>
        </div>
      </div>

      {/* Modal Form */}
      <SubscriptionForm 
        isOpen={isModalOpen}
        onClose={closeModal}
        planTitle={title}
        planPrice={price}
        planType={getPlanType()}
        planPeriod={period}
        onSubmit={onSubscribe} // Pass the payment handler
      />
    </>
  );
};

export default PricingCard;