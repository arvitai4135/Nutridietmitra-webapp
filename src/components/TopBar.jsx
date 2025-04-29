import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../admin/context/AuthContext";
import api from "../admin/services/api"; // Import Axios instance from your api.js
import "@fortawesome/fontawesome-free/css/all.min.css";

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

const TopBar = () => {
  const navigate = useNavigate();
  const { user, logout, setUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    profile_path: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user profile when modal opens
  useEffect(() => {
    if (isModalOpen && user) {
      const fetchProfile = async () => {
        try {
          const profile = await getUserProfile();
          setFormData({
            full_name: profile.full_name || "",
            phone_number: profile.phone_number || "",
            profile_path: profile.profile_path || "profile_pictures/default.png",
            email: profile.email || user.email,
          });
        } catch (err) {
          setError(err.message);
        }
      };
      fetchProfile();
    }
  }, [isModalOpen, user]);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
        profile_path: formData.profile_path || "profile_pictures/default.png",
      });
      setUser({ ...user, full_name: updatedProfile.full_name }); // Update context
      setIsModalOpen(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    setIsModalOpen(false);
    navigate("/change-password");
  };

  return (
    <>
      {/* Add hidden sm:block to hide on mobile */}
      <div className="hidden sm:block w-full py-4 bg-nutricare-bg-light text-nutricare-text-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 font-sans text-sm sm:text-base" style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300"></i>
                <span className="text-xs sm:text-sm">
                  OM RESIDENCY 93/B2 Mauji Colony, Malviya Nagar, Jaipur, Rajasthan
                </span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock mr-2 text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300"></i>
                <span className="text-nutricare-text-gray text-xs sm:text-sm">
                  Mon-Fri: 8am to 5pm
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center">
                <i className="fas fa-envelope mr-2 text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300"></i>
                <a
                  href="mailto:Nutridietmitra@gmail.com"
                  className="text-nutricare-primary-dark hover:text-nutricare-primary-light transition-colors duration-300 text-xs sm:text-sm"
                >
                  Nutridietmitra@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-nutricare-primary-dark font-medium text-xs sm:text-sm">
                        Welcome, {user.email.split("@")[0]}!
                      </span>
                      <i
                        className="fas fa-user text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300 cursor-pointer"
                        onClick={handleProfileClick}
                        title="Profile"
                      ></i>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-nutricare-primary-dark hover:bg-nutricare-primary-light text-white px-3 py-1 rounded text-xs sm:text-sm transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSignIn}
                      className="bg-nutricare-primary-dark hover:bg-nutricare-primary-light text-white px-3 py-1 rounded text-xs sm:text-sm transition-colors duration-300"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleSignUp}
                      className="bg-nutricare-green hover:bg-nutricare-green-dark text-white px-3 py-1 rounded text-xs sm:text-sm transition-colors duration-300"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md sm:max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">User Profile</h2>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
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
    </>
  );
};

export default TopBar;