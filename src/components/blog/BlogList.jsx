import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, User } from 'lucide-react';
import WeightLossDiet from '/assets/Images/WeightLoss.jpg';
import PCOSNutrition from '/assets/Images/PCOSNutrition.jpg';
import DiabetesDiet from '/assets/Images/DiabetesManagement.jpg';
import ChildNutrition from '/assets/Images/ChildNutrition.jpg';
import ThyroidDiet from '/assets/Images/ThyroidManagement.jpg';
import SportsNutrition from '/assets/Images/SportsNutrition.jpg';

const BlogList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderContainerRef = useRef(null);

  const blogPosts = [
    {
      id: 1,
      title: "Effective Weight Loss: Sustainable Nutrition Strategies",
      image: WeightLossDiet,
      date: { day: "10", month: "JAN" },
      comments: 5,
      author: "Dt. Tanu Bhargava",
      excerpt: "Learn how to achieve sustainable weight loss with kitchen-based, no-supplement diet plans tailored to your lifestyle."
    },
    {
      id: 2,
      title: "Managing PCOS with Nutrition and Lifestyle",
      image: PCOSNutrition,
      date: { day: "22", month: "APR" },
      comments: 7,
      author: "Dt. Tanu Bhargava",
      excerpt: "Discover dietary strategies to balance hormones and reduce PCOS symptoms naturally."
    },
    {
      id: 3,
      title: "Controlling Diabetes with a Balanced Diet",
      image: DiabetesDiet,
      date: { day: "15", month: "JUL" },
      comments: 4,
      author: "Dt. Tanu Bhargava",
      excerpt: "Explore kitchen-based meal plans to stabilize blood sugar levels and improve energy."
    },
    {
      id: 4,
      title: "Building Healthy Eating Habits for Kids",
      image: ChildNutrition,
      date: { day: "08", month: "SEP" },
      comments: 6,
      author: "Dt. Tanu Bhargava",
      excerpt: "Fun and nutritious meal ideas to support your child’s growth and immunity."
    },
    {
      id: 5,
      title: "Optimizing Thyroid Health Through Diet",
      image: ThyroidDiet,
      date: { day: "12", month: "NOV" },
      comments: 3,
      author: "Dt. Tanu Bhargava",
      excerpt: "Support thyroid function with nutrient-rich, kitchen-based diets to boost metabolism."
    },
    {
      id: 6,
      title: "Fueling Performance with Sports Nutrition",
      image: SportsNutrition,
      date: { day: "25", month: "FEB" },
      comments: 5,
      author: "Dt. Tanu Bhargava",
      excerpt: "Enhance endurance and recovery with tailored nutrition plans for athletes."
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
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
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
            <span className="text-[#ADD01C] font-medium relative z-10">Nutridietmitra Insights</span>
            <div className="absolute h-1 w-full bg-[#ADD01C] bg-opacity-30 bottom-0 left-0"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4 relative">
            Nutrition <span className="text-[#9E0B7F]">Wisdom</span>
          </h2>
          <p className="text-[#718096] max-w-2xl mx-auto text-base md:text-lg">
            Expert advice from Dt. Tanu Bhargava on personalized, science-backed nutrition to empower your health journey.
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

                    {/* Highlight Border on Hover */}
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
      {/* <div className="hidden lg:block absolute top-1/3 left-10 bg-[#FCF0F8] h-32 w-32 rounded-full"></div> */}
    </section>
  );
};

export default BlogList;