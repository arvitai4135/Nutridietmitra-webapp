import React from 'react';
import About1 from '/assets/Images/About1.jpg'
import AboutUs from '../components/about/AboutUs';
// import AboutTop from '../components/about/AboutTop';
import AboutMiddle from '../components/about/AboutMiddle'

const About = () => {
  return (
    <>
    <div className="relative w-full">
      {/* Background with overlay gradient */}
      <div className="relative h-48 sm:h-56 md:h-80 overflow-hidden">
        {/* Image background */}
        <div className="absolute inset-0 bg-nutricare-primary-dark opacity-20"></div>
        <img 
          src={About1} 
          alt="Fresh healthy foods" 
          className="object-cover w-full h-full"
        />
        
        {/* Diagonal overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            background: `linear-gradient(135deg, rgba(158, 11, 127, 0.85) 0%, rgba(217, 59, 177, 0.6) 50%, rgba(173, 208, 28, 0.4) 100%)`
          }}
        ></div>
        
        {/* Decorative elements - adjusted for better mobile display */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-nutricare-green opacity-20 rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 md:w-48 md:h-48 bg-nutricare-primary-light opacity-20 rounded-tl-full"></div>
      </div>
      
      {/* Content overlay - improved text sizing for mobile */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 sm:mb-2 md:mb-4 text-center">
          About Us
        </h1>
        
        {/* Breadcrumb with updated styling */}
        <div className="flex items-center text-white text-xs sm:text-sm md:text-base">
          <a 
            href="/" 
            className="flex items-center hover:text-nutricare-green transition-colors"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Home
          </a>
          <span className="mx-1 sm:mx-2 text-nutricare-green">•</span>
          <span className="text-nutricare-green font-medium">About Us</span>
        </div>
      </div>
      
      {/* Decorative wave at bottom - preserved but with better mobile scaling */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
          <path 
            fill="#FFFFFF" 
            fillOpacity="1" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
      
      {/* Floating icon elements - improved for mobile display */}
      <div className="hidden sm:flex p-2 sm:p-3 absolute -bottom-4 sm:-bottom-6 left-1/4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-nutricare-green rounded-full z-10 shadow-lg items-center justify-center">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      
      <div className="hidden sm:flex p-2 sm:p-3 absolute -bottom-4 sm:-bottom-6 right-1/4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-nutricare-primary-dark rounded-full z-10 shadow-lg items-center justify-center">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
    </div>
    
    {/* Content components */}
    <div className="overflow-x-hidden">
      <AboutUs/>
      {/* <AboutTop/> */}
      <AboutMiddle/>
    </div>
    </>
  );
}

export default About;