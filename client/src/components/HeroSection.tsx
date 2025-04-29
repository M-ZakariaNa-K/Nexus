import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import ThreeScene from './ThreeScene';
import ScrollIndicator from './ScrollIndicator';
import SplineObject from './SplineObject';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <ThreeScene type="hero" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h1 className="font-poppins font-bold text-5xl sm:text-6xl md:text-7xl leading-tight">
              <span className=''>Innovative</span>{' '}
              <span className="text-red-700 bg-gradient-to-r from-white to-[#02ECD1] text-transparent bg-clip-text">
                Software
              </span>{' '}
              <span>Solutions</span>
            </h1>
            <p className="mt-6 text-gray-300 text-lg max-w-xl">
              Nexus is a software development company specializing in innovative and efficient technology solutions.
              We provide end-to-end services that cater to startups and enterprises.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90 rounded-full font-montserrat font-semibold text-lg transition-transform hover:scale-105 shadow-lg shadow-[#02ECD1]/20"
                asChild
              >
                <a href="#projects">Our Work</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#02ECD1] text-[#02ECD1] hover:bg-[#02ECD1]/10 rounded-full font-montserrat font-semibold text-lg"
                asChild
              >
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <SplineObject />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#02ECD1]/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-[#02ECD1]/10 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
