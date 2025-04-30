import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HealthCoach from '/assets/Images/HealthCoach.jpg';

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
        'The weight loss plan from Nutridietmitra transformed my life! I lost 12 kg in 4 months with delicious, kitchen-based meals that fit my lifestyle. Dt. Tanu’s guidance made it sustainable and enjoyable.',
      name: 'Priya Sharma',
      location: 'Jaipur, India',
      image: '/assets/Images/client1.jpg',
    },
    {
      id: 2,
      quote:
        'Managing my PCOS was a struggle until I joined Nutridietmitra. The personalized diet plan balanced my hormones and improved my energy levels. I feel healthier and more confident now!',
      name: 'Aisha Khan',
      location: 'Dubai, UAE',
      image: '/assets/Images/client2.jpg',
    },
    {
      id: 3,
      quote:
        'Nutridietmitra’s diabetes diet helped me control my blood sugar naturally. The tailored meals were easy to follow, and Dt. Tanu’s support kept me motivated. My health has improved significantly!',
      name: 'David Patel',
      location: 'London, UK',
      image: '/assets/Images/client3.jpg',
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
              <img src={HealthCoach} alt="Nutridietmitra Nutrition Success" className="w-full h-auto rounded" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-nutricare-primary-light h-24 w-24 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white font-bold text-2xl">5.0★</span>
            </div>
          </div>

          {/* Right column with testimonials */}
          <div className="w-full md:w-7/12 lg:w-7/12 md:pl-12">
            <div className="mb-8">
              <h5 className="text-nutricare-primary-dark font-medium text-lg mb-2">What Our Clients Say</h5>
              <h2 className="text-nutricare-primary-dark text-4xl md:text-5xl font-bold">
                Transforming Lives Through Nutrition
              </h2>
              <p className="text-nutricare-text-gray text-base mt-4">
                With over 5000 clients worldwide, Nutridietmitra’s personalized, kitchen-based nutrition plans have empowered countless individuals to achieve their health goals.
              </p>
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
                {/* <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-nutricare-green flex-shrink-0">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={`${testimonials[activeIndex].name}, Nutridietmitra Client`}
                    className="w-full h-full object-cover"
                  />
                </div> */}
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
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-nutricare-primary-dark text-nutricare-bg-light h-12 w-12 rounded-full flex items-center justify-center shadow-md hover:bg-nutricare-bg-light hover:text-nutricare-primary-dark transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
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