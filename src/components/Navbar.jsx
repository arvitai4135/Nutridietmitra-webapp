import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../admin/context/AuthContext"; // Adjust path as needed
import "@fortawesome/fontawesome-free/css/all.min.css";
import Appointment from "../components/form/Appointment"; // Import the Appointment component

const Navbar = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useContext(AuthContext); // Access user, updateUser, and logout from AuthContext
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // State for profile modal
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    phone_number: user?.phone_number || ''
  }); // State for editable fields

  // Functions to handle redirection for auth
  const handleSignIn = () => {
    navigate("/login");
    closeMenu();
  };

  const handleSignUp = () => {
    navigate("/signup");
    closeMenu();
  };

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/"); // Redirect to main website
    closeMenu();
  };

  // Function to handle dashboard navigation
  const handleDashboardClick = () => {
    try {
      console.log("Dashboard button clicked, user:", user);
      setIsProfileModalOpen(false); // Close modal
      navigate("/dashboard");
      console.log("Navigation to /admin/dashboard attempted");
    } catch (err) {
      console.error("Navigation error:", err);
      alert("Failed to navigate to dashboard. Please try again.");
    }
  };

  const toggleAppointment = () => {
    setIsAppointmentOpen(!isAppointmentOpen);
    // Close menu when appointment is opened on mobile
    if (!isAppointmentOpen && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Function to close the mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to open/close profile modal
  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
    // Close menu when profile modal is opened on mobile
    if (!isProfileModalOpen && isMenuOpen) {
      setIsMenuOpen(false);
    }
    // Reset form data when closing modal
    if (isProfileModalOpen) {
      setFormData({
        full_name: user?.full_name || '',
        phone_number: user?.phone_number || ''
      });
    }
  };

  // Function to navigate to change password
  const handleChangePassword = () => {
    navigate("/change-password");
    setIsProfileModalOpen(false); // Close modal
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle save
  const handleSave = async () => {
    try {
      // Call updateUser from AuthContext (replace with your actual update logic)
      await updateUser({
        full_name: formData.full_name,
        phone_number: formData.phone_number
      });
      setIsProfileModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Failed to update user:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="bg-nutricare-bg-light shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Menu Toggle for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none text-nutricare-primary-dark transition-transform duration-300 ease-in-out"
              aria-label="Toggle menu"
            >
              <i className={`fas fa-${isMenuOpen ? "times" : "bars"} text-xl`}></i>
            </button>
          </div>

          {/* Logo - keep the original space for logo if needed */}
          <div className="flex-shrink-0 md:hidden">
            <Link to="/" className="text-xl font-bold text-nutricare-primary-dark">
              NutriDiet
            </Link>
          </div>

          {/* Right: Auth buttons and Search for mobile view */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Auth buttons or user name for mobile view */}
            <div className="flex space-x-1">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-nutricare-primary-dark font-medium text-sm">
                    Welcome, {user.email.split('@')[0]}!
                  </span>
                  <i
                    className="fas fa-user text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300 cursor-pointer text-sm"
                    onClick={toggleProfileModal} // Open profile modal
                    title="Profile"
                  ></i>
                  <button
                    onClick={handleLogout}
                    className="py-1 px-3 text-sm bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSignIn}
                    className="py-1 px-3 text-sm bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="py-1 px-3 text-sm bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition-colors duration-300 font-sans"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Search Button for mobile */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-nutricare-primary-dark transition-colors duration-300 hover:text-nutricare-green"
            >
              <i className="fas fa-search text-xl"></i>
            </button>
          </div>

          {/* Original Desktop Navigation Links - PRESERVED EXACTLY */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:space-x-6 font-sans absolute md:static top-16 left-0 w-full md:w-auto bg-nutricare-bg-light md:bg-transparent shadow md:shadow-none z-50 md:z-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 py-6 md:py-0 transition-all duration-700 ease-in-out ${
              isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 md:opacity-100 md:translate-x-0"
            }`}
          >
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Service
            </NavLink>
            <NavLink
              to="/gallery"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/blogs"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Contact Us
            </NavLink>

            {/* Appointment button for mobile view */}
            <button
              onClick={toggleAppointment}
              className="md:hidden py-2 px-6 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans"
            >
              Book Appointment
            </button>
          </nav>

          {/* Original Desktop Right Buttons - PRESERVED EXACTLY */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button for desktop */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-nutricare-primary-dark transition-colors duration-300 hover:text-nutricare-green"
            >
              <i className="fas fa-search text-xl"></i>
            </button>

            {/* Appointment Button for desktop */}
            <button
              onClick={toggleAppointment}
              className="py-2 px-6 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-nutricare-bg-light p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out scale-100">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-4 right-4 text-nutricare-text-dark hover:text-nutricare-green transition-colors duration-300"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              <form className="flex items-center">
                <input
                  type="search"
                  placeholder="Type Word Then Enter..."
                  className="w-full p-2 border border-nutricare-text-gray rounded-l focus:outline-none focus:border-nutricare-primary-dark font-sans"
                />
                <button
                  type="submit"
                  className="bg-nutricare-primary-dark text-white p-2 rounded-r hover:bg-nutricare-green transition-colors duration-300"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {isProfileModalOpen && user && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-nutricare-bg-light p-6 rounded-lg shadow-lg w-[90%] max-w-md transform transition-all duration-300 ease-in-out scale-100 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={toggleProfileModal}
                className="absolute top-4 right-4 text-nutricare-text-dark hover:text-nutricare-green transition-colors duration-300"
              >
                <i className="fas fa-times text-xl"></i>
              </button>

              {/* Modal Header */}
              <h2 className="text-xl font-bold text-nutricare-primary-dark mb-4">Profile Information</h2>

              {/* Profile Form */}
              <div className="space-y-4">
                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-nutricare-text-dark">Email</label>
                  <input
                    type="email"
                    value={user.email || 'N/A'}
                    readOnly
                    className="w-full p-2 border border-nutricare-text-gray rounded focus:outline-none bg-gray-100 font-sans text-sm"
                  />
                </div>

                {/* Full Name (Editable) */}
                <div>
                  <label className="block text-sm font-medium text-nutricare-text-dark">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-nutricare-text-gray rounded focus:outline-none focus:border-nutricare-primary-dark font-sans text-sm"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Phone Number (Editable) */}
                <div>
                  <label className="block text-sm font-medium text-nutricare-text-dark">Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-nutricare-text-gray rounded focus:outline-none focus:border-nutricare-primary-dark font-sans text-sm"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Subscription Details (Read-only, placeholder) */}
                <div>
                  <label className="block text-sm font-medium text-nutricare-text-dark">Subscription Plan</label>
                  <input
                    type="text"
                    value={user.subscription_plan || 'Basic Plan'} // Placeholder, replace with actual data
                    readOnly
                    className="w-full p-2 border border-nutricare-text-gray rounded focus:outline-none bg-gray-100 font-sans text-sm"
                  />
                </div>

                {/* Food Plan Details (Read-only, placeholder) */}
                <div>
                  <label className="block text-sm font-medium text-nutricare-text-dark">Food Plan</label>
                  <input
                    type="text"
                    value={user.food_plan || 'Standard Diet'} // Placeholder, replace with actual data
                    readOnly
                    className="w-full p-2 border border-nutricare-text-gray rounded focus:outline-none bg-gray-100 font-sans text-sm"
                  />
                </div>

                {/* Dashboard Button for Admins */}
                {user?.role === "admin" && (
                  <button
                    onClick={handleDashboardClick}
                    className="w-full py-2 px-4 bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition-colors duration-300 font-sans text-sm"
                    title="Go to Dashboard"
                  >
                    Dashboard
                  </button>
                )}

                {/* Change Password Button */}
                <button
                  onClick={handleChangePassword}
                  className="w-full py-2 px-4 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans text-sm"
                >
                  Change Password
                </button>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="w-full py-2 px-4 bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition-colors duration-300 font-sans text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Modal */}
        <Appointment isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
      </div>
    </div>
  );
};

export default Navbar;