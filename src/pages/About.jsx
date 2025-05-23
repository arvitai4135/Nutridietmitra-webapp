import React from 'react';
import About1 from '/assets/Images/About1.jpg';
import AboutUs from '../components/about/AboutUs';
import AboutMiddle from '../components/about/AboutMiddle';

const About = () => {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* Main image with overlay */}
        <div className="relative">
          <img 
            src={About1} 
            alt="About Us Background" 
            className="w-full h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] object-cover object-center"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#9E0B7F]/90 to-[#D93BB1]/80"></div>
          
          {/* Content positioned over the image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center text-center">
                {/* Decorative circles, hidden on smaller screens */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#ADD01C]/30"></div>
                </div>
                <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 hidden lg:block">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#ADD01C]/20"></div>
                </div>
                
                {/* Main heading with animated underline */}
                <div className="relative mb-4 sm:mb-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white relative inline-block">
                    About Us
                    <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-0.5 sm:h-0.75 bg-[#ADD01C]">
                      <div className="absolute top-0 left-0 w-1/3 h-full bg-white"></div>
                    </div>
                  </h1>
                </div>
                
                {/* Enhanced breadcrumb */}
                <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 text-white bg-[#9E0B7F]/50 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[0.65rem] sm:text-xs md:text-sm">
                  <a 
                    href="index.html" 
                    className="flex items-center hover:text-[#ADD01C] transition-colors duration-300 group"
                  >
                    <div className="bg-white/20 p-0.5 sm:p-1 rounded-full mr-1 sm:mr-1.5 group-hover:bg-[#ADD01C]/30 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    Home
                  </a>
                  
                  <span className="flex items-center px-0.5 sm:px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 sm:h-2.5 sm:w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  
                  <span className="text-[#ADD01C] font-medium flex items-center">
                    <div className="bg-[#ADD01C]/20 p-0.5 sm:p-1 rounded-full mr-1 sm:mr-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    About Us
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave shape with accent colors */}
        <div className="relative bg-white">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 60" 
            preserveAspectRatio="none" 
            className="w-full h-4 sm:h-6 md:h-8 lg:h-10 -mt-1"
          >
            <path 
              d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" 
              fill="#D93BB1" 
              opacity="0.3"
            ></path>
            <path 
              d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,56C840,48,960,32,1080,26.7C1200,21,1320,27,1380,29.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" 
              fill="#9E0B7F" 
              opacity="0.2"
            ></path>
          </svg>
          
          {/* Additional accent stripe */}
      
        </div>
      </div>
      
      {/* Content components */}
      <div className="overflow-x-hidden">
        <AboutUs />
        <AboutMiddle />
      </div>
    </>
  );
};

export default About;