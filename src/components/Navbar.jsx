import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../admin/context/AuthContext"; // Adjust path as needed
import api from "../admin/services/api"; // Import Axios instance
import "@fortawesome/fontawesome-free/css/all.min.css";
import Appointment from "../components/form/Appointment"; // Import the Appointment component

// Custom hook to lock body scroll
const useLockBodyScroll = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);
};

// Service to fetch user profile
const getUserProfile = async () => {
  try {
    const response = await api.get("/users/info");
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch user info");
    }
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user profile");
  }
};

// Service to update user profile (assumed endpoint)
const updateUserProfile = async (userData) => {
  try {
    const response = await api.put("/users/update", userData); // Adjust endpoint if different
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update user info");
    }
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update user profile");
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, setUser } = useContext(AuthContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Lock body scroll when menu or modals are open
  useLockBodyScroll(isMenuOpen || isProfileModalOpen || isSearchOpen || isAppointmentOpen);

  // Fetch user profile when modal opens
  useEffect(() => {
    if (isProfileModalOpen && user) {
      const fetchProfile = async () => {
        try {
          const profile = await getUserProfile();
          setFormData({
            full_name: profile.full_name || "",
            phone_number: profile.phone_number || "",
            email: profile.email || user.email,
          });
        } catch (err) {
          setError(err.message);
        }
      };
      fetchProfile();
    }
  }, [isProfileModalOpen, user]);

  // Functions to handle redirection for auth
  const handleSignIn = () => {
    navigate("/login");
    closeMenu();
  };

  const handleSignUp = () => {
    navigate("/signup");
    closeMenu();
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const toggleAppointment = () => {
    setIsAppointmentOpen(!isAppointmentOpen);
    if (!isAppointmentOpen && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Function to close the mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Modal handlers
  const handleModalClose = () => {
    setIsProfileModalOpen(false);
    setError("");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!formData.full_name.trim()) {
      setError("Full name is required");
      setLoading(false);
      return;
    }
    if (!/^\d{10}$/.test(formData.phone_number)) {
      setError("Phone number must be 10 digits");
      setLoading(false);
      return;
    }

    try {
      const updatedProfile = await updateUserProfile({
        full_name: formData.full_name,
        phone_number: formData.phone_number,
      });
      setUser({ ...user, full_name: updatedProfile.full_name }); // Update context
      setIsProfileModalOpen(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    setIsProfileModalOpen(false);
    navigate("/change-password");
  };

  return (
    <div className="bg-nutricare-bg-light shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center py-3 gap-2 md:gap-4">
          {/* Menu Toggle for Mobile */}
          <div className="md:hidden flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none text-nutricare-primary-dark transition-transform duration-300 ease-in-out"
              aria-label="Toggle menu"
            >
              <i className={`fas fa-${isMenuOpen ? "times" : "bars"} text-lg`}></i>
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-lg font-bold text-nutricare-primary-dark">
              NutriDiet
            </Link>
          </div>

          {/* Right: Auth buttons and Search for mobile view */}
          <div className="flex items-center space-x-1 md:hidden ml-auto">
            <div className="flex space-x-1">
              {user ? (
                <div className="flex items-center gap-1">
                  <span className="text-nutricare-primary-dark font-medium text-xs">
                    {user.email.split("@")[0]}
                  </span>
                  <i
                    className="fas fa-user text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300 cursor-pointer text-xs"
                    onClick={handleProfileClick}
                    title="Profile"
                  ></i>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSignIn}
                    className="py-1 px-2 text-xs bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="py-1 px-2 text-xs bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition-colors duration-300 font-sans"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-nutricare-primary-dark transition-colors duration-300 hover:text-nutricare-green"
            >
              <i className="fas fa-search text-lg"></i>
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:space-x-6 font-sans fixed md:static top-12 left-0 w-full md:w-auto bg-nutricare-bg-light md:bg-transparent shadow md:shadow-none z-50 md:z-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 py-4 md:py-0 max-h-[calc(100vh-3rem)] overflow-y-auto overscroll-contain transition-all duration-300 ease-in-out ${
              isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full md:opacity-100 md:translate-x-0"
            }`}
          >
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 text-sm md:text-base ${
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
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 text-sm md:text-base ${
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
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 text-sm md:text-base ${
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
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 text-sm md:text-base ${
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
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 text-sm md:text-base ${
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
                `block py-2 px-4 md:px-3 rounded-full transition-all duration-300 text-sm md:text-base ${
                  isActive
                    ? "text-nutricare-primary-dark bg-nutricare-bg-light"
                    : "text-nutricare-text-dark hover:text-nutricare-primary-dark hover:bg-nutricare-bg-light"
                }`
              }
            >
              Contact Us
            </NavLink>
            {user && (
              <button
                onClick={handleLogout}
                className="md:hidden py-2 px-4 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans text-sm"
              >
                Logout
              </button>
            )}
            <button
              onClick={toggleAppointment}
              className="md:hidden py-2 px-4 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans text-sm"
            >
              Book Appointment
            </button>
          </nav>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-nutricare-primary-dark transition-colors duration-300 hover:text-nutricare-green"
            >
              <i className="fas fa-search text-lg"></i>
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-nutricare-primary-dark font-medium text-base">
                  {user.email.split("@")[0]}
                </span>
                <i
                  className="fas fa-user text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300 cursor-pointer text-base"
                  onClick={handleProfileClick}
                  title="Profile"
                ></i>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans text-base"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="py-2 px-4 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans text-base"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="py-2 px-4 bg-nutricare-green text-white rounded-full hover:bg-nutricare-green-dark transition-colors duration-300 font-sans text-base"
                >
                  Sign Up
                </button>
              </>
            )}
            <button
              onClick={toggleAppointment}
              className="py-2 px-6 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors duration-300 font-sans text-base"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-nutricare-bg-light p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md transform transition-all duration-300 ease-in-out scale-100">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-4 right-4 text-nutricare-text-dark hover:text-nutricare-green transition-colors duration-300"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
              <form className="flex items-center">
                <input
                  type="search"
                  placeholder="Type Word Then Enter..."
                  className="w-full p-2 border border-nutricare-text-gray rounded-l focus:outline-none focus:border-nutricare-primary-dark font-sans text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="bg-nutricare-primary-dark text-white p-2 rounded-r hover:bg-nutricare-green transition-colors duration-300"
                >
                  <i className="fas fa-search text-sm sm:text-base"></i>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-xs sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">User Profile</h2>
                <button
                  onClick={handleModalClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email (Read-only)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-sm sm:text-base px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nutricare-green focus:ring-nutricare-green text-sm sm:text-base px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                    pattern="\d{10}"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nutricare-green focus:ring-nutricare-green text-sm sm:text-base px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Subscription Plan (Read-only)
                  </label>
                  <input
                    type="text"
                    value={user.subscription_plan || "Not subscribed"}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-sm sm:text-base px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Food Plan (Read-only)
                  </label>
                  <input
                    type="text"
                    value={user.food_plan || "No food plan"}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-sm sm:text-base px-3 py-2"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-nutricare-primary-dark hover:bg-nutricare-primary-light text-white px-4 py-2 rounded text-sm sm:text-base transition-colors duration-300"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className="w-full sm:w-auto bg-nutricare-green hover:bg-nutricare-green-dark text-white px-4 py-2 rounded text-sm sm:text-base transition-colors duration-300"
                  >
                    Change Password
                  </button>
                </div>
              </form>
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