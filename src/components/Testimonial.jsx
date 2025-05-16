import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Youtube } from 'lucide-react';
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
        "This 10 day challenge actually helped me a lot. Both in losing weight and in feeling more healthy and energetic. I've been more productive and I've also seen a difference in my skin. Thanks to Miss. Tanu for helping me.",
      name: "Muskan",
      image: "/assets/Images/client1.jpg",
    },
    {
      id: 2,
      quote:
        "It should not be called 'Diet with Tanu', it should be called 'Eating healthy with Tanu'. I have been following her meal plan for the past 5 months and didn't starve even a single day! There have been weeks when I told her it's a lot for me to eat, can I eat less? I also like the innovative meal plan she shared which never makes you feel bored. She even shares the recipe links to make it easier for you. All the meals are easy to make from the ingredients readily available in our kitchens. I have lost 8kgs in 3.5-4 months (with a few cheat meals) but continue to follow her plan to make up for my cheat meals over weekends. I would recommend Tanu for a healthy lifestyle.",
      name: "Priyanka Jain",
      image: "/assets/Images/client2.jpg",
    },
    {
      id: 3,
      quote:
        "I would like to thank Tanu Bhargava for all the advice. She planned my mom's diet chart, during her 3 months phase of Cancer Treatment. There are very few dieticians who provide such personal attention. I remember the treatment was going on at Mahavir Cancer Hospital, Tanu would send food from her kitchen and sometimes visit mom personally. The food was high quality, packed properly and was very tasty. Mom won't eat food provided by the hospital and she would gladly eat the food from Tanu's kitchen. With her advice in diet, mom's progress has been excellent. After radiation therapy mom is gaining weight and has no side effects. Better diet is the key for improvements in health and Tanu has made sure mom's diet plan is top notch. I would recommend Tanu to any Cancer Patient! God bless!",
      name: "Pallav Bhargava",
      image: "/assets/Images/client3.jpg",
    },
    {
      id: 4,
      quote:
        "My name is Kusum Choudhary and I'm 42 yrs old. On 20th of May I started following the diet plans provided by Tanu dietician and it has been very effective. I lost 10.5Kgs within the three next months as my weight decreased from 83.5 to 73 kg. I'm feeling very positive and happy with the results and for that I'm incredibly thankful to Tanu dietician.",
      name: "Kusum Choudhary",
      image: "/assets/Images/client4.jpg",
    },
    {
      id: 5,
      quote:
        "Thank you ma'am for being the part of my weight loss journey and your 24*7 guidance throughout the plan. Your diet plan made me eat my favorite Indian delicacies but yes in balanced proportion. I learnt that loosing weight doesn't mean you need to starve. Eat everything but you only need to count your calories and calories deficit is the only way to loose excess fat. Your support and guidance is really valuable ma'am and I feel motivated since the time I am associated with you. We started loving our bodies :-) You have made a positive difference in our lives. Thank you so much for everything !! I am your proud happy client :-)",
      name: "Renu Kabra",
      image: "/assets/Images/client5.jpg",
    },
    {
      id: 6,
      quote:
        "Dt Tanu is one of the best dietician in Jaipur, I consulted her three months back to reduce my weight. Within three months, I have reduced 14 kg. I found her very supportive and helpfull I strongly recommend to all to visit her clinic if you are really want change in your personality. In short, I can say that she is the best in Jaipur. Please feel free take my personal opinion my cell 7023988286. Hope you do visit her for your health check-up.",
      name: "Surendar Nandha",
      image: "/assets/Images/client6.jpg",
    },
    {
      id: 7,
      quote:
        "I have known Tanu for more than 10 years now and I must say she is super talented with her diet & nutrition skills, she has always helped me shed extra kilos within a quick span of time that too without loosing the glow of my skin. She has been a go to person for me whenever I feel that I am deviating from the healthy lifestyle. The best part of her diet charts that I have noticed is that she will not make you starve in order to loose weight infact she will balance the calories in such manner so you don't feel hungry at all and you still end up loose weight on the other hand. The amazing and high rich nutritious drinks that she included in my diet chart were so mouth watering and healthy that I always looked upto 11AM slot of my diet so I can have it :-) I highly recommend this extremely experience lady if any of you are looking for a dietician to help you get back to a healthy lifestyle. Many thanks Tanu for showing me the significance of healthy lifestyle!",
      name: "Jatin",
      image: "/assets/Images/client7.jpg",
    },
    {
      id: 8,
      quote:
        "Usually the word 'diet' is misinterpreted and leads one to think of starving! I had severe migraine issues for the last so many years and they were so frequent and intensely painful. I never knew that a little tweaks with the diet would help me beat them. So grateful for having known and following the regime with Dr. Tanu.",
      name: "Suvidha Malhotra",
      image: "/assets/Images/client8.jpg",
    },
    {
      id: 9,
      quote:
        "been under guidance of dr tanu for almost 3 months and it had been wonderful experience as when you hear of diet it simply understood as you are skipping meals but with dr tanu it's never been that I have enjoy ample of dishes and seasonal fruits and results are there I have almost lost 10 kgs in 3 months without skipping or leaving any food.",
      name: "Sumit Jakhodia",
      image: "/assets/Images/client9.jpg",
    },
    {
      id: 10,
      quote:
        "I have struggled with my weight for most of my life. I was athletic, played sports and spent a lot of time in the gym, but the weight never wanted to come down. I tried and struggled with different diets. Every diet I tried failed. Each time I found that I was ALWAYS hungry and felt deprived then I came to know about nutri diet mitra through one of my friend,after getting consult from dr tanu I came to know the importance of diet and nutrition,after following the diet given by Dr tanu I dropped a good percentage of body fat which I was not able to reduce earlier,I never thought that fat can be reduce by eating tasty and wonderful foods,the diet offered is not a boring or tasteless. now I feel very energetic plus eating all those foods which I love to eat. Thank u so much dr tanu for this wonderful guidance and diet",
      name: "Abhie Vashisth",
      image: "/assets/Images/client10.jpg",
    },
    {
      id: 11,
      quote:
        "She has offered me healthy and yummy diet plans to reduce weight :-)",
      name: "Pratima Bhargava",
      image: "/assets/Images/client11.jpg",
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
                How Nutridietmitra Changed Lives
              </h2>
              <p className="text-nutricare-text-gray text-base mt-4">
                At Nutridietmitra, our clients have experienced and incredible 
transformational journey recovering from many chronic issues 
to a healthy living and lifestyle. Here are some success stories 
of our clients: 
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

        {/* YouTube Button */}
        <div className="flex justify-center mt-2 md:mt-4">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-nutricare-primary-dark text-nutricare-bg-light px-4 py-2 rounded-full font-bold text-base shadow-md hover:bg-nutricare-bg-light hover:text-nutricare-primary-dark transition-colors duration-300 flex items-center justify-center w-full max-w-48 md:max-w-52"
          >
            <Youtube size={20} className="mr-2" />
            Watch Testimonial
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute -top-20 -right-20 bg-nutricare-primary-light bg-opacity-20 h-40 w-40 rounded-full"></div>
      <div className="hidden md:block absolute -bottom-10 left-1/4 bg-nutricare-green-dark bg-opacity-20 h-20 w-20 rounded-full"></div>
    </div>
  );
};

export default Testimonial;