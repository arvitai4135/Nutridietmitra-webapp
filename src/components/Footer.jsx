import React from 'react';
import { FaFacebookF, FaTwitter, FaFlickr, FaLinkedinIn, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import Blog1 from '../assets/Images/Blog1.jpg'
import HealthyGlutenFree from '../assets/Images/HealthyGlutenFree.jpg'
import HealthLifestyle from '../assets/Images/HealthLifestyle.jpg'

const Footer = () => {
  // Sample blog post data with actual image URLs
  const recentPosts = [
    {
      id: 1,
      title: "How Much Do Eat You Really Need Day?",
      date: "20 April, 2018",
      image: Blog1 // Using a placeholder for the demo
    },
    {
      id: 2,
      title: "7 Simple & Healthy Gluten Free Cookie",
      date: "01 August, 2018",
      image: HealthyGlutenFree // Using a placeholder for the demo
    },
    {
      id: 3,
      title: "Tips For Staying Healthy On Vacations",
      date: "13 March, 2018",
      image: HealthLifestyle // Using a placeholder for the demo
    }
  ];
  
  return (
    <footer className="bg-nutricare-text-dark text-white">

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info Column */}
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-nutricare-green flex items-center justify-center mr-2">
                  <span className="text-nutricare-text-dark font-bold">N</span>
                </div>
                <h2 className="text-2xl font-bold">NutriDietMitra</h2>
              </div>
              <p className="text-gray-400 mb-6">
                We have been the most trusted Health care Nutrition for 25 years. We're proud of our rich history for nutritionists services.
              </p>
              <div className="w-16 h-1 bg-nutricare-green mb-6"></div>
              
              <div className="flex items-center mb-3">
                <FaEnvelope className="text-nutricare-green mr-3" />
                <a href="mailto:support@nutridiet.in" className="text-gray-400 hover:text-nutricare-green transition duration-300">
                support@nutridiet.in
                </a>
              </div>
              <div className="flex items-center mb-6">
                <FaPhone className="text-nutricare-green mr-3" />
                <span className="text-gray-400">+91-7568796XXX</span>
              </div>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300">
                  <FaFacebookF className="text-white" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300">
                  <FaTwitter className="text-white" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300">
                  <FaFlickr className="text-white" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300">
                  <FaLinkedinIn className="text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-nutricare-green"></span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300">
                  <span className="w-2 h-2 bg-nutricare-green mr-2"></span>
                  Personalized Nutrition
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300">
                  <span className="w-2 h-2 bg-nutricare-green mr-2"></span>
                  Wellness Programs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300">
                  <span className="w-2 h-2 bg-nutricare-green mr-2"></span>
                  Individual Coaching
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300">
                  <span className="w-2 h-2 bg-nutricare-green mr-2"></span>
                  Sports Nutritionist Diet
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300">
                  <span className="w-2 h-2 bg-nutricare-green mr-2"></span>
                  Child Nutritionist Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300">
                  <span className="w-2 h-2 bg-nutricare-green mr-2"></span>
                  Make Appointments
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300">
                  <span className="w-2 h-2 bg-nutricare-green mr-2"></span>
                  Our Pricing Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300">
                  <span className="w-2 h-2 bg-nutricare-green mr-2"></span>
                  Online Nutrition Services
                </a>
              </li>
            </ul>
          </div>

          {/* Recent Posts Column - FIXED */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative">
              <span className="relative z-10">Recent Posts</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-nutricare-green"></span>
            </h3>
            <div className="space-y-4">
              {recentPosts.map(post => (
                <div key={post.id} className="flex space-x-3">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-700 rounded-md overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center text-xs text-gray-400 mb-1">
                      <FaCalendarAlt className="mr-1 text-nutricare-green" size={12} />
                      <span>{post.date}</span>
                    </div>
                    <a href="#" className="text-sm hover:text-nutricare-green transition duration-300">
                      {post.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              Copyright © {new Date().getFullYear()} <a href="#" className="text-nutricare-green hover:text-white transition duration-300">NutriDietMitra</a>. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 text-sm hover:text-nutricare-green transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-nutricare-green transition duration-300">Contact</a>
              <a href="#" className="text-gray-400 text-sm hover:text-nutricare-green transition duration-300">Supplier</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-nutricare-green flex items-center justify-center shadow-lg hover:bg-nutricare-green-dark transition duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;