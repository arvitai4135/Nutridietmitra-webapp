import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../admin/context/AuthContext";
import api from "../admin/services/api";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Service to fetch user profile
const getUserProfile = async () => {
  try {
    const response = await api.get("/users/info", {
      params: { t: new Date().getTime() },
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch user info");
    }
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user profile");
  }
};

// Service to update user profile
const updateUserProfile = async (userData) => {
  try {
    const response = await api.put("/api/users/update-user-info", {
      full_name: userData.full_name,
      phone_number: userData.phone_number,
      profile_path: userData.profile_path || "profile_pictures/default.png",
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update user info");
    }
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404) {
        throw new Error("User not found");
      } else if (status === 422) {
        const errorDetails = data.detail?.map((err) => err.msg).join(", ") || "Invalid input data";
        throw new Error(errorDetails);
      }
      throw new Error(data.message || "Failed to update user profile");
    }
    throw new Error("Network error. Please check your internet connection.");
  }
};

// Utility function to format subscription plan name and food plan name
const formatPlanName = (planName) => {
  if (!planName) return "Not subscribed";
  // Replace underscores with spaces
  return planName.replace(/_/g, " ");
};

const TopBar = () => {
  const navigate = useNavigate();
  const { user, logout, setUser } = useContext(AuthContext);

  // Debug AuthContext values
  useEffect(() => {
    console.log("AuthContext values:", { user, setUser, logout });
    if (!setUser) {
      console.error("setUser is undefined in AuthContext");
    } else if (typeof setUser !== "function") {
      console.error("setUser is not a function:", setUser);
    }
  }, [user, setUser, logout]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user profile when modal opens
  useEffect(() => {
    if (isModalOpen && user && !formData.email) {
      console.log("Fetching user profile for modal");
      const fetchProfile = async () => {
        try {
          setLoading(true);
          const profile = await getUserProfile();
          setFormData({
            full_name: profile.full_name || "",
            phone_number: profile.phone_number || "",
            email: profile.email || user.email || "",
          });
          if (
            !user.email ||
            !user.full_name ||
            !user.phone_number ||
            !user.meal_plan ||
            !user.subscription_plan
          ) {
            console.log("Updating user state with fetched profile");
            const newUser = {
              ...user,
              full_name: profile.full_name,
              phone_number: profile.phone_number,
              email: profile.email,
              profile_path: profile.profile_path,
              role: profile.role,
              status: profile.status,
              meal_plan: profile.meal_plan,
              subscription_plan: profile.subscription_plan,
            };
            if (typeof setUser === "function") {
              setUser(newUser);
              sessionStorage.setItem("user", JSON.stringify(newUser));
            } else {
              setError("Authentication error: Unable to update user data. Please log in again.");
            }
          }
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [isModalOpen, user, formData.email]);

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
        profile_path: user?.profile_path || "profile_pictures/default.png",
      });

      if (typeof setUser === "function") {
        const newUser = {
          ...user,
          full_name: updatedProfile.full_name,
          phone_number: updatedProfile.phone_number,
          profile_path: updatedProfile.profile_path,
        };
        setUser(newUser);
        sessionStorage.setItem("user", JSON.stringify(newUser));
        setFormData({
          ...formData,
          full_name: updatedProfile.full_name,
          phone_number: updatedProfile.phone_number,
        });
        setIsModalOpen(false);
        alert("Profile updated successfully!");
      } else {
        setError("Authentication error: Unable to save changes. Please log in again.");
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    setIsModalOpen(false);
    navigate("/change-password");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleDashboardClick = () => {
    try {
      console.log("Dashboard button clicked, user:", user);
      setIsModalOpen(false);
      navigate("/dashboard");
      console.log("Navigation to /dashboard attempted");
    } catch (err) {
      console.error("Navigation error:", err);
      setError("Failed to navigate to dashboard. Please try again.");
    }
  };

  return (
    <>
      {/* TopBar - Only visible on desktop */}
      <div className="hidden md:block w-full bg-white shadow-sm py-3">
        <div className="container mx-auto px-8 sm:px-9 lg:px-11">
          <div className="flex items-center justify-between">
            {/* Logo - Clickable */}
            <div 
              className="flex-shrink-0 cursor-pointer" 
              onClick={handleLogoClick}
              title="Go to Home"
            >
              <img 
                src="/Logo1.png" 
                alt="Nutridietmitra" 
                className="h-12" 
              />
            </div>

            {/* Operating Hours - Centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
              <div className="relative group">
                <i 
                  className="far fa-clock text-nutricare-primary-dark hover:text-nutricare-primary-light transition-colors duration-300 cursor-pointer mr-2"
                  title="Operating Hours"
                ></i>
                <span className="text-gray-600 text-sm">Mon-Fri: 8am-5pm</span>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-md rounded-md p-2 text-xs text-gray-600 whitespace-nowrap z-20">
                  Mon-Fri: 8am-5pm
                </div>
              </div>
            </div>

            {/* Contact Icons and Auth Buttons */}
            <div className="flex items-center gap-4">
              {/* Contact Icons with Hover Effect */}
              <div className="flex items-center gap-3">
                {/* Location Icon */}
                <div className="relative group">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Plot+93%2C+Mauji+Colony+Rd%2C+Mauji+Colony%2C+Moji+Nagar%2C+Malviya+Nagar%2C+Jaipur%2C+Rajasthan+302017"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nutricare-primary-dark hover:text-nutricare-primary-light transition-colors duration-300"
                    aria-label="View on Google Maps"
                  >
                    <i 
                      className="fas fa-map-marker-alt"
                      title="View Location on Map"
                    ></i>
                  </a>
                  <div className="absolute top-10 right-0 hidden group-hover:block bg-white shadow-md rounded-md p-2 text-xs text-gray-600 whitespace-nowrap z-20">
                    Plot 93, Mauji Colony Rd, Mauji Colony, Moji Nagar, Malviya Nagar, Jaipur, Rajasthan 302017
                  </div>
                </div>

                {/* Email Icon */}
                <div className="relative group">
                  <a 
                    href="mailto:Nutridietmitra@gmail.com" 
                    className="text-nutricare-primary-dark hover:text-nutricare-primary-light transition-colors duration-300"
                  >
                    <i 
                      className="far fa-envelope"
                      title="Email Us"
                    ></i>
                  </a>
                  <div className="absolute top-10 right-0 hidden group-hover:block bg-white shadow-md rounded-md p-2 text-xs text-gray-600 whitespace-nowrap z-20">
                    Nutridietmitra@gmail.com
                  </div>
                </div>

                {/* Phone Icon */}
                <div className="relative group">
                  <a 
                    href="tel:+123456789" 
                    className="text-nutricare-primary-dark hover:text-nutricare-primary-light transition-colors duration-300"
                  >
                    <i 
                      className="fas fa-phone-alt"
                      title="Call Us"
                    ></i>
                  </a>
                  <div className="absolute top-10 right-0 hidden group-hover:block bg-white shadow-md rounded-md p-2 text-xs text-gray-600 whitespace-nowrap z-20">
                    +91-7568153534
                  </div>
                </div>

                {/* Instagram Icon */}
                <div className="relative group">
                  <a 
                    href="https://www.instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nutricare-primary-dark hover:text-pink-500 transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <div className="absolute top-10 right-0 hidden group-hover:block bg-white shadow-md rounded-md p-2 text-xs text-gray-600 whitespace-nowrap z-20">
                    Follow us on Instagram
                  </div>
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2 lg:gap-4">
                {user ? (
                  <>
                    <div className="flex items-center">
                      <span className="hidden md:inline text-nutricare-primary-dark font-medium text-xs lg:text-sm">
                        Welcome, {user.full_name || (user.email ? user.email.split("@")[0] : "User")}!
                      </span>
                      <i
                        className="fas fa-user text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300 cursor-pointer ml-2"
                        onClick={handleProfileClick}
                        title="Profile"
                      ></i>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-nutricare-primary-dark hover:bg-nutricare-primary-light text-white px-2 py-1 lg:px-3 lg:py-2 rounded-md text-xs lg:text-sm font-medium transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSignIn}
                      className="bg-nutricare-primary-dark hover:bg-nutricare-primary-light text-white px-2 py-1 lg:px-3 lg:py-2 rounded-md text-xs lg:text-sm font-medium transition-colors duration-300"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleSignUp}
                      className="bg-nutricare-green hover:bg-nutricare-green-dark text-white px-2 py-1 lg:px-3 lg:py-2 rounded-md text-xs lg:text-sm font-medium transition-colors duration-300"
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

      {/* Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md sm:max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">User Profile</h2>
              <div className="flex items-center gap-2">
                {user?.role === "admin" && (
                  <button
                    onClick={handleDashboardClick}
                    className="bg-nutricare-green hover:bg-nutricare-green-dark text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                    title="Go to Dashboard"
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={handleModalClose}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {loading && <p className="text-gray-500 text-sm mb-4">Loading...</p>}
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email (Read-only)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-sm sm:text-base px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nutricare-green focus:ring-nutricare-green text-sm sm:text-base px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                  pattern="^\d{10}$"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nutricare-green focus:ring-nutricare-green text-sm sm:text-base px-3 py-2"
                />
                <small className="text-gray-500">Must be 10 digits</small>
              </div>
              <div className="mb-4">
                <label htmlFor="subscription_plan" className="block text-sm font-medium text-gray-700">
                  Subscription Plan (Read-only)
                </label>
                <input
                  type="text"
                  id="subscription_plan"
                  value={formatPlanName(user?.subscription_plan?.plan_name)}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-sm sm:text-base px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="food_plan" className="block text-sm font-medium text-gray-700">
                  Food Plan (Read-only)
                </label>
                <input
                  type="text"
                  id="food_plan"
                  value={formatPlanName(user?.meal_plan?.plan_name) || "No food plan"}
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