import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Apple, Salad, Award, Check, User, Stethoscope } from 'lucide-react';
import img1 from '/assets/Images/img1.jpg';
import img2 from '/assets/Images/img2.jpg';
import img3 from '/assets/Images/img3.jpg';
import Appointment from './form/Appointment';

const heroSlides = [
  {
    title: "Empowering Your Health Journey",
    subtitle: "Top Rated",
    description:
      "Transform your life with personalized, kitchen-based nutrition plans crafted by Dt. Tanu Bhargava. With over 17 years of expertise, we help you heal, energize, and thrive without supplements or crash diets.",
    backgroundImage: img1,
    accentColor: "nutricare-primary-light", // #D93BB1
    textPosition: "left",
    highlightPhrase: "heal, energize, and thrive",
  },
  {
    title: "Sustainable Nutrition for Life",
    subtitle: "Holistic Wellness Expertise",
    description:
      "Join over 5000+ clients who've achieved lasting health with our science-backed, heart-led approach. From PCOS to diabetes, our tailored plans fit your lifestyle and goals.",
    backgroundImage: img2,
    accentColor: "nutricare-green-dark", // #8CA417
    textPosition: "right",
    highlightPhrase: "lasting health",
  },
  {
    title: "Your Path to Vibrant Wellness",
    subtitle: "Guided by Dt. Tanu Bhargava",
    description:
      "Experience compassionate, evidence-based nutrition coaching. Our customized plans for weight management, thyroid, and more ensure you feel confident and healthy.",
    backgroundImage: img3,
    accentColor: "nutricare-primary-dark", // #9E0B7F
    textPosition: "center",
    highlightPhrase: "confident and healthy",
  },
];

const qualityCards = [
  {
    icon: <Award className="text-nutricare-green" size={24} />,
    title: "Top Rated",
    description: "With so many choices of the food-diet advisory out there, we're at top-rated (cause of lovely services)."
  },
  {
    icon: <Check className="text-nutricare-green" size={24} />,
    title: "Best Quality",
    description: "Don't look without what inherent our human body! We provides best quality services for your body."
  },
  {
    icon: <Apple className="text-nutricare-green" size={24} />,
    title: "Eat Fresh",
    description: "Quality does matter! when we feel good we're happier, when we are happier and we're more productive."
  }
];

const services = [
  {
    icon: <Apple className="text-nutricare-green" size={24} />,
    title: "Weight Management",
    description: "Sustainable plans for weight loss or gain, tailored to your lifestyle without fad diets."
  },
  {
    icon: <Heart className="text-nutricare-green" size={24} />,
    title: "PCOS & Thyroid",
    description: "Hormone-balancing diets to manage symptoms and improve overall health."
  },
  {
    icon: <Salad className="text-nutricare-green" size={24} />,
    title: "Diabetes Care",
    description: "Kitchen-based plans to control blood sugar and boost energy naturally."
  },
  {
    icon: <Stethoscope className="text-nutricare-green" size={24} />,
    title: "Glowing Skin",
    description: "Antioxidant-rich diets for radiant, clear skin from the inside out."
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

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

  const openAppointment = () => {
    setIsAppointmentOpen(true);
  };

  const closeAppointment = () => {
    setIsAppointmentOpen(false);
  };

  const handleContactUs = () => {
    window.location.href = "/contact";
  };

  return (
    <>
      {/* Hero Slider Section */}
      <div className="relative min-h-[60vh] md:min-h-[100vh] w-full flex flex-col justify-center items-center font-sans">
        {/* Slider Content */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out flex flex-col justify-center items-center ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'nutricare-bg-light',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60" />
            <div
              className={`relative z-10 max-w-[90%] sm:max-w-2xl md:max-w-3xl px-4 w-full md:w-auto bg-black bg-opacity-60 rounded-lg p-6 ${
                slide.textPosition === 'left'
                  ? 'text-left md:ml-16 md:mr-auto'
                  : slide.textPosition === 'right'
                  ? 'text-left md:text-right md:mr-16 md:ml-auto'
                  : 'text-center mx-auto'
              }`}
            >
              <h4
                className={`text-xs md:text-sm uppercase mb-2 md:mb-4 tracking-wider text-nutricare-green relative shadow-md ${
                  slide.textPosition === 'left'
                    ? 'inline-block'
                    : slide.textPosition === 'right'
                    ? 'inline-block md:ml-auto'
                    : 'inline-block'
                }`}
              >
                <span className="relative z-10">{slide.subtitle}</span>
                <span
                  className={`absolute bottom-0 w-8 md:w-12 h-0.5 md:h-1 bg-white ${
                    slide.textPosition === 'right' ? 'md:right-0' : 'left-0'
                  }`}
                />
              </h4>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white shadow-md">
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
                className={`text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-white shadow-md ${
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
                  onClick={openAppointment}
                  className="px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center transform transition-all hover:scale-105 bg-nutricare-text-dark text-white hover:bg-nutricare-primary-dark"
                >
                  Book Free Consultation
                </button>
                <button 
                  onClick={handleContactUs}
                  className="px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center transform transition-all hover:scale-105 bg-nutricare-green text-white hover:bg-nutricare-green-dark"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-nutricare-primary-dark text-white p-1 md:p-2 rounded-full shadow-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-nutricare-primary-dark text-white p-1 md:p-2 rounded-full shadow-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Quality Cards Section */}
      <section className="relative z-10 -mt-16 md:-mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qualityCards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col"
              >
                <div className="flex items-start mb-3">
                  <div className="mr-2 p-2 rounded-full bg-green-50">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-nutricare-text-dark mt-2">{card.title}</h3>
                </div>
                <p className="text-nutricare-text-gray text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-nutricare-bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-nutricare-text-dark mb-4">
                Meet Dt. Tanu Bhargava
              </h2>
              <p className="text-nutricare-text-gray text-base md:text-lg mb-6">
                With over 17 years of experience, Dt. Tanu Bhargava has empowered 5,000+ clients worldwide with personalized nutrition. From weight management to PCOS and diabetes, her science-backed, compassionate approach ensures lasting results. A celebrated dietitian, she’s been honored with awards like the Women Empowerment Award (2020) and Healthcare Achievement Award (2022).
              </p>
              <div className="flex items-center gap-4">
                <User className="text-nutricare-green" size={24} />
                <p className="text-nutricare-text-dark font-semibold">
                  Trusted by celebrities like Milkha Singh and Preeti Sharma
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold text-nutricare-text-dark mb-4">Our Philosophy</h3>
                <p className="text-nutricare-text-gray text-sm md:text-base">
                  At Nutridietmitra, we believe in nutrition, not restrictions. Our 100% personalized, kitchen-based plans are tailored to your lifestyle, culture, and goals—no crash diets or supplements. We provide weekly support and progress tracking to keep you motivated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-nutricare-text-dark text-center mb-8">
            Our Nutrition Plans
          </h2>
          <p className="text-nutricare-text-gray text-center text-base md:text-lg mb-12 max-w-2xl mx-auto">
            From weight management to glowing skin, our expert-led plans are designed to help you thrive naturally.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-nutricare-bg-light rounded-lg p-6 flex flex-col items-center text-center"
              >
                <div className="p-3 rounded-full bg-green-50 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-nutricare-text-dark mb-2">{service.title}</h3>
                <p className="text-nutricare-text-gray text-sm">{service.description}</p>
              </div>
            ))}
          </div>
          {/* <div className="mt-12 text-center">
            <button
              onClick={openAppointment}
              className="px-6 py-3 rounded-full flex items-center mx-auto transform transition-all hover:scale-105 bg-nutricare-green text-white hover:bg-nutricare-green-dark"
            >
              Explore All Services
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div> */}
        </div>
      </section>

      {/* Appointment Modal */}
      <Appointment isOpen={isAppointmentOpen} onClose={closeAppointment} />
    </>
  );
};

export default Hero;