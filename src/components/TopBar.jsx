import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TopBar = () => {
  return (
    <div className="w-full py-5 bg-nutricare-bg-light text-nutricare-text-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 font-sans text-base">
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2 text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300"></i>
              <span>7 km, Khumharheda, Dehradun Road, Saharanpur, UP 247001</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock mr-2 text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300"></i>
              <span className="text-nutricare-text-gray">Mon-Fri: 8am to 5pm</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center">
              <i className="fas fa-envelope mr-2 text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300"></i>
              <a
                href="mailto:support@nutridiet.in"
                className="text-nutricare-primary-dark hover:text-nutricare-primary-light transition-colors duration-300"
              >
                support@nutridiet.in
              </a>
            </div>
            <div className="flex items-center gap-4">
              {["facebook-f", "twitter", "linkedin-in", "flickr"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="text-nutricare-primary-dark"
                  aria-label={icon}
                >
                  <i className={`fab fa-${icon} hover:text-nutricare-green transition-colors duration-300`}></i>
                </a>
              ))}
            </div>
            <Link
              to="/schedule"
              className="bg-nutricare-primary-dark text-nutricare-bg-light px-6 py-2 rounded-lg font-semibold hover:bg-nutricare-primary-light hover:text-nutricare-text-dark transition-all duration-300 ease-in-out"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;