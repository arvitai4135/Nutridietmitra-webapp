import React, { useState, useEffect } from 'react';
import { createAppointment } from '../../api/appointment';

const Appointment = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    medicalIssues: '',
    dietConcern: '',
  });
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (formData.name.length > 100) {
      errors.name = 'Name must be 100 characters or less';
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.mobile_number)) {
      errors.mobile_number = 'Invalid mobile number (e.g., +1234567890)';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    try {
      const response = await createAppointment(formData);
      console.log('Appointment created successfully:', response);
      setSubmissionSuccess(true);
      setFormData({
        name: '',
        email: '',
        mobile_number: '',
        medicalIssues: '',
        dietConcern: '',
      });
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error('Full error response:', error.response ? error.response.data : error.message);
      let errorMessage = 'Failed to book appointment. Please try again later.';
      if (error.response) {
        if (error.response.status === 422) {
          errorMessage = error.response.data.detail?.[0]?.msg || 'Validation error';
        } else if (error.response.status === 500) {
          errorMessage = error.response.data?.detail?.[0]?.msg || error.response.data?.message || 'Server error occurred. Please contact support.';
        } else if (error.response.data) {
          errorMessage = error.response.data.toString();
        }
      }
      setSubmissionError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="bg-nutricare-primary-dark text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Book Appointment</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-nutricare-bg-light transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
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
              {validationErrors.name && (
                <p className="text-red-500 text-sm">{validationErrors.name}</p>
              )}
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
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder="Your Mobile Number (required, e.g., +1234567890)"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-nutricare-primary-dark"
                required
              />
              {validationErrors.mobile_number && (
                <p className="text-red-500 text-sm">{validationErrors.mobile_number}</p>
              )}
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
            {submissionError && <p className="text-red-500">{submissionError}</p>}
            {submissionSuccess && (
              <p className="text-green-500">Appointment booked successfully!</p>
            )}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full py-3 bg-nutricare-primary-dark text-white font-semibold rounded hover:bg-nutricare-primary-light transition-colors duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Send'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;