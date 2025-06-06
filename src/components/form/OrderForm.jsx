import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../admin/context/AuthContext';

const OrderForm = ({
  isOpen,
  onClose,
  planTitle,
  planPrice,
  planType,
  planPeriod,
  onSubmit,
  user,
}) => {
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phoneNumber: '',
    address: '',
    selectedPlanType: planType || 'subscription',
    price: planPrice || '₹4,000',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: user?.full_name || '',
        email: user?.email || '',
        phoneNumber: '',
        address: '',
        selectedPlanType: planType || 'subscription',
        price: planPrice || '₹4,000',
        startDate: new Date().toISOString().split('T')[0],
        endDate: calculateEndDate(planPeriod),
      });
      setError(null);
    }
  }, [isOpen, planType, planPrice, planPeriod, user]);

  function calculateEndDate(period) {
    const today = new Date();
    if (!period || period === 'custom') return '';

    let endDate = new Date(today);
    switch (period) {
      case 'month':
        endDate.setMonth(today.getMonth() + 1);
        break;
      case '2 months':
        endDate.setMonth(today.getMonth() + 2);
        break;
      case '3 months':
        endDate.setMonth(today.getMonth() + 3);
        break;
      case '6 months':
        endDate.setMonth(today.getMonth() + 6);
        break;
      case 'week':
        endDate.setDate(today.getDate() + 7);
        break;
      case 'meal':
        endDate = today;
        break;
    }
    return endDate.toISOString().split('T')[0];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'startDate') {
      const newStartDate = new Date(value);
      let newEndDate = new Date(newStartDate);
      switch (planPeriod) {
        case 'month':
          newEndDate.setMonth(newStartDate.getMonth() + 1);
          break;
        case '2 months':
          newEndDate.setMonth(newStartDate.getMonth() + 2);
          break;
        case '3 months':
          newEndDate.setMonth(newStartDate.getMonth() + 3);
          break;
        case '6 months':
          newEndDate.setMonth(newStartDate.getMonth() + 6);
          break;
        case 'week':
          newEndDate.setDate(newStartDate.getDate() + 7);
          break;
        case 'meal':
          newEndDate = newStartDate;
          break;
        default:
          newEndDate = newStartDate;
      }
      setFormData({
        ...formData,
        [name]: value,
        endDate: planPeriod === 'custom' ? '' : newEndDate.toISOString().split('T')[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate form inputs
    if (!formData.fullName) {
      setError('Full name is required');
      setLoading(false);
      return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Valid email is required');
      setLoading(false);
      return;
    }
    const phoneNumber = formData.phoneNumber.startsWith('+91') ? formData.phoneNumber : `+91${formData.phoneNumber}`;
    if (!/^\+91\d{10}$/.test(phoneNumber)) {
      setError('Phone number must be in the format +919876543210');
      setLoading(false);
      return;
    }
    if (!formData.address) {
      setError('Delivery address is required');
      setLoading(false);
      return;
    }

    const payload = {
      customer_name: formData.fullName,
      customer_email: formData.email,
      customer_phone: phoneNumber,
      address: formData.address,
      price: formData.price,
      planTitle: planTitle,
      link_purpose: formData.selectedPlanType,
      start_date: formData.startDate,
      end_date: formData.endDate,
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err) {
      console.error('Order submission error:', err);
      setError(err.message || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-4 mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 bg-white rounded-full p-1 shadow-md"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-2">
          <h3 className="text-xl font-bold text-pink-600">Get Started with {planTitle}</h3>
          <p className="text-gray-500 text-sm">Complete your information to begin your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2" autoComplete="off">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              required
              placeholder="e.g., +919876543210"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              required
              autoComplete="off"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
            <div className="flex space-x-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="selectedPlanType"
                  value="subscription"
                  checked={formData.selectedPlanType === 'subscription'}
                  onChange={handleChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                  autoComplete="off"
                />
                <span className="ml-1 text-sm text-gray-700">Subscription</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="selectedPlanType"
                  value="foodDelivery"
                  checked={formData.selectedPlanType === 'foodDelivery'}
                  onChange={handleChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                  autoComplete="off"
                />
                <span className="ml-1 text-sm text-gray-700">Food Delivery</span>
              </label>
            </div>
          </div>

          <div className="bg-gray-100 p-2 rounded-md">
            <h4 className="font-medium text-pink-600 mb-1">Plan Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label htmlFor="price" className="block text-xs font-medium text-gray-500 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  readOnly
                  className="w-full px-2 py-1 bg-white border border-gray-300 rounded-md text-gray-800"
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block text-xs font-medium text-gray-500 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  autoComplete="off"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="endDate" className="block text-xs font-medium text-gray-500 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  readOnly
                  className="w-full px-2 py-1 bg-white border border-gray-300 rounded-md text-gray-800"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-pink-600 text-white font-medium rounded-full hover:bg-pink-700 transition-colors duration-300 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : 'Complete Order'}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;