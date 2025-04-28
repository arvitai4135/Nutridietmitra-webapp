import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-sans text-gray-800 font-bold mb-4">
          Thank You for Your Subscription!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your payment has been successfully completed. Your subscription is now active.
        </p>
        <div className="border-t border-gray-200 pt-6">
          <Link 
            to="/" 
            className="text-green-600 hover:text-green-800 font-medium text-lg flex items-center justify-center transition duration-300"
          >
            Go to main website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;