import React, { useState, useEffect, useContext } from 'react';
import { createAppointment } from '../../api/appointment';
import { AuthContext } from '../../admin/context/AuthContext'; // Import AuthContext

const Appointment = ({ isOpen, onClose }) => {
  const { isLoggedIn } = useContext(AuthContext); // Access AuthContext
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
    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      errors.name = 'Name must be 100 characters or less';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.mobile_number) {
      errors.mobile_number = 'Mobile number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.mobile_number)) {
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

    // Optional: Check if logged in (if backend requires authentication)
    if (!isLoggedIn) {
      setSubmissionError('Please log in to book an appointment.');
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
        const { status, data } = error.response;
        if (status === 401) {
          errorMessage = 'Unauthorized. Please log in again.';
        } else if (status === 422) {
          errorMessage = data.detail?.map((err) => err.msg).join(', ') || 'Invalid input data.';
        } else if (status === 500) {
          errorMessage = data.message || 'Server error occurred. Please contact support.';
        } else {
          errorMessage = data.message || data.detail || 'An error occurred.';
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
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
                autoComplete="off"
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
                autoComplete="off"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm">{validationErrors.email}</p>
              )}
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
                autoComplete="off"
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
                autoComplete="off"
              />
            </div>
            <div>
              <textarea
                name="dietConcern"
                value={formData.dietConcern}
                onChange={handleChange}
                placeholder="Your Concern/Message Regarding Diet"
                className="w-full p-3 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-1 focus:ring-nutricare-primary-dark"
                autoComplete="off"
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