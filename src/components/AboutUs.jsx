import React, { useState, useEffect } from 'react';
import { 
  Salad, 
  Clock, 
  Shield, 
  HeartPulse, 
  ArrowRight 
} from 'lucide-react';
import img1 from '../assets/Images/img1.jpg';

const AboutUs = () => {
  const [years, setYears] = useState(0);
  const maxYears = 15;

  useEffect(() => {
    const timer = setInterval(() => {
      setYears(prev => {
        if (prev < maxYears) {
          return prev + 1; // Increment years if less than maxYears
        } else {
          clearInterval(timer); // Stop the interval when maxYears is reached
          return prev; // Return the current value (maxYears) to keep the state
        }
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const nutritionFeatures = [
    {
      icon: Salad,
      title: "Personalized Nutrition",
      description: "Tailored diet plans for individual needs",
      color: "text-[#9E0B7F]"
    },
    {
      icon: HeartPulse,
      title: "Health Monitoring",
      description: "Comprehensive health tracking",
      color: "text-[#D93BB1]"
    },
    {
      icon: Shield,
      title: "Expert Guidance",
      description: "Professional nutritionist support",
      color: "text-[#ADD01C]"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-[#FCF0F8] flex items-center justify-center"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#9E0B7F] rounded-full"></div>
              <span className="text-[#9E0B7F] font-bold uppercase tracking-wide">
                About Nutrition
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#333333] leading-tight">
              Transforming Health <br /> Through Nutrition
            </h1>

            <p className="text-[#718096] text-lg leading-relaxed">
              For {maxYears} years, we've been pioneering evidence-based nutrition resources. 
              Our team of Registered Dietitian Nutritionists is dedicated to empowering 
              individuals with personalized health strategies.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {nutritionFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg"
                >
                  <feature.icon 
                    className={`${feature.color} mb-3`} 
                    size={40} 
                  />
                  <h3 className="font-bold text-[#333333] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#718096] text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <button className="flex items-center bg-[#D93BB1] hover:bg-[#9E0B7F] text-white px-6 py-3 rounded-full transition duration-300 group">
              Explore Our Services
              <ArrowRight 
                className="ml-2 group-hover:translate-x-1 transition" 
                size={20} 
              />
            </button>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="bg-[#ADD01C] opacity-20 absolute inset-0 -rotate-6 rounded-2xl"></div>
            <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl">
              <img 
                src={img1}
                alt="Nutrition Expert" 
                className="rounded-xl object-cover w-full h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#9E0B7F] text-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-5xl font-bold">{years}</div>
                  <div>
                    <div className="font-semibold">Years</div>
                    <div className="text-sm opacity-80">of Expertise</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Bar */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { 
              icon: Clock, 
              title: "Ontime Services", 
              color: "text-[#8CA417]" 
            },
            { 
              icon: Shield, 
              title: "24/7 Support", 
              color: "text-[#D93BB1]" 
            },
            { 
              icon: HeartPulse, 
              title: "Verified Experts", 
              color: "text-[#9E0B7F]" 
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
            >
              <item.icon 
                className={`${item.color}`} 
                size={40} 
              />
              <span className="text-[#333333] font-semibold">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;