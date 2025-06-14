import React, { useState, useEffect } from 'react'
import {
  Salad,
  Users,
  HeartPulse,
  ArrowRight,
  Award,
  Apple,
  Globe,
  BookOpen,
  Stethoscope,
} from 'lucide-react'
import img1 from '/assets/Images/img1.jpg'
import Appointment from '../form/Appointment.jsx'

// Icon mapping object for direct reference by name
const icons = {
  salad: Salad,
  users: Users,
  heartPulse: HeartPulse,
  arrowRight: ArrowRight,
  award: Award,
  apple: Apple,
  globe: Globe,
  bookOpen: BookOpen,
  stethoscope: Stethoscope,
}

import awardsAndRecgs from '../../../public/assets/Images/awardsAndRecs.jpg'

// Get icon component by name
const getIconByName = (name, props = {}) => {
  const IconComponent = icons[name]
  return IconComponent ? <IconComponent {...props} /> : null
}

const AboutUs = () => {
  const [years, setYears] = useState(0)
  const maxYears = 17
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)

  const openAppointment = () => setIsAppointmentOpen(true)
  const closeAppointment = () => setIsAppointmentOpen(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setYears((prev) => {
        if (prev < maxYears) {
          return prev + 1
        } else {
          clearInterval(timer)
          return prev
        }
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Color scheme
  const iconColors = {
    accent: 'text-[#ADD01C]',
  }

  const nutritionFeatures = [
    {
      icon: 'salad',
      title: 'Personalized Diet Plans',
      description:
        'Tailored, kitchen-based nutrition plans for your unique needs',
      color: iconColors.primary,
    },
    {
      icon: 'heartPulse',
      title: 'Holistic Wellness',
      description: 'Comprehensive support for health and lifestyle balance',
      color: iconColors.secondary,
    },
    {
      icon: (
        <img
          src="/Icon/Specialized.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      title: 'Specialized Nutrition',
      description: 'Expert plans for PCOS, diabetes, thyroid, and more',
      color: iconColors.accent,
    },
  ]

  return (
    <div
      className="bg-[#FCF0F8] py-12 overflow-x-hidden"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Main Content Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#9E0B7F] rounded-full"></div>
              <span className="text-[#9E0B7F] font-bold uppercase tracking-wide">
                About Nutridietmitra
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] leading-tight">
              Transforming Lives <br /> Through Nutrition
            </h1>

            <p className="text-[#718096] text-lg leading-relaxed text-justify">
              Founded in 2014 by Dt. Tanu Bhargava, a Jaipur-based dietitian
              with over {maxYears}+ years of experience, Nutridietmitra empowers
              over 5000+ clients globally with personalized, kitchen-based
              nutrition plans. Specializing in weight management, PCOS/PCOD,
              diabetes, thyroid, child nutrition, and sports nutrition, we offer
              sustainable, science-backed solutions without supplements or crash
              diets. Our unique services, like fresh fruit bouquet delivery and
              healthy salad subscriptions, bring nutritious, visually appealing
              meals to your doorstep.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {nutritionFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg"
                >
                  {typeof feature.icon === 'string'
                    ? getIconByName(feature.icon, {
                        className: feature.color,
                        size: 40,
                      })
                    : feature.icon}
                  <h3 className="font-bold text-[#333333] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#718096] text-sm text-justify">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative max-w-full">
            <div className="bg-[#ADD01C] opacity-20 absolute inset-0 -rotate-6 rounded-2xl hidden md:block"></div>
            <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={img1}
                alt="Nutridietmitra Nutrition Expertise"
                className="rounded-xl object-cover w-full max-h-[500px]"
              />
              <div
                className="absolute bottom-1 right-1 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 bg-[#9E0B7F] text-white 
              p-2 sm:p-3 md:p-5 rounded-xl shadow-xl z-20 w-fit"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-4xl md:text-6xl font-bold">{years}+</div>
                  <div>
                    <div className="font-semibold text-sm md:text-lg">
                      Years
                    </div>
                    <div className="text-xs md:text-base opacity-80">
                      of Expertise
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#333333] text-center mb-8">
            Our Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#9E0B7F] mb-2">
                Mission
              </h3>
              <p className="text-[#718096] text-justify">
                We are directed to aid a person with their health, energy,
                balanced emotions and sleep, boosting confidence with a healthy
                body, healthy eating, and holistic living through delicious diet
                meals that support, heal and enable your body to a healthy
                lifestyle.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#9E0B7F] mb-2">
                Vision
              </h3>
              <p className="text-[#718096] text-justify">
                We are working to be India's most trusted nutrition expert to
                empower healthy eating and inspire holistic living, acknowledged
                for our empathetic and socially conscious care, viable outcomes
                and real change.
              </p>
            </div>
          </div>
        </div>

        {/* Awards & Recognitions Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#333333] text-center mb-8">
            Awards & Recognitions
          </h2>
          <div className="grid grid-cols-12 gap-6">
            <div className="grid grid-cols-12 gap-6 col-span-12 md:col-span-7">
              {[
                { title: 'Bhargava Samaj Gaurav Award', year: 2017 },
                { title: 'Women Empowerment Award', year: 2020 },
                { title: 'Best Dietitian Award', year: 2020 },
                { title: 'Healthcare Achievement Award', year: 2022 },
                { title: "Women's Day Glory Award", year: 2025 },
                { title: 'Women Inspiration Award', year: 2025 },
              ].map((award, index) => (
                <div
                  key={index}
                  className="flex col-span-12 md:col-span-6 items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
                >
                  <Award className="text-[#ADD01C]" size={40} />
                  <div>
                    <span className="text-[#333333] font-semibold">
                      {award.title}
                    </span>
                    <p className="text-[#718096] text-sm">{award.year}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative max-w-full col-span-12 md:col-span-5">
              <div className="bg-[#ADD01C] opacity-20 absolute inset-0 -rotate-6 rounded-2xl hidden md:block"></div>
              <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src={awardsAndRecgs}
                  alt="Nutridietmitra Nutrition Expertise"
                  className="rounded-xl object-cover w-full max-h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mentions & Recognitions Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#333333] text-center mb-8">
            Mentions & Recognitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-justify">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#9E0B7F] mb-2">
                Media & Speaking Engagements
              </h3>
              <ul className="text-[#718096] list-disc pl-5 space-y-2">
                <li>
                  Wellness Columnist for Times of India, DNA & other magazines
                </li>
                <li>Speaker at Rajasthan Patrika Summer School (2010)</li>
                <li>Featured in Health Shows on Zee News & A1TV</li>
                <li>
                  Celebrity Nutritionist to Preeti Sharma, Gajendra Verma,
                  Milkha Singh, and other notable personalities
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#9E0B7F] mb-2">
                Join Our Family
              </h3>
              <p className="text-[#718096] mb-4">
                Trusted and honoured by thousands, more than a thousand people
                have already been a part of our family experiencing the real
                transformation in their bodies with the benefit of our
                consistency and customized nutrition plans with us. To lose/gain
                weight, manage a health condition or simply want to feel good in
                your body and skin - we are here for you. Dt. Tanu Bhargava
                shared her vast knowledge in seminars, lectures and workshops in
                government events/institutes, housing societies, colleges and
                schools, and organisations like HDFC Life, Bharti Infratel,
                Bajaj Allianz, Aircel, Genpact, and more.
              </p>
              <button
                onClick={openAppointment}
                className="text-[#ADD01C] font-semibold hover:underline bg-transparent border-none cursor-pointer"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: 'users',
              title: '5000+ Healthy Clients',
              color: 'text-[#8CA417]',
            },
            {
              icon: 'globe',
              title: 'Global Online Consultations',
              color: 'text-[#D93BB1]',
            },
            {
              icon: 'bookOpen',
              title: 'Evidence-Based Nutrition',
              color: 'text-[#9E0B7F]',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
            >
              {getIconByName(item.icon, { className: item.color, size: 40 })}
              <span className="text-[#333333] font-semibold">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Modal */}
      <Appointment isOpen={isAppointmentOpen} onClose={closeAppointment} />
    </div>
  )
}

export default AboutUs
