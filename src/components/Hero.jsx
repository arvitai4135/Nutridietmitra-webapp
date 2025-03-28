import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Apple, Salad } from 'lucide-react';
import img1 from '../assets/Images/img1.jpg';
import img2 from '../assets/Images/img2.jpg';
import img3 from '../assets/Images/img3.jpg';

const heroSlides = [
  {
    title: "Nourishing Your Wellness Journey",
    subtitle: "Personalized Nutrition",
    description: "Discover personalized nutrition solutions that transform your health. Our expert team crafts tailored plans to help you achieve your wellness goals.",
    backgroundImage: img1,
    accentColor: "nutricare-primary-light", // #D93BB1
    textPosition: "left",
    highlightPhrase: "transform your health"
  },
  {
    title: "Eat Smart, Live Bright",
    subtitle: "Holistic Health Approach",
    description: "Unlock your potential with our comprehensive nutrition strategies. We focus on sustainable lifestyle changes that empower your health journey.",
    backgroundImage: img2,
    accentColor: "nutricare-green-dark", // #8CA417
    textPosition: "right",
    highlightPhrase: "empower your health"
  },
  {
    title: "Your Path to Vibrant Health",
    subtitle: "Expert Nutritional Guidance",
    description: "Tailored meal plans, expert consultations, and cutting-edge nutritional science to help you thrive and feel your best.",
    backgroundImage: img3,
    accentColor: "nutricare-primary-dark", // #9E0B7F
    textPosition: "center",
    highlightPhrase: "thrive and feel"
  }
];

const features = [
  {
    icon: <Heart className="text-nutricare-green" size={48} />,
    title: "Top Rated",
    description: "With so many choices of the food-diet advisory out there, we’re at top-rated cause of homely services.",
  },
  {
    icon: <Apple className="text-nutricare-green" size={48} />,
    title: "Best Quality",
    description: "Don’t lose, workout which relevant our human body! We provides best quality services for your body.",
  },
  {
    icon: <Salad className="text-nutricare-green" size={48} />,
    title: "Eat Fresh",
    description: "Quality does matter! when we feel good we’re happier, when we are happier and we’re more productive.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  return (
    <>
      {/* Hero Slider Section */}
      <div 
        className="relative min-h-[60vh] md:min-h-[100vh] w-full flex flex-col justify-center items-center font-sans"
      >
        {/* Slider Content */}
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out flex flex-col justify-center items-center ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: 'cover', // Changed to cover for responsive images
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'nutricare-bg-light'
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40 md:bg-opacity-30" />

            {/* Text Content */}
            <div 
              className={`relative z-10 max-w-[90%] sm:max-w-2xl md:max-w-3xl px-4 w-full md:w-auto ${
                slide.textPosition === 'left' 
                  ? 'text-left md:ml-16 md:mr-auto' 
                  : slide.textPosition === 'right' 
                  ? 'text-left md:text-right md:mr-16 md:ml-auto' 
                  : 'text-center mx-auto'
              }`}
            >
              <h4 
                className={`text-xs md:text-sm uppercase mb-2 md:mb-4 tracking-wider text-nutricare-green relative ${
                  slide.textPosition === 'left' 
                    ? 'inline-block' 
                    : slide.textPosition === 'right' 
                    ? 'inline-block md:ml-auto' 
                    : 'inline-block'
                }`}
              >
                <span className="relative z-10">{slide.subtitle}</span>
                <span 
                  className={`absolute bottom-0 w-8 md:w-12 h-0.5 md:h-1 bg-nutricare-green ${
                    slide.textPosition === 'right' ? 'md:right-0' : 'left-0'
                  }`}
                />
              </h4>
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white"
              >
                {slide.title.split(' ').map((word, i, arr) => (
                  <React.Fragment key={i}>
                    {i === 0 ? (
                      <span className="text-nutricare-primary-light">{word}</span>
                    ) : i === arr.length - 1 ? (
                      <span style={{ color: slide.accentColor }}>{word}</span>
                    ) : (
                      word
                    )}
                    {i < arr.length - 1 && ' '}
                  </React.Fragment>
                ))}
              </h1>
              <p 
                className={`text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-white ${
                  slide.textPosition === 'left' 
                    ? 'max-w-md md:max-w-xl' 
                    : slide.textPosition === 'right' 
                    ? 'max-w-md md:max-w-xl md:ml-auto' 
                    : 'max-w-md md:max-w-xl mx-auto'
                }`}
              >
                {slide.description.split(slide.highlightPhrase).map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-nutricare-green-dark font-semibold">{slide.highlightPhrase}</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
              <div 
                className={`flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-3 sm:space-y-0 ${
                  slide.textPosition === 'left' 
                    ? 'justify-start' 
                    : slide.textPosition === 'right' 
                    ? 'justify-start md:justify-end' 
                    : 'justify-center'
                }`}
              >
                <button 
                  className="px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center transform transition-all hover:scale-105 bg-nutricare-text-dark text-white hover:bg-nutricare-primary-dark"
                >
                  Read More
                </button>
                <button 
                  className="px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center transform transition-all hover:scale-105 bg-nutricare-green text-white hover:bg-nutricare-green-dark"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-nutricare-primary-dark text-white p-1 md:p-2 rounded-full shadow-lg"
        >
          <ChevronLeft size={20} md:size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-nutricare-primary-dark text-white p-1 md:p-2 rounded-full shadow-lg"
        >
          <ChevronRight size={20} md:size={24} />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-nutricare-primary-dark w-4 md:w-6' 
                  : 'bg-nutricare-primary-light bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-10 md:-mt-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:flex md:flex-row gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex-1 bg-white shadow-md rounded-lg p-6 text-center flex flex-col items-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <h5 className="text-lg md:text-xl font-bold text-nutricare-text-dark mb-3">
                  {feature.title}
                </h5>
                <p className="text-nutricare-text-gray text-sm md:text-base mb-4">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="text-nutricare-text-dark text-sm font-semibold underline hover:text-nutricare-primary-dark transition-colors"
                >
                  View More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
