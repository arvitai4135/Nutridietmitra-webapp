import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../admin/context/AuthContext"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

const TopBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Fixed typo: AuthseerouteContext -> AuthContext

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
    navigate("/change-password"); // Navigates to /change-password
  };

  return (
    <div className="hidden sm:block w-full py-5 bg-nutricare-bg-light text-nutricare-text-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 font-sans text-base" style={{ fontFamily: "Arial, sans-serif" }}>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2 text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300"></i>
              <span>OM RESIDENCY 93/B2 Mauji Colony, Malviya Nagar, Jaipur , Rajasthan</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock mr-2 text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300"></i>
              <span className="text-nutricare-text-gray">Mon-Fri: 8am to 5pm</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center">
              <i className="fas fa-envelope mr-2 text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300"></i>
              <a
                href="mailto:Nutridietmitra@gmail.com"
                className="text-nutricare-primary-dark hover:text-nutricare-primary-light transition-colors duration-300"
              >
                Nutridietmitra@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-nutricare-primary-dark font-medium">
                      Welcome, {user.email.split('@')[0]}!
                    </span>
                    <i
                      className="fas fa-user text-nutricare-primary-dark hover:text-nutricare-green transition-colors duration-300 cursor-pointer"
                      onClick={handleProfileClick}
                      title="Change Password"
                    ></i>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-nutricare-primary-dark hover:bg-nutricare-primary-light text-white px-4 py-1 rounded transition-colors duration-300 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSignIn}
                    className="bg-nutricare-primary-dark hover:bg-nutricare-primary-light text-white px-4 py-1 rounded transition-colors duration-300 cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="bg-nutricare-green hover:bg-nutricare-green-dark text-white px-4 py-1 rounded transition-colors duration-300 cursor-pointer"
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
  );
};

export default TopBar;