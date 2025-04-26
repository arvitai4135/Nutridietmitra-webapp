import React, { useState, useEffect } from 'react';
import HealthCoach from '/assets/Images/HealthCoach.jpg'; // Corrected path

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      quote:
        'Following a sports nutrition plan for the past 4 months has completely transformed my performance. Before, I struggled with low energy and early fatigue. Now, I feel consistently energized through my workouts and recovery is much faster!',
      name: 'Michael Reynolds',
      location: 'Toronto, Canada',
      image: '/assets/Images/img1.jpg',
    },
    {
      id: 2,
      quote:
        'As a marathon runner, proper nutrition is everything. The customized plan I received addressed all my specific needs and has helped me shave 15 minutes off my personal best. The guidance on timing my nutrients has been game-changing.',
      name: 'Sarah Chen',
      location: 'Seattle, USA',
      image: '/assets/Images/img1.jpg',
    },
    {
      id: 3,
      quote:
        "After years of trying different approaches, I finally found a nutrition plan that works with my body instead of against it. My endurance has doubled and I'm setting new personal records every month. The difference is remarkable!",
      name: 'James Wilson',
      location: 'Melbourne, Australia',
      image: '/assets/Images/img1.jpg',
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative bg-nutricare-green overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left column with image */}
          <div className="hidden md:block md:w-5/12 lg:w-5/12 relative">
            <div className="bg-nutricare-bg-light p-4 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img src={HealthCoach} alt="Healthy nutrition" className="w-full h-auto rounded" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-nutricare-primary-light h-24 w-24 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white font-bold text-2xl">4.9★</span>
            </div>
          </div>

          {/* Right column with testimonials */}
          <div className="w-full md:w-7/12 lg:w-7/12 md:pl-12">
            <div className="mb-8">
              <h5 className="text-nutricare-primary-dark font-medium text-lg mb-2">Client Success Stories</h5>
              <h2 className="text-nutricare-primary-dark text-4xl md:text-5xl font-bold">
                Transforming Lives Through Nutrition
              </h2>
            </div>

            {/* Testimonial slider */}
            <div className="relative bg-nutricare-bg-light rounded-lg p-6 md:p-8 shadow-xl border-t-4 border-nutricare-primary-dark">
              {/* Quote marks */}
              <div className="absolute -top-5 left-8 text-nutricare-primary-light text-8xl">"</div>

              {/* Testimonial content */}
              <div className="mt-4 mb-6">
                <p className="text-nutricare-text-dark text-lg md:text-xl italic relative z-10 leading-relaxed">
                  {testimonials[activeIndex].quote}
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-nutricare-green flex-shrink-0">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h6 className="font-bold text-xl text-nutricare-primary-dark">
                    {testimonials[activeIndex].name}
                  </h6>
                  <p className="text-nutricare-text-gray">{testimonials[activeIndex].location}</p>
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-nutricare-primary-dark w-8'
                        : 'bg-nutricare-text-gray bg-opacity-50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={prevTestimonial}
                className="bg-nutricare-bg-light text-nutricare-primary-dark h-12 w-12 rounded-full flex items-center justify-center shadow-md hover:bg-nutricare-primary-dark hover:text-nutricare-bg-light transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-nutricare-primary-dark text-nutricare-bg-light h-12 w-12 rounded-full flex items-center justify-center shadow-md hover:bg-nutricare-bg-light hover:text-nutricare-primary-dark transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute -top-20 -right-20 bg-nutricare-primary-light bg-opacity-20 h-40 w-40 rounded-full"></div>
      <div className="hidden md:block absolute -bottom-10 left-1/4 bg-nutricare-green-dark bg-opacity-20 h-20 w-20 rounded-full"></div>
    </div>
  );
};

export default Testimonial;