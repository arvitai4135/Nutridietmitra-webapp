import React from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-nutricare-bg-light">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-sans text-nutricare-primary-dark font-bold mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-lg text-nutricare-text-gray mb-6">
          Your payment has been successfully completed.
        </p>
        <button
          onClick={handleRedirect}
          className="px-6 py-3 bg-nutricare-green text-white font-sans text-lg rounded-md hover:bg-nutricare-green-dark transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;