import React, { useState, useEffect } from "react";

const Appointment = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    medicalIssues: "",
    dietConcern: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    onClose();
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-md shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-nutricare-primary-dark text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Book Appointment</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-nutricare-bg-light transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name (required)"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-nutricare-primary-dark"
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email (required)"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-nutricare-primary-dark"
                required
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Your Mobile Number (required)"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-nutricare-primary-dark"
                required
              />
            </div>
            
            <div>
              <input
                type="text"
                name="medicalIssues"
                value={formData.medicalIssues}
                onChange={handleChange}
                placeholder="Medical Issues & Concern"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-nutricare-primary-dark"
              />
            </div>
            
            <div>
              <textarea
                name="dietConcern"
                value={formData.dietConcern}
                onChange={handleChange}
                placeholder="Your Concern/Message Regarding Diet"
                className="w-full p-3 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-1 focus:ring-nutricare-primary-dark"
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-nutricare-primary-dark text-white font-semibold rounded hover:bg-nutricare-primary-light transition-colors duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;