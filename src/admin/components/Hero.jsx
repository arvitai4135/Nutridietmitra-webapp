import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => (
  <section className="bg-nutri-purple text-white py-20">
    <div className="container mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        Welcome to NutriDietMitra
      </motion.h1>
      <p className="text-lg md:text-xl mb-8">Eat Smart, Live Smart!</p>
      <div className="space-x-4">
        <Link to="/booking">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-nutri-green text-white px-6 py-3 rounded-lg"
          >
            Book Consultation
          </motion.button>
        </Link>
        <Link to="/ecommerce">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-nutri-purple px-6 py-3 rounded-lg"
          >
            Explore Plans
          </motion.button>
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;

