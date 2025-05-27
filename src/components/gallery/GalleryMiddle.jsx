import React, { useState } from 'react';

const PortfolioGallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [visibleItemsCount, setVisibleItemsCount] = useState(6); // Initially show 6 items

  // Portfolio item data
  const portfolioItems = [
    {
      id: 1,
      title: "Anupama",
      categories: ["Weight Management", "Diet"],
      image: "/assets/Images/gallery/Anupama.jpg",
    },
    {
      id: 2,
      title: "Ashu Alwani",
      categories: ["Hormonal Health", "Diet"],
      image: "/assets/Images/gallery/Ashu Alwani.jpg",
    },
    {
      id: 3,
      title: "Palak Bhatt",
      categories: ["Chronic Conditions", "Diet"],
      image: "/assets/Images/gallery/Palak Bhatt.jpg",
    },
    {
      id: 4,
      title: "Sangeeta Poonam",
      categories: ["Lifestyle Support", "Diet"],
      image: "/assets/Images/gallery/Sangeeta Poonam.jpg",
    },
    {
      id: 5,
      title: "Person5",
      categories: ["Lifestyle Support", "Diet"],
      image: "/assets/Images/gallery/Person5.jpg",
    },
    {
      id: 6,
      title: "Person6",
      categories: ["General Wellness", "Diet"],
      image: "/assets/Images/gallery/Person6.jpg",
    },
    {
      id: 7,
      title: "Vartika Dangayach",
      categories: ["Hormonal Health", "Diet"],
      image: "/assets/Images/gallery/Vartika Dangayach.jpg",
    },
    {
      id: 8,
      title: "Rishiraj",
      categories: ["General Wellness", "Food Delivery"],
      image: "/assets/Images/gallery/Rishiraj.jpg",
    },
    {
      id: 9,
      title: "Rajendra Daga",
      categories: ["General Wellness", "Food Delivery"],
      image: "/assets/Images/gallery/Rajendra Daga.jpg",
    },
    {
      id: 10,
      title: "Shweta Gupta",
      categories: ["General Wellness", "Food Delivery"],
      image: "/assets/Images/gallery/ShwetaGupta.JPG",
    },
    {
      id: 12,
      title: "Person7",
      categories: ["General Wellness", "Food Delivery"],
      image: "/assets/Images/gallery/Person7.JPG",
    },
  ];

  // Filter portfolio items based on active tab
  const filteredItems = activeTab === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.categories.includes(activeTab));

  // Handle Load More button click
  const handleLoadMore = () => {
    setVisibleItemsCount(prevCount => Math.min(prevCount + 3, filteredItems.length));
  };

  return (
    <div className="bg-nutricare-bg-light font-sans py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Portfolio Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nutricare-primary-dark mb-2">
            Nutridietmitra Transformations
          </h2>
          <div className="w-24 h-1 bg-nutricare-green mx-auto mb-4"></div>
          <p className="text-nutricare-text-gray max-w-2xl mx-auto">
            Discover our personalized, kitchen-based nutrition programs and food delivery services designed for your health goals.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.slice(0, visibleItemsCount).map((item) => (
            <div key={item.id} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-102 bg-gray-100"
                    onError={(e) => {
                      e.target.src = "/assets/Images/gallery/placeholder.jpg"; // Fallback image
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-nutricare-text-dark group-hover:text-nutricare-primary-dark transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-10 h-1 bg-nutricare-green mt-3 mb-2 group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleItemsCount < filteredItems.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-nutricare-primary-dark text-white rounded-full hover:bg-nutricare-primary-light transition-colors shadow-md hover:shadow-lg"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioGallery;