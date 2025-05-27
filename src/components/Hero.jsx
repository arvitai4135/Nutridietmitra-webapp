import React, { useState, useEffect, useCallback } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Apple,
  Salad,
  Award,
  Check,
  User,
  Stethoscope,
  X,
} from 'lucide-react'
import img1 from '/assets/Images/img1.jpg'
import img2 from '/assets/Images/img2.jpg'
import img3 from '/assets/Images/img3.jpg'
import drImg from '../../public/assets/Images/drImg2.jpg'
import Appointment from './form/Appointment'
console.log(drImg)
// import Weight from '/Icon/Weight.ico';

const heroSlides = [
  {
    // title: "Empowering Your Health Journey",
    // subtitle: "Top Rated",
    // description:
    //   "Transform your life with personalized, kitchen-based nutrition plans crafted by Dt. Tanu Bhargava. With over 17 years of expertise, we help you heal, energize, and thrive without supplements or crash diets.",
    backgroundImage: img1,
    // accentColor: "nutricare-primary-light", // #D93BB1
    // textPosition: "left",
    // highlightPhrase: "heal, energize, and thrive",
  },
  {
    // title: "Sustainable Nutrition for Life",
    // subtitle: "Holistic Wellness Expertise",
    // description:
    //   "Join over 5000+ clients who've achieved lasting health with our science-backed, heart-led approach. From PCOS to diabetes, our tailored plans fit your lifestyle and goals.",
    backgroundImage: img2,
    // accentColor: "nutricare-green-dark", // #8CA417
    // textPosition: "right",
    // highlightPhrase: "lasting health",
  },
  {
    // title: "Your Path to Vibrant Wellness",
    // subtitle: "Guided by Dt. Tanu Bhargava",
    // description:
    //   "Experience compassionate, evidence-based nutrition coaching. Our customized plans for weight management, thyroid, and more ensure you feel confident and healthy.",
    backgroundImage: img3,
    // accentColor: "nutricare-primary-dark", // #9E0B7F
    // textPosition: "center",
    // highlightPhrase: "confident and healthy",
  },
]

const qualityCards = [
  {
    icon: <Award className="text-nutricare-green" size={24} />,
    title: 'Top Rated',
    description:
      "With so many choices of the food-diet advisory out there, we're at top-rated (cause of lovely services).",
  },
  {
    icon: <Check className="text-nutricare-green" size={24} />,
    title: 'Best Quality',
    description:
      "Don't look without what inherent our human body! We provides best quality services for your body.",
  },
  {
    icon: <Apple className="text-nutricare-green" size={24} />,
    title: 'Eat Fresh',
    description:
      "Quality does matter! when we feel good we're happier, when we are happier and we're more productive.",
  },
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFounderModalOpen, setIsFounderModalOpen] = useState(false)

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    )
  }, [])

  const openAppointment = () => {
    setIsAppointmentOpen(true)
  }

  const closeAppointment = () => {
    setIsAppointmentOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openFounderModal = () => {
    setIsFounderModalOpen(true)
  }

  const closeFounderModal = () => {
    setIsFounderModalOpen(false)
  }

  const handleContactUs = () => {
    window.location.href = '/contact'
  }

  // Add keyboard support for closing modals
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isModalOpen) closeModal()
        if (isFounderModalOpen) closeFounderModal()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isModalOpen, isFounderModalOpen])

  const aboutContent = `
Welcome to the world of Nutridietmitra
Let’s empower your health with personalised nutrition.
Empowering since 2014.
Nutridietmitra believes in nutrition, not in restrictions. A sustainable, nourishing
and balanced meal is all we grow for you. Nutridietmitra is founded by Dt. Tanu
Bhargava, who is a trusted expert in this field. Her role as a dietitian served for
over 17 years and we are counting many more. She has helped more than 5000+
clients to heal, energize and transform their lives into healthy ones. To cater to
your healthy body we provide personalised diet and lifestyle programs which
will help you to achieve your healthy goals concerning your body conditions.
Be it weight issues, support pregnancy, improved digestion, PCOD/PCOS,
Thyroid, Diabetes or battling with adapting to a healthier lifestyle. We are
always here to guide you as your nutrition and diet expert with a promise
to be compassionate about your diet with a science-baked and heart-led
master plan. Results that you can maintain and feel.
  `

  const aboutShortContent = aboutContent.split('\n').slice(0, 6).join('\n')

  const founderContent = `
Dt. Tanu Bhargava is a highly qualified Jaipur-based clinical dietitian and wellness expert. She aims to use a holistic approach for her clients that is accessible to all globally. Her experience includes top hospitals, health care centres, gym centres, and fitness chains. She has a strong foundation in nutrition therapy, medical, and lifestyle management expertise with 5000+ supported clients through multiple challenges like weight management, PCOD/PCOS, Diabetes, Thyroid disorders, sports nutrition, child immunity boosting and nutrition plans, lifestyle-related disorders, digestive issues, immunity, and more. This created her expertise in overcoming the dietary challenges that fit modern lifestyles.
Her expertise in sports nutrition and the unique dietary needs of active athletes is honoured by many fitness centres. Today, she is serving as a renowned Consultant Dietitian for Medical Second Opinion Pvt. Ltd while in collaboration with various organisations and corporations for preventive health guidance and workplace wellness.
Her clinically proven approach is viable, authentic, practical, and evidence-based with socially conscious care for others that respects comfort zone, preferences, tastes, and daily routine - which makes her a trusted expert in the hearts of people worldwide.
  `

  const founderShortContent = `
Dt. Tanu Bhargava is a highly qualified Jaipur-based clinical dietitian and wellness expert. She aims to use a holistic approach for her clients that is accessible to all globally. Her experience includes top hospitals, health care centres, gym centres, and fitness chains. She has a strong foundation in nutrition therapy, medical, and lifestyle management expertise with 5000+ supported clients through multiple challenges.
  `

  return (
    <>
      {/* Hero Slider Section */}
      <div className="relative h-[50vh] sm:min-h-screen w-full flex flex-col justify-center items-center font-sans">
        {/* Slider Content */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out flex flex-col justify-center items-center ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.backgroundImage}
              alt={`Hero slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-contain sm:object-cover object-center bg-gray-200 sm:bg-transparent"
              loading="lazy"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
            <div
              className={`relative z-10 max-w-[90%] sm:max-w-2xl md:max-w-3xl px-4 w-full md:w-auto rounded-lg p-6 ${
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
                <span className="relative z-10">{/* slide.subtitle */}</span>
                <span
                  className={`absolute bottom-0 w-8 md:w-12 h-0.5 md:h-1 bg-white ${
                    slide.textPosition === 'right' ? 'md:right-0' : 'left-0'
                  }`}
                />
              </h4>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white shadow-md">
                {/* {slide.title.split(' ').map((word, i, arr) => (
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
                ))} */}
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
                {/* {slide.description.split(slide.highlightPhrase).map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-nutricare-green-dark font-semibold">{slide.highlightPhrase}</span>
                    )}
                  </React.Fragment>
                ))} */}
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
                {/* <button 
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
                </button> */}
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
                  <h3 className="text-lg font-bold text-nutricare-text-dark mt-2">
                    {card.title}
                  </h3>
                </div>
                <p className="text-nutricare-text-gray text-sm">
                  {card.description}
                </p>
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
                Welcome to Nutridietmitra: Empowering Your Health
              </h2>
              <p className="text-nutricare-text-gray text-base md:text-lg mb-6 whitespace-pre-line">
                {aboutShortContent}
              </p>
              <button
                onClick={openModal}
                className="text-nutricare-green font-semibold hover:underline bg-transparent border-none cursor-pointer"
              >
                Read More
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-bold text-nutricare-text-dark mb-4">
                  Our Philosophy
                </h3>
                <div className="text-nutricare-text-gray text-sm md:text-base">
                  <p>
                    NutridietMitra does not believe in one-size-fits-all plans.
                    It believes every individual is different and concerned with
                    different needs, routines, challenges and cultures to cater
                    to. That is why we are here to provide:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      Friendly and adaptable solutions that do not include crash
                      diets or starvation.
                    </li>
                    <li>
                      Throughout your journey, we will be providing constant
                      emotional support and weekly progress tracking with
                      adjustments.
                    </li>
                    <li>Customized diet plans tailored to YOU.</li>
                    <li>
                      We look at the holistic side which is the bigger picture:
                      your mind, lifestyle and body.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-nutricare-text-dark text-center mb-4">
            Founder - Dt. Tanu Bhargava
          </h2>
          <p className="text-nutricare-text-gray text-center text-base md:text-lg mb-6 max-w-2xl mx-auto">
            The Wellness Mind Behind Nutridietmitra
          </p>
          <div className="bg-nutricare-bg-light rounded-lg p-4 w-full">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div
                className="flex-1"
                style={{
                  background: `url(${drImg}) center center/cover`,
                }}
              >
                <p
                  className="text-nutricare-text-gray text-sm md:text-base leading-tight flex items-center justify-center backdrop-blur-md 
                  h-full
                "
                >
                  <img src={drImg} alt="" className="w-[50%] " />
                </p>
              </div>
              <div className="flex-1">
                <p className="text-nutricare-text-gray text-sm md:text-base leading-tight text-justify tracking-widest">
                  {founderShortContent}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-nutricare-text-gray text-sm md:text-base leading-tight text-justify tracking-widest">
                  Her expertise in sports nutrition and the unique dietary needs
                  of active athletes is honoured by many fitness centres. Today,
                  she is serving as a renowned Consultant Dietitian for Medical
                  Second Opinion Pvt. Ltd while in collaboration with various
                  organisations and corporations for preventive health guidance
                  and workplace wellness.
                </p>
              </div>
              {/* <div className="flex-1">
                <p className="text-nutricare-text-gray text-sm md:text-base leading-tight">
                  Her clinically proven approach is viable, authentic,
                  practical, and evidence-based with socially conscious care for
                  others that respects comfort zone, preferences, tastes, and
                  daily routine - which makes her a trusted expert in the hearts
                  of people worldwide.
                </p>
              </div> */}
            </div>
            <div className="text-center">
              <button
                onClick={openFounderModal}
                className="text-nutricare-green font-semibold hover:underline bg-transparent border-none cursor-pointer"
              >
                Read More
              </button>
            </div>
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

      {/* About Read More Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 sm:p-6 rounded-lg w-full min-w-[90%] sm:min-w-0 max-w-md sm:max-w-2xl max-h-[80vh] overflow-y-auto relative border-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-nutricare-text-dark hover:text-nutricare-green"
              aria-label="Close modal"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-nutricare-text-dark mb-4">
              Welcome To Nutridietmitra
            </h2>
            <p className="text-nutricare-text-gray text-sm sm:text-base whitespace-pre-line">
              {aboutContent}
            </p>
          </div>
        </div>
      )}

      {/* Founder Read More Modal */}
      {isFounderModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6"
          onClick={closeFounderModal}
        >
          <div
            className="bg-white p-4 sm:p-6 rounded-lg w-full min-w-[90%] sm:min-w-0 max-w-md sm:max-w-2xl max-h-[80vh] overflow-y-auto relative border-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeFounderModal}
              className="absolute top-4 right-4 text-nutricare-text-dark hover:text-nutricare-green"
              aria-label="Close modal"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-nutricare-text-dark mb-4">
              About Dt. Tanu Bhargava
            </h2>
            <p className="text-nutricare-text-gray text-sm sm:text-base whitespace-pre-line">
              {founderContent}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Hero
