import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Consultency = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    annualSale: '',
    email: '',
    contactNumber: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRadioChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      annualSale: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-md shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#9E0B7F] text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Free Consultancy</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-[#FCF0F8] transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Form */}
        <div className="p-6">
          <p className="text-[#333333] mb-4 text-center">Please fill in your details to continue:</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#9E0B7F]"
                required
              />
            </div>
            
            <div>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="Brand Name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#9E0B7F]"
                required
              />
            </div>
            
            {/* <div>
              <label className="block text-[#333333] mb-2">Annual Sale:</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="annualSale"
                    checked={formData.annualSale === 'Above 1 Cr'}
                    onChange={() => handleRadioChange('Above 1 Cr')}
                    className="mr-2 accent-[#9E0B7F]"
                  />
                  Above 1 Cr
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="annualSale"
                    checked={formData.annualSale === 'Below 1 Cr'}
                    onChange={() => handleRadioChange('Below 1 Cr')}
                    className="mr-2 accent-[#9E0B7F]"
                  />
                  Below 1 Cr
                </label>
              </div>
            </div> */}
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#9E0B7F]"
                required
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#9E0B7F]"
                required
              />
            </div>
            
            <div>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Any Comments (Optional)"
                className="w-full p-3 border border-gray-300 rounded h-24 resize-none focus:outline-none focus:ring-1 focus:ring-[#9E0B7F]"
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold rounded transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consultency;