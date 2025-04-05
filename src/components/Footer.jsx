import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaFlickr,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

import HealthyFood from "/assets/Images/HealthyFood.jpg";
import HealthyGlutenFree from "/assets/Images/HealthyGlutenFree.jpg";
import HealthLifestyle from "/assets/Images/HealthLifestyle.jpg";
import Appointment from "./form/Appointment";

// Component to render the green dot icon
const LinkIcon = () => (
  <span className="w-2 h-2 bg-nutricare-green mr-2 inline-block"></span>
);

const Footer = () => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const recentPosts = [
    {
      id: 1,
      title: "How Much Do You Really Need to Eat Daily?",
      date: "20 April, 2018",
      image: HealthyFood,
    },
    {
      id: 2,
      title: "7 Simple & Healthy Gluten-Free Cookies",
      date: "01 August, 2018",
      image: HealthyGlutenFree,
    },
    {
      id: 3,
      title: "Tips For Staying Healthy On Vacation",
      date: "13 March, 2018",
      image: HealthLifestyle,
    },
  ];

  return (
    <footer className="bg-nutricare-text-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info Column */}
          <div>
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-nutricare-green flex items-center justify-center mr-2">
                  <span className="text-nutricare-text-dark font-bold">N</span>
                </div>
                <h2 className="text-xl font-bold">NutriDietMitra</h2>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Founded by Dt. Tanu Bhargava in 2014, NutriDietMitra is a premier diet clinic in Jaipur with over 17 years of expertise in nutrition and wellness.
              </p>
              <div className="w-12 h-1 bg-nutricare-green mb-4"></div>
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-nutricare-green mr-2" size={14} />
                <a
                  href="mailto:Nutridietmitra@gmail.com"
                  className="text-gray-400 text-sm hover:text-nutricare-green transition duration-300"
                >
                  Nutridietmitra@gmail.com
                </a>
              </div>
              <div className="flex items-center mb-3">
                <FaPhone className="text-nutricare-green mr-2" size={14} />
                <span className="text-gray-400 text-sm">+91-7568796XXX</span>
              </div>
              <div className="flex space-x-2">
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300"
                >
                  <FaFacebookF className="text-white" size={12} />
                </a>
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300"
                >
                  <FaTwitter className="text-white" size={12} />
                </a>
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300"
                >
                  <FaFlickr className="text-white" size={12} />
                </a>
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300"
                >
                  <FaLinkedinIn className="text-white" size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-nutricare-green"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-sm">
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Personalized Nutrition
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Wellness Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Individual Coaching
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Sports Nutrition
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Child Nutrition
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsAppointmentOpen(true)}
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300 w-full text-left"
                >
                  <LinkIcon />
                  Make Appointments
                </button>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Online Consultations
                </Link>
              </li>
            </ul>
          </div>

          {/* Recent Posts Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative">
              <span className="relative z-10">Recent Posts</span>
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-nutricare-green"></span>
            </h3>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex space-x-2">
                  <div className="flex-shrink-0 w-14 h-14 bg-gray-700 rounded-md overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center text-xs text-gray-400 mb-1">
                      <FaCalendarAlt
                        className="mr-1 text-nutricare-green"
                        size={10}
                      />
                      <span>{post.date}</span>
                    </div>
                    <a
                      href="#"
                      className="text-xs hover:text-nutricare-green transition duration-300"
                    >
                      {post.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative">
              <span className="relative z-10">Newsletter</span>
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-nutricare-green"></span>
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe for exclusive wellness tips, diet plans, and updates from Dt. Tanu Bhargava.
            </p>
            <form className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="EMAIL"
                  placeholder="Your email address.."
                  required
                  className="w-full sm:flex-1 p-2 text-sm rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nutricare-green"
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className="w-full sm:w-auto bg-nutricare-green text-white py-1.5 px-3 text-sm rounded-md hover:bg-nutricare-green-dark transition duration-300 cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-xs mb-3 md:mb-0">
              Copyright © {new Date().getFullYear()}{" "}
              <a
                href="#"
                className="text-nutricare-green hover:text-white transition duration-300"
              >
                NutriDietMitra
              </a>
              . All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a
                href="/privacy"
                className="text-gray-400 text-xs hover:text-nutricare-green transition duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/refund"
                className="text-gray-400 text-xs hover:text-nutricare-green transition duration-300"
              >
                Refund Policy
              </a>
              <a
                href="/shipping"
                className="text-gray-400 text-xs hover:text-nutricare-green transition duration-300"
              >
                Shipping Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 text-xs hover:text-nutricare-green transition duration-300"
              >
                T&C
              </a>
              <a
                href="/contact"
                className="text-gray-400 text-xs hover:text-nutricare-green transition duration-300"
              >
                Contact
              </a>
              <a
                href="/about"
                className="text-gray-400 text-xs hover:text-nutricare-green transition duration-300"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <Appointment
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        selectedService="General Appointment"
      />

      {/* Scroll to top button */}
      <button
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-nutricare-green flex items-center justify-center shadow-lg hover:bg-nutricare-green-dark transition duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;