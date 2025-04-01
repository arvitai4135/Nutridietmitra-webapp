import React from 'react';
import About1 from '/assets/Images/About1.jpg'

const GalleryHeader = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Main background image */}
      <div className="relative h-64 md:h-80 lg:h-90 w-full">
        <img 
          src={About1}
          alt="Gallery background"
          className="absolute w-full h-full object-cover"
        />
        
        {/* Overlay with more sophisticated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-nutricare-primary-dark via-nutricare-primary-light to-nutricare-primary-dark opacity-85"></div>
        
        {/* Decorative patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-32 h-32 border-2 border-nutricare-green opacity-20 rounded-full"></div>
          <div className="absolute top-1/4 right-1/4 w-48 h-48 border-2 border-nutricare-green-dark opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-nutricare-green opacity-20 rounded-full"></div>
        </div>
        
        {/* Content container - centered vertically and horizontally */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Title with improved typography */}
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-tight mb-4">
                Gallery Classic
              </h1>
              
              {/* Enhanced divider */}
              <div className="flex items-center justify-center mb-4">
                <div className="h-1 w-12 bg-nutricare-green rounded-full"></div>
                <div className="h-1 w-24 mx-2 bg-nutricare-green-dark rounded-full"></div>
                <div className="h-1 w-12 bg-nutricare-green rounded-full"></div>
              </div>
              
              {/* Improved breadcrumb with better spacing and visual style */}
              <div className="inline-flex items-center justify-center bg-white bg-opacity-10 px-6 py-2 rounded-full">
                <a href="index.html" className="text-white hover:text-nutricare-green transition-colors duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-medium">Home</span>
                </a>
                <span className="mx-3 text-nutricare-bg-light">•</span>
                <span className="text-nutricare-green font-medium">Gallery Classic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration - more pronounced */}
      <div className="relative h-12 md:h-16 bg-nutricare-bg-light">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute -top-10 left-0 w-full h-12 md:h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#FCF0F8" opacity=".8"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#FCF0F8" opacity=".5"></path>
        </svg>
      </div>
    </div>
  );
};

export default GalleryHeader;