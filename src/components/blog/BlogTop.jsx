import React from 'react';

const BlogPageTitle = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background image using img tag */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/assets/Images/About1.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light opacity-80 z-10"></div>
      </div>

      {/* Content section with reduced height */}
      <div className="relative z-30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Title with enhanced styling */}
            <div className="relative mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 font-sans tracking-tight">
                Blog
              </h1>
              <div className="h-1 w-20 bg-nutricare-green mx-auto mt-2 rounded-full"></div>
            </div>
            
            {/* Enhanced breadcrumb navigation */}
            <div className="breadcrumb flex flex-wrap items-center justify-center text-sm md:text-base text-white gap-3 mt-1">
              <a 
                href="index.html" 
                className="flex items-center hover:text-nutricare-green transition-colors duration-300 font-medium"
                title="Homepage"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </a>
              
              {/* Divider with proper styling */}
              <span className="text-nutricare-bg-light opacity-70 px-1">
                •••
              </span>
              
              <span className="text-nutricare-green font-semibold">Blog</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Smaller wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-6 md:h-10">
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            className="fill-nutricare-bg-light"
          ></path>
        </svg>
      </div>
      
      {/* Decorative circles with improved positioning */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-24 h-24 rounded-full bg-nutricare-green opacity-10"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-nutricare-primary-light opacity-10"></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 rounded-full bg-nutricare-green-dark opacity-10"></div>
      </div>
    </div>
  );
};

export default BlogPageTitle;