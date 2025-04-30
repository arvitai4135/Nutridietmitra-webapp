import React from "react";
import { ArrowRight, Award, Users, Heart, Clipboard, History } from "lucide-react";
import WomenEating from "/assets/Images/WomenEating.jpg";
import WomenApple from "/assets/Images/WomenApple.jpg";

const AboutTop = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-white font-sans">
      <div className="container mx-auto px-4">
        {/* Top Section with Image and Info */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Left Image Column with Overlay Effect */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={WomenEating}
                    alt="Woman enjoying healthy salad"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={WomenApple}
                    alt="Woman with apple"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Accent Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-nutricare-green rounded-full opacity-30 z-0"></div>
              <div className="absolute -bottommooth-6 -right-6 w-32 h-32 bg-nutricare-primary-light rounded-full opacity-20 z-0"></div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="w-full lg:w-1/2">
            <div className="lg:pl-8">
              {/* Section Title with Accent */}
              <div className="mb-6">
                <h5 className="text-nutricare-green font-semibold tracking-wider uppercase mb-2 flex items-center">
                  <span className="h-px w-8 bg-nutricare-green mr-3"></span>
                  About Nutridietmitra
                </h5>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nutricare-text-dark leading-tight">
                  India’s Trusted Nutrition Experts
                </h2>
              </div>

              {/* Content */}
              <div className="mt-6 text-nutricare-text-gray">
                <p className="leading-relaxed">
                  Founded in 2014 by Dt. Tanu Bhargava, a Jaipur-based dietitian with over 17 years of experience, Nutridietmitra empowers individuals globally with personalized, kitchen-based nutrition plans. Serving 5000+ clients, we focus on sustainable, science-backed solutions for weight management, PCOS, diabetes, and more, without supplements or crash diets.
                </p>
              </div>

              {/* Separator */}
              <div className="w-16 h-1 bg-nutricare-green my-8"></div>

              {/* Stats Counters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Happy Customers */}
                <div className="flex items-center group">
                  <div className="mr-4">
                    <div className="w-16 h-16 rounded-full bg-nutricare-bg-light flex items-center justify-center group-hover:bg-nutricare-green transition-colors duration-300">
                      <Users className="w-8 h-8 text-nutricare-primary-dark group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-nutricare-primary-dark">
                      5000+
                    </h3>
                    <p className="text-nutricare-text-gray">Healthy Clients</p>
                  </div>
                </div>

                {/* Awards */}
                <div className="flex items-center group">
                  <div className="mr-4">
                    <div className="w-16 h-16 rounded-full bg-nutricare-bg-light flex items-center justify-center group-hover:bg-nutricare-green transition-colors duration-300">
                      <Award className="w-8 h-8 text-nutricare-primary-dark group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-nutricare-primary-dark">
                      6
                    </h3>
                    <p className="text-nutricare-text-gray">Awards Won</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, History Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-nutricare-green hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-lg bg-nutricare-bg-light flex items-center justify-center group-hover:bg-nutricare-green transition-colors duration-300">
                <Heart className="w-7 h-7 text-nutricare-primary-dark group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-nutricare-text-dark ml-4">
                Our Mission
              </h3>
            </div>
            <p className="text-nutricare-text-gray">
              To empower individuals with health, energy, and confidence through personalized, delicious diet plans that support, heal, and promote holistic living.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-nutricare-green hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-lg bg-nutricare-bg-light flex items-center justify-center group-hover:bg-nutricare-green transition-colors duration-300">
                <Clipboard className="w-7 h-7 text-nutricare-primary-dark group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-nutricare-text-dark ml-4">
                Our Vision
              </h3>
            </div>
            <p className="text-nutricare-text-gray">
              To be India’s most trusted nutrition expert, inspiring holistic living with empathetic, evidence-based care and sustainable outcomes globally.
            </p>
          </div>

          {/* History Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-nutricare-green hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-lg bg-nutricare-bg-light flex items-center justify-center group-hover:bg-nutricare-green transition-colors duration-300">
                <History className="w-7 h-7 text-nutricare-primary-dark group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-nutricare-text-dark ml-4">
                Our History
              </h3>
            </div>
            <p className="text-nutricare-text-gray">
              Established in 2014 by Dt. Tanu Bhargava, Nutridietmitra has grown from a Jaipur-based practice to a global leader, serving 5000+ clients with personalized nutrition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTop;