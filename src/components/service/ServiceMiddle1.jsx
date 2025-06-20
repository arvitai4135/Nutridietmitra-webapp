import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronUp,
  faChevronDown,
  faFilter,
  faBalanceScale,
  faPlusCircle,
  faHeartbeat,
  faBaby,
  faTint,
  faAppleAlt,
  faShieldAlt,
  faDumbbell,
  faBone,
  faHeart,
  faMoon,
  faLeaf,
  faFemale,
  faUtensils,
  faGift,
  faBreadSlice,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import Appointment from '../form/Appointment'

// Custom SVG for Thyroid
const ThyroidIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-full h-full"
  >
    <path d="M7 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M17 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  </svg>
)

// Read More Modal Component
const ReadMoreModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-nutricare-primary-dark">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="bg-nutricare-green text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-nutricare-green-dark transition-colors"
          >
            &times;
          </button>
        </div>
        <p className="text-nutricare-text-gray text-sm whitespace-pre-line">
          {content}
        </p>
      </div>
    </div>
  )
}

const NutritionServices = () => {
  const [hoveredService, setHoveredService] = useState(null)
  const [appointmentOpen, setAppointmentOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [readMoreOpen, setReadMoreOpen] = useState(false)
  const [selectedServiceContent, setSelectedServiceContent] = useState({
    title: '',
    content: '',
  })

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'core', name: 'Core Plans' },
    { id: 'specialized', name: 'Specialized Plans' },
    { id: 'other', name: 'Other Special Services' },
  ]

  const services = [
    // Core Plans
    {
      id: 1,
      title: 'Weight Loss Plan',
      description:
        'Our unique and personalized weight-loss diet plans will help shed your excess weight in a friendly and sustainable way while nourishing your body with nourishing kitchen based and no supplements. So, say Bye-BYE to fad diets.',
      icon: (
        <img
          src="/Icon/weightLoss.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Sustainable weight loss', 'Nourishing meals', 'No fad diets'],
      color: 'from-pink-500 to-pink-600',
      category: 'core',
    },
    {
      id: 2,
      title: 'Weight Gain Plan',
      description:
        'Our unique and personalized weight-gain diet plans designed for people who have low appetite, hasty metabolism, or recovering from illness to gain weight in a friendly and sustainable way while nourishing your body. So, no junk diets anymore.',
      icon: (
        <img
          src="/Icon/weightGain.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: [
        'Healthy weight gain',
        'Nutrient-dense meals',
        'No junk diets',
      ],
      color: 'from-blue-500 to-blue-600',
      category: 'core',
    },
    {
      id: 3,
      title: 'PCOS/PCOD Management',
      description:
        'Balancing hormones has always been a turmoil for PCOD/PCOS Clients. Our expert diet will help you manage and improve your menstrual health, balance hormones, reduce symptoms of PCOS with tailored diet and lifestyle strategies.',
      icon: <FontAwesomeIcon icon={faFemale} className="w-full h-full" />,
      benefits: ['Hormone balance', 'Menstrual health', 'Symptom reduction'],
      color: 'from-emerald-500 to-emerald-600',
      category: 'core',
    },
    {
      id: 4,
      title: 'Pre and Post-Pregnancy Plan',
      description:
        'From conceiving a baby to delivery and recovery, Our expert will guide you through maternal nutrition on how to ensure a healthy journey for both mom and baby naturally with kitchen based dietary.',
      icon: (
        <img
          src="/Icon/pregenancy.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: [
        'Healthy pregnancy',
        'Postpartum recovery',
        'Maternal nutrition',
      ],
      color: 'from-purple-500 to-purple-600',
      category: 'core',
    },
    {
      id: 5,
      title: 'Diabetes Diet',
      description:
        'Our expert will guide you on how to control blood sugar levels naturally with a kitchen based and no supplements that will help you balance your energy levels and insulin function.',
      icon: (
        <img
          src="/Icon/diabetes.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Blood sugar control', 'Energy balance', 'Insulin support'],
      color: 'from-teal-500 to-teal-600',
      category: 'core',
    },
    {
      id: 6,
      title: 'Thyroid Management',
      description:
        'A diet that will guide you on how to support thyroid function naturally with a kitchen based and no supplements diet that will help you boost metabolism, reduce fatigue and weakness, while combat weight fluctuations.',
      icon: (
        <img
          src="/Icon/thyroid.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Thyroid support', 'Metabolism boost', 'Fatigue reduction'],
      color: 'from-amber-500 to-amber-600',
      category: 'core',
    },
    {
      id: 7,
      title: 'Child Nutrition',
      description:
        'Diet that lays the base for a healthy lifelong health. Our expert will guide you to make fun and healthy functional meals for your growing child.',
      icon: (
        <img
          src="/Icon/child.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Healthy growth', 'Fun meals', 'Lifelong habits'],
      color: 'from-orange-500 to-orange-600',
      category: 'core',
    },
    {
      id: 8,
      title: 'Immunity Boosting Plan',
      description:
        'Our Dietitian will guide you with a diet that will give your immune system a booster to increase your immunity with antioxidant-rich, dense nutritional meals naturally with a kitchen based and no supplements.',
      icon: (
        <img
          src="/Icon/immunity.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Immune strength', 'Antioxidant-rich', 'Illness resistance'],
      color: 'from-yellow-500 to-yellow-600',
      category: 'core',
    },
    // Specialized Plans
    {
      id: 9,
      title: 'Sports Nutrition',
      description:
        'Fueling your fit body with expert nutrition will help you enhance endurance, muscle recovery, internal healing and increase performance.',
      icon: <FontAwesomeIcon icon={faDumbbell} className="w-full h-full" />,
      benefits: [
        'Enhanced performance',
        'Muscle recovery',
        'Endurance support',
      ],
      color: 'from-indigo-500 to-indigo-600',
      category: 'specialized',
    },
    {
      id: 10,
      title: 'Arthritis Management',
      description:
        'A diet that will support your joints rich in nutrients reducing pain and inflammation in the body.',
      icon: <FontAwesomeIcon icon={faBone} className="w-full h-full" />,
      benefits: ['Pain reduction', 'Joint support', 'Inflammation control'],
      color: 'from-red-500 to-red-600',
      category: 'specialized',
    },
    {
      id: 11,
      title: 'Anti-inflammatory Diet',
      description:
        'A diet that will help you understand and resolve your chronic health issues like fatigue, bloating and pain through support, gut friendly meals and calmness.',
      icon: (
        <img
          src="/Icon/Anti.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: [
        'Inflammation reduction',
        'Gut health',
        'Chronic issue relief',
      ],
      color: 'from-green-500 to-green-600',
      category: 'specialized',
    },
    {
      id: 12,
      title: 'Healthy Heart Plan',
      description:
        'A diet that helps you boost your cardiovascular function and balance cholesterol with heart friendly kitchen based meal plans.',
      icon: (
        <img
          src="/Icon/heart.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: [
        'Cholesterol balance',
        'Heart health',
        'Cardiovascular support',
      ],
      color: 'from-rose-500 to-rose-600',
      category: 'specialized',
    },
    {
      id: 13,
      title: 'Post-Menopause Management',
      description:
        'A diet which will help you post menopause to manage and balance your hormone functioning, bone health with nutritional meals in your transitional phase.',
      icon: (
        <img
          src="/Icon/Post.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Hormone balance', 'Bone health', 'Symptom management'],
      color: 'from-violet-500 to-violet-600',
      category: 'specialized',
    },
    {
      id: 14,
      title: 'Glowing Skin Diet',
      description:
        'A diet which will help you achieve radiant, clear and glowing glass skin from inside and out with antioxidant rich meals and hydration plans.',
      icon: (
        <img
          src="/Icon/skin.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Radiant skin', 'Hydration support', 'Antioxidant-rich'],
      color: 'from-fuchsia-500 to-fuchsia-600',
      category: 'specialized',
    },
    {
      id: 15,
      title: 'Detox Diet',
      description:
        'A detox plan that will help you achieve a healthy body while gently cleansing your body and rebooting your system with kitchen based, natural and fiber rich meals.',
      icon: (
        <img
          src="/Icon/healthy.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Body cleansing', 'Energy boost', 'Digestive health'],
      color: 'from-lime-500 to-lime-600',
      category: 'specialized',
    },
    {
      id: 16,
      title: 'Celiac Disease Management',
      description:
        'A diet which will help you to vanish gluten with delicious gluten free-diets.',
      icon: (
        <img
          src="/Icon/celiac.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Gluten-free nutrition', 'Gut healing', 'Symptom relief'],
      color: 'from-cyan-500 to-cyan-600',
      category: 'specialized',
    },
    {
      id: 17,
      title: 'Fatty Liver Management',
      description:
        'A diet which will help you to reverse your fatty liver symptoms mindfully through low fat and liver supporting meals.',
      icon: (
        <img
          src="/Icon/liver.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Liver detox', 'Symptom reversal', 'Fat reduction'],
      color: 'from-emerald-600 to-emerald-700',
      category: 'specialized',
    },
    {
      id: 18,
      title: 'Acid Reflux Management Diet',
      description:
        'A diet that will help you to soothe your digestion and vanish triggers and stressors for your body with stomach friendly and calming diet plans.',
      icon: (
        <img
          src="/Icon/reflux.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Reflux relief', 'Digestive comfort', 'Trigger elimination'],
      color: 'from-blue-600 to-blue-700',
      category: 'specialized',
    },
    // Other Special Services
    {
      id: 19,
      title: 'Fresh Fruit Bouquet Delivery',
      description:
        "A fresh fruit bouquet is a beautiful and healthy arrangement of fresh fruits, carefully selected and arranged to create a stunning visual display. It's a perfect gift for any occasion, such as birthdays, anniversaries, or get-well wishes. We deliver fruit bouquets at your doorstep which are customized as per your requirement.\n\nWhat will you get?\n- Healthy Alternative: Fresh fruit bouquets are a healthier alternative to traditional flower bouquets.\n- Customizable: Fruit bouquets can be customized to suit individual tastes and dietary preferences.\n- Visually Appealing: Fresh fruit bouquets are visually appealing and can brighten up any room.\n\n\"A fresh fruit bouquet is a thoughtful and healthy gift that's perfect for any occasion. Our fruit bouquets are carefully crafted with a variety of fresh fruits, arranged to create a stunning visual display. Whether you're looking for a unique gift or a healthy snack, our fresh fruit bouquets are sure to delight.\"\n\nKey Features:\n- Fresh and Seasonal Fruits: Use fresh and seasonal fruits to ensure maximum flavor and nutritional value.\n- Creative Arrangement: Arrange the fruits in a creative and visually appealing way.\n- Customizable: Offer customization options to suit individual tastes and dietary preferences.",
      icon: (
        <img
          src="/Icon/fruit.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Healthy alternative', 'Customizable', 'Visually appealing'],
      color: 'from-pink-600 to-pink-700',
      category: 'other',
    },
    {
      id: 20,
      title: 'Healthy Salad Delivery',
      description:
        'Why Eating a salad everyday is healthy?\n\nWhat will you get?\n- Rich in Fiber: Salads, especially those with leafy greens and vegetables like carrots and broccoli, are excellent sources of fiber. Fiber aids in digestion, helps prevent constipation, and can contribute to a feeling of fullness, aiding in weight management.\n- Packed with Vitamins and Minerals: Salads provide a wide range of vitamins and minerals, including vitamin C, potassium, and antioxidants like beta-carotene, which are crucial for immune function, skin health, and overall well-being.\n- Low in Calories: Salads are typically low in calories, making them a good option for weight management and healthy eating.\n\nHealth Benefits:\n- Improved Digestive Health: The fiber in salads promotes healthy digestion, helps maintain regular bowel movements, and can prevent constipation.\n- Heart Health: Salads can contribute to a healthy heart by helping to lower cholesterol levels and providing antioxidants that protect against cardiovascular disease.\n- Weight Management: The low calorie content and high fiber content of salads can help with weight loss and maintenance.\n- Boosted Immunity: The vitamins and antioxidants in salads help strengthen the immune system and protect against illness.\n- Healthy Skin: Salads, especially those with fresh vegetables, can contribute to healthy skin by providing hydration and antioxidants.\n- Bone Health: Salads can contribute to strong bones by providing calcium and other essential nutrients.\n\nWhy should you choose our healthy salad meal?\n- Healthy, delicious Salads that are customised as per your medical history, body type and lifestyle.\n- Designed and authenticated by an experienced dietitian.\n- Using fresh and organic fruits and vegetables.',
      icon: (
        <img
          src="/Icon/salad.ico"
          className="w-10 h-10 filter-accent"
          alt="Specialized Nutrition Icon"
        />
      ),
      benefits: ['Rich in fiber', 'Packed with vitamins', 'Low in calories'],
      color: 'from-green-600 to-green-700',
      category: 'other',
    },
  ]

  const handleServiceClick = (serviceTitle) => {
    setSelectedService(serviceTitle)
    setAppointmentOpen(true)
  }

  const handleReadMoreClick = (title, content) => {
    setSelectedServiceContent({ title, content })
    setReadMoreOpen(true)
  }

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description
    return description.slice(0, maxLength) + '...'
  }

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((service) => service.category === activeCategory)

  return (
    <div className="font-sans bg-white text-nutricare-text-dark">
      <section className="py-20 bg-gradient-to-b from-nutricare-bg-light to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-nutricare-green bg-opacity-20 rounded-full text-nutricare-green-dark font-semibold text-sm mb-3">
              OUR SERVICES
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-nutricare-primary-dark mb-6">
              Personalized Nutrition{' '}
              <span className="text-nutricare-green">by Nutridietmitra</span>
            </h2>
            <p className="max-w-2xl mx-auto text-nutricare-text-gray text-lg">
              Founded by Dt. Tanu Bhargava, Nutridietmitra offers 17+ years of
              expertise with 5000+ clients, providing 100% personalized,
              kitchen-based nutrition plans with no supplements for sustainable
              health.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full transition-all duration-300 w-full sm:w-auto ${
                  activeCategory === category.id
                    ? 'bg-nutricare-green text-white shadow-md'
                    : 'bg-gray-100 text-nutricare-text-gray hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {activeCategory !== 'all' && (
            <div className="mb-8 flex items-center justify-center">
              <div className="h-px bg-gray-200 flex-1"></div>
              <h3 className="text-xl font-medium text-nutricare-primary-dark mx-4 flex items-center">
                <FontAwesomeIcon
                  icon={faFilter}
                  size="1x"
                  className="mr-2 text-nutricare-green"
                />
                {categories.find((cat) => cat.id === activeCategory)?.name}
              </h3>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="relative overflow-hidden rounded-2xl transition-all duration-300 group cursor-pointer"
                style={{
                  transform:
                    hoveredService === service.id
                      ? 'translateY(-8px)'
                      : 'translateY(0)',
                  boxShadow:
                    hoveredService === service.id
                      ? '0 20px 25px -5px rgba(157, 11, 127, 0.1), 0 10px 10px -5px rgba(157, 11, 127, 0.04)'
                      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                }}
                onClick={() => handleServiceClick(service.title)}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div
                  className={`h-3 bg-gradient-to-r ${service.color} rounded-t-2xl`}
                ></div>

                <div className="bg-white p-6 h-full border-t-0 border border-gray-100 rounded-b-2xl ">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl mb-5 p-3 text-white transform
                    transition-all duration-300 relative z-10 shadow-lg`}
                    style={{
                      transform:
                        hoveredService === service.id
                          ? 'rotate(8deg) scale(1.05)'
                          : 'rotate(3deg)',
                    }}
                  >
                    {service.icon}
                    <div className="absolute -inset-0.5 bg-white opacity-20 rounded-2xl blur"></div>
                  </div>

                  <h3 className="text-xl font-bold text-nutricare-primary-dark mb-3 group-hover:text-nutricare-green transition-colors">
                    {service.title}
                  </h3>

                  <p
                    className={`text-nutricare-text-gray mb-5 text-sm ${
                      service.category === 'other'
                        ? 'truncate max-h-24'
                        : 'whitespace-pre-line'
                    }`}
                  >
                    {service.category === 'other'
                      ? truncateDescription(service.description)
                      : service.description}
                  </p>

                  {service.category === 'other' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation() // Prevent triggering handleServiceClick
                        handleReadMoreClick(service.title, service.description)
                      }}
                      className="text-nutricare-green font-medium hover:underline text-sm"
                    >
                      Read More
                    </button>
                  )}

                  <div className="mb-4 bg-gray-50 p-3 rounded-xl">
                    <h4 className="text-xs font-semibold text-nutricare-green-dark mb-2">
                      KEY BENEFITS
                    </h4>
                    <ul>
                      {service.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start mb-2 text-sm text-nutricare-text-gray"
                        >
                          <div
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0 mt-1 mr-2`}
                          >
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex space-x-1 opacity-50">
                  <div
                    className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`}
                  ></div>
                  <div
                    className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`}
                  ></div>
                  <div
                    className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-nutricare-primary-dark">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light rounded-2xl p-10 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 flex justify-between opacity-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 bg-white"></div>
              ))}
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Nutridietmitra Family</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
                Book your free consultation to start your journey toward a healthier lifestyle with personalized, science-backed nutrition plans.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => {
                    setSelectedService('General Consultation');
                    setAppointmentOpen(true);
                  }}
                  className="bg-nutricare-green hover:bg-nutricare-green-dark text-white py-3 px-8 rounded-full font-medium transition-colors"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Appointment
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        selectedService={selectedService}
      />

      <ReadMoreModal
        isOpen={readMoreOpen}
        onClose={() => setReadMoreOpen(false)}
        title={selectedServiceContent.title}
        content={selectedServiceContent.content}
      />
    </div>
  )
}

export default NutritionServices
