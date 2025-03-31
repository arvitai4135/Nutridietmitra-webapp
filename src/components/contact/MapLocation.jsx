import React, { useState } from "react";

const NutricareLocationSection = () => {
  const [isDirectionsPanelOpen, setIsDirectionsPanelOpen] = useState(false);

  // Location details
  const locationDetails = {
    lat: 27.1751,
    lng: 78.0421,
    placeName: "Nutricare Wellness",
    address: "Taj Ganj, Agra, Uttar Pradesh",
  };

  const handleDirectionsClick = () => {
    setIsDirectionsPanelOpen(!isDirectionsPanelOpen);
  };

  const handleNavigateClick = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${locationDetails.lat},${locationDetails.lng}`;
    window.open(mapsUrl, "_blank");
  };

  // Static map URL (optional API key; remove key param if not using)
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${locationDetails.lat},${locationDetails.lng}&zoom=14&size=800x600&markers=color:red%7C${locationDetails.lat},${locationDetails.lng}`;
  // Optional: Add &key=YOUR_API_KEY if you have one

  return (
    <section className="relative w-full h-[400px] md:h-[600px] bg-nutricare-bg-light overflow-hidden">
      {/* Static Map Background */}
      <div className="absolute inset-0">
        <img
          src={staticMapUrl}
          alt="Nutricare Wellness Location"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to a base64-encoded placeholder if local image is missing
            e.target.src =
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAMAAAD0iTPIAAAAA1BMVEUAAACnej3aAAAASElEQVR4nO3BMQEAAADCoPVPbQ0voAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg4ADQMgAAAABJRU5ErkJggg==";
            // This is a gray 800x600 placeholder; replace with your own base64 image if desired
          }}
        />
      </div>

      {/* Info Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md px-4 md:px-0">
        <div className="bg-white p-6 rounded-xl shadow-xl border border-nutricare-primary-light">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-nutricare-primary-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-nutricare-primary-dark mb-3 text-center">
            {locationDetails.placeName}
          </h3>
          <p className="text-nutricare-text-gray mb-4 text-center text-sm">
            {locationDetails.address}
          </p>

          {/* Directions Panel */}
          {isDirectionsPanelOpen && (
            <div className="mb-4 bg-nutricare-bg-light p-4 rounded-lg border border-nutricare-green">
              <p className="text-sm text-nutricare-text-dark mb-2">
                Enter your starting point:
              </p>
              <input
                type="text"
                placeholder="Your location"
                className="w-full p-2 border border-nutricare-text-gray rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light"
              />
              <button
                onClick={handleNavigateClick}
                className="w-full bg-nutricare-primary-dark text-white py-2 px-4 rounded-md hover:bg-nutricare-primary-light transition duration-300"
              >
                Show Route
              </button>
            </div>
          )}

          <button
            onClick={handleDirectionsClick}
            className="w-full bg-nutricare-green text-white py-2 px-6 rounded-md hover:bg-nutricare-green-dark transition duration-300 flex items-center justify-center gap-2"
          >
            <span>{isDirectionsPanelOpen ? "Close" : "Get Directions"}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="absolute bottom-4 left-0 right-0 px-4 md:hidden z-10">
        <div className="bg-white bg-opacity-95 p-3 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h4 className="text-nutricare-primary-dark font-semibold text-sm">
              {locationDetails.placeName}
            </h4>
            <p className="text-xs text-nutricare-text-gray">
              {locationDetails.address}
            </p>
          </div>
          <button
            onClick={handleNavigateClick}
            className="bg-nutricare-green text-white text-sm py-1 px-3 rounded-md hover:bg-nutricare-green-dark transition duration-300"
          >
            Navigate
          </button>
        </div>
      </div>
    </section>
  );
};

export default NutricareLocationSection;