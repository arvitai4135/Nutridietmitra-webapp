import React, { useState, useEffect } from "react";
import {
  Salad,
  Clock,
  Shield,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import img1 from "/assets/Images/img1.jpg"; // Ensure path is correct
import ConsultationFormModal from "../form/Consultency.jsx";

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

  const nutritionFeatures = [
    {
      icon: Salad,
      title: "Personalized Nutrition",
      description: "Custom diet plans for your needs",
      color: "text-[#9E0B7F]",
    },
    {
      icon: HeartPulse,
      title: "Lifestyle Wellness",
      description: "Holistic health and lifestyle support",
      color: "text-[#D93BB1]",
    },
    {
      icon: Shield,
      title: "Sports Nutrition",
      description: "Expert guidance for active lifestyles",
      color: "text-[#ADD01C]",
    },
  ];

  return (
    <div className="bg-[#FCF0F8] py-12 overflow-x-hidden" style={{ fontFamily: "Arial, sans-serif" }}>
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#9E0B7F] rounded-full"></div>
              <span className="text-[#9E0B7F] font-bold uppercase tracking-wide">
                About Nutridietmitra
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] leading-tight">
              Empowering Health <br /> Through Nutrition
            </h1>

            <p className="text-[#718096] text-lg leading-relaxed">
              Founded in 2014 by Dt. Tanu Bhargava, a dietitian with over{" "}
              {maxYears} years of experience, Nutridietmitra in Jaipur is
              dedicated to making everyone healthy and happy through
              personalized diet and lifestyle plans. With a global reach,
              she’s consulted over 5,000 clients to manage weight, obesity,
              Thyroid, PCOD/S, Diabetes, and more.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {nutritionFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg"
                >
                  <feature.icon className={`${feature.color} mb-3`} size={40} />
                  <h3 className="font-bold text-[#333333] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#718096] text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* <button
              onClick={openModal}
              className="flex items-center bg-[#D93BB1] hover:bg-[#9E0B7F] text-white px-6 py-3 rounded-full transition duration-300 group"
            >
              Explore Our Services
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition"
                size={20}
              />
            </button> */}
          </div>

          {/* Image Section */}
          <div className="relative max-w-full">
            <div className="bg-[#ADD01C] opacity-20 absolute inset-0 -rotate-6 rounded-2xl hidden md:block"></div>
            <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={img1}
                alt="Dt. Tanu Bhargava"
                className="rounded-xl object-cover w-full max-h-[500px]"
              />
              <div className="absolute bottom-0 right-0 md:-bottom-6 md:-right-6 bg-[#9E0B7F] text-white p-4 md:p-6 rounded-xl shadow-lg w-fit">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl md:text-5xl font-bold">{years}</div>
                  <div>
                    <div className="font-semibold text-sm md:text-base">Years</div>
                    <div className="text-xs md:text-sm opacity-80">of Expertise</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Clock,
              title: "Timely Consultations",
              color: "text-[#8CA417]",
            },
            {
              icon: Shield,
              title: "Global Support",
              color: "text-[#D93BB1]",
            },
            {
              icon: HeartPulse,
              title: "Certified Expertise",
              color: "text-[#9E0B7F]",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
            >
              <item.icon className={`${item.color}`} size={40} />
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