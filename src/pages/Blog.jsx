import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, User } from 'lucide-react';
import HealthyFood from '/assets/Images/HealthyFood.jpg'; // Corrected path
import HealthyGlutenFree from '/assets/Images/HealthyGlutenFree.jpg'; // Corrected path
import HealthLifestyle from '/assets/Images/HealthLifestyle.jpg'; // Corrected path
import BloodSugar from '/assets/Images/BloodSugar.jpg'; // Corrected path
import BrainBoost from '/assets/Images/BrainBoost.jpg'; // Corrected path
import SustainableEating from '/assets/Images/SustainableEating.jpg'; // Corrected path

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderContainerRef = useRef(null);

  const blogPosts = [
    {
      id: 1,
      title: "Nutrition Essentials: How Much Do You Really Need Each Day?",
      image: HealthyFood,
      date: { day: "14", month: "MAR" },
      comments: 3,
      author: "Alex",
      excerpt: "Discover the optimal daily nutritional intake based on your lifestyle and fitness goals."
    },
    {
      id: 2,
      title: "7 Simple & Healthy Gluten-Free Recipes for Energy",
      image: HealthyGlutenFree,
      date: { day: "05", month: "JUN" },
      comments: 6,
      author: "Maria",
      excerpt: "Delicious gluten-free alternatives that boost your energy levels throughout the day."
    },
    {
      id: 3,
      title: "Essential Tips For Staying Healthy While Traveling",
      image: HealthLifestyle,
      date: { day: "11", month: "NOV" },
      comments: 3,
      author: "Nuclies",
      excerpt: "Maintain your health routines even when you're away from home with these simple strategies."
    },
    {
      id: 4,
      title: "5 Natural Ways to Maintain Healthy Blood Sugar Levels",
      image: BloodSugar,
      date: { day: "20", month: "AUG" },
      comments: 2,
      author: "Vorbo",
      excerpt: "Stabilize your blood sugar naturally with diet, exercise, and lifestyle modifications."
    },
    {
      id: 5,
      title: "The Mind-Diet Connection: Foods That Boost Brain Health",
      image: BrainBoost,
      date: { day: "03", month: "FEB" },
      comments: 8,
      author: "Julia",
      excerpt: "Explore the powerful connection between nutrition and cognitive function."
    },
    {
      id: 6,
      title: "Sustainable Eating: Good For You And The Planet",
      image: SustainableEating,
      date: { day: "17", month: "APR" },
      comments: 4,
      author: "Marcus",
      excerpt: "How making environmentally conscious food choices benefits both your health and the earth."
    }
  ];

  // Add duplicate posts for continuous scrolling effect
  const extendedPosts = [...blogPosts, ...blogPosts];

  useEffect(() => {
    setIsVisible(true);

    const updateDimensions = () => {
      const width = window.innerWidth;
      let slides = 3;

      if (width < 640) {
        slides = 1;
      } else if (width < 1024) {
        slides = 2;
      }

      setSlidesToShow(slides);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const nextSlide = () => {
    if (currentIndex >= blogPosts.length - 1) {
      // Fast-forward to the beginning (using duplicate set)
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      // Fast-backward to the end (using duplicate set)
      setCurrentIndex(blogPosts.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index * slidesToShow);
  };

  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <div className={`container mx-auto px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-block relative mb-2">
            <span className="text-[#ADD01C] font-medium relative z-10">Our Blogs</span>
            <div className="absolute h-1 w-full bg-[#ADD01C] bg-opacity-30 bottom-0 left-0"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4 relative">
            Our Latest <span className="text-[#9E0B7F]">Insights</span>
          </h2>
          <p className="text-[#718096] max-w-2xl mx-auto text-base md:text-lg">
            Top stories featured on Health & Medicine, Mind & Brain, and Living Well sections.
            Your source for the latest nutrition research and wellness advice.
          </p>
        </div>

        {/* Blog Carousel */}
        <div className="relative">
          {/* Navigation Controls */}
          <div className="flex justify-end mb-6 space-x-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FCF0F8] text-[#9E0B7F] transition-all duration-300 hover:bg-[#9E0B7F] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#9E0B7F] focus:ring-opacity-50"
              aria-label="Previous blog post"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#9E0B7F] text-white transition-all duration-300 hover:bg-[#D93BB1] focus:outline-none focus:ring-2 focus:ring-[#9E0B7F] focus:ring-opacity-50"
              aria-label="Next blog post"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Blog Posts Slider */}
          <div
            ref={sliderContainerRef}
            className="relative overflow-hidden pb-8"
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {extendedPosts.map((post, index) => (
                <div
                  key={`${post.id}-${index}`}
                  className="px-4 relative"
                  style={{
                    flex: `0 0 ${100 / slidesToShow}%`,
                  }}
                >
                  {/* Card Container with Fixed Height and Padding for Scale Effect */}
                  <div className="group h-full relative py-2 px-2">
                    {/* Actual Card Content */}
                    <div
                      className="h-full rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 transition-all duration-300 group-hover:shadow-xl relative z-10"
                      onMouseEnter={() => setActiveCard(index)}
                      onMouseLeave={() => setActiveCard(null)}
                    >
                      {/* Blog Image with Date */}
                      <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute right-4 bottom-4 bg-[#ADD01C] text-white px-3 py-2 rounded-lg text-center shadow-md transition-transform duration-300 group-hover:scale-105">
                          <div className="text-xl font-bold leading-none">{post.date.day}</div>
                          <div className="text-xs font-medium">{post.date.month}</div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-[#333333] mb-3 line-clamp-2 h-14 md:h-16">
                          <a
                            href="#"
                            className="hover:text-[#9E0B7F] transition-colors duration-300"
                          >
                            {post.title}
                          </a>
                        </h3>
                        <p className="text-[#718096] mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center text-[#718096] text-sm">
                            <User size={14} className="text-[#D93BB1] mr-1" />
                            <span className="font-medium">{post.author}</span>
                          </div>
                          <div className="flex items-center text-[#718096] text-sm">
                            <MessageSquare size={14} className="text-[#D93BB1] mr-1" />
                            <span>{post.comments} Comments</span>
                          </div>
                        </div>
                        <div className="mt-4 text-[#9E0B7F] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <a href="#" className="inline-flex items-center hover:underline">
                            Read more
                            <ChevronRight size={16} className="ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Highlight Border on Hover (separate from content to prevent overflow) */}
                    <div className="absolute inset-0 rounded-xl border-2 border-[#ADD01C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(blogPosts.length / slidesToShow) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / slidesToShow) % Math.ceil(blogPosts.length / slidesToShow) === index
                    ? 'w-8 bg-[#9E0B7F]'
                    : 'w-2 bg-[#D93BB1] bg-opacity-40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hidden md:block absolute -bottom-10 left-1/4 bg-[#D93BB1] bg-opacity-10 h-20 w-20 rounded-full"></div>
      <div className="hidden md:block absolute top-20 right-10 bg-[#ADD01C] bg-opacity-10 h-16 w-16 rounded-full"></div>
      <div className="hidden lg:block absolute top-1/3 left-10 bg-[#FCF0F8] h-32 w-32 rounded-full"></div>
    </section>
  );
};

export default Blog;