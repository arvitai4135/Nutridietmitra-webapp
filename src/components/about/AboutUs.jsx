import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import img1 from "/assets/Images/img1.jpg";
import ConsultationFormModal from "../form/Consultency.jsx";

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
};

// Get icon component by name
const getIconByName = (name, props = {}) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};

const AboutUs = () => {
  const [years, setYears] = useState(0);
  const maxYears = 17;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setYears((prev) => {
        if (prev < maxYears) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Color scheme
  const iconColors = {
    // primary: "text-[#9E0B7F]",
    // secondary: "text-[#D93BB1]",
    accent: "text-[#ADD01C]",
  };

  const nutritionFeatures = [
    {
      icon: "salad",
      title: "Personalized Diet Plans",
      description: "Tailored, kitchen-based nutrition plans for your unique needs",
      color: iconColors.primary,
    },
    {
      icon: "heartPulse",
      title: "Holistic Wellness",
      description: "Comprehensive support for health and lifestyle balance",
      color: iconColors.secondary,
    },
    {
      icon: <img src="/Icon/Specialized.ico" className="w-10 h-10 filter-accent" alt="Specialized Nutrition Icon" />,
      title: "Specialized Nutrition",
      description: "Expert plans for PCOS, diabetes, thyroid, and more",
      color: iconColors.accent,
    },
  ];

  return (
    <div className="bg-[#FCF0F8] py-12 overflow-x-hidden" style={{ fontFamily: "Arial, sans-serif" }}>
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

            <p className="text-[#718096] text-lg leading-relaxed">
              Founded in 2014 by Dt. Tanu Bhargava, a Jaipur-based dietitian with over {maxYears}+ years of experience, Nutridietmitra empowers over 5000+ clients globally with personalized, kitchen-based nutrition plans. Specializing in weight management, PCOS/PCOD, diabetes, thyroid, child nutrition, and sports nutrition, we offer sustainable, science-backed solutions without supplements or crash diets. Our unique services, like fresh fruit bouquet delivery and healthy salad subscriptions, bring nutritious, visually appealing meals to your doorstep.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {nutritionFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg"
                >
                  {typeof feature.icon === "string"
                    ? getIconByName(feature.icon, { className: feature.color, size: 40 })
                    : feature.icon}
                  <h3 className="font-bold text-[#333333] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#718096] text-sm">
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
              <div className="absolute bottom-0 right-0 md:-bottom-6 md:-right-6 bg-[#9E0B7F] text-white p-4 md:p sister rounded-xl shadow-lg w-fit">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl md:text-5xl font-bold">{years}+</div>
                  <div>
                    <div className="font-semibold text-sm md:text-base">Years</div>
                    <div className="text-xs md:text-sm opacity-80">of Expertise</div>
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
              <h3 className="text-xl font-semibold text-[#9E0B7F] mb-2">Mission</h3>
              <p className="text-[#718096]">
                To empower individuals with health, energy, and confidence through delicious, kitchen-based diet plans that promote holistic living and sustainable healthy eating.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#9E0B7F] mb-2">Vision</h3>
              <p className="text-[#718096]">
                To be India's most trusted nutrition expert, inspiring holistic living with empathetic, socially conscious care and viable outcomes globally.
              </p>
            </div>
          </div>
        </div>

        {/* Awards & Recognitions Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#333333] text-center mb-8">
            Awards & Recognitions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Bhargava Samaj Gaurav Award", year: 2017 },
              { title: "Women Empowerment Award", year: 2020 },
              { title: "Best Dietitian Award", year: 2020 },
              { title: "Healthcare Achievement Award", year: 2022 },
              { title: "Women's Day Glory Award", year: 2025 },
              { title: "Women Inspiration Award", year: 2025 },
            ].map((award, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
              >
                <Award className="text-[#ADD01C]" size={40} />
                <div>
                  <span className="text-[#333333] font-semibold">{award.title}</span>
                  <p className="text-[#718096] text-sm">{award.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unique Services Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#333333] text-center mb-8">
            Our Unique Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-2">
                <Apple className="text-[#D93BB1]" size={40} />
                <h3 className="text-xl font-semibold text-[#9E0B7F]">Fresh Fruit Bouquets</h3>
              </div>
              <p className="text-[#718096]">
                Customized, visually stunning fruit bouquets delivered to your doorstep, perfect for gifting or enjoying a healthy, vibrant snack. Made with fresh, seasonal fruits, tailored to your preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-2">
                <Salad className="text-[#ADD01C]" size={40} />
                <h3 className="text-xl font-semibold text-[#9E0B7F]">Healthy Salad Subscriptions</h3>
              </div>
              <p className="text-[#718096]">
                Nutritious, dietitian-designed salads delivered in Jaipur, customized to your medical history and lifestyle. Options include high-protein, anti-aging, and rainbow fruit salads, starting at ₹200 per meal.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: "users",
              title: "5000+ Healthy Clients",
              color: "text-[#8CA417]",
            },
            {
              icon: "globe",
              title: "Global Online Consultations",
              color: "text-[#D93BB1]",
            },
            {
              icon: "bookOpen",
              title: "Evidence-Based Nutrition",
              color: "text-[#9E0B7F]",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
            >
              {getIconByName(item.icon, { className: item.color, size: 40 })}
              <span className="text-[#333333] font-semibold">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Form Modal */}
      <ConsultationFormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AboutUs;