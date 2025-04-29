import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-[#171717]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            className="text-4xl font-poppins font-bold"
          >
            About <span className="text-[#02ECD1]">Nexus</span>
          </motion.h2>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-24 h-1 bg-[#02ECD1] mx-auto mt-4 rounded-full"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-3xl font-poppins font-semibold mb-6">
              We Transform Ideas Into <span className="text-[#02ECD1]">Digital Reality</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Nexus is a software development company specializing in innovative and efficient technology solutions. 
              We provide end-to-end services that cater to startups and enterprises, delivering high-performance 
              digital experiences with exceptional design.
            </p>
            <p className="text-gray-300 mb-6">
              Our commitment to quality and professionalism ensures that every solution we create meets the highest 
              industry standards.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex flex-col items-center text-center p-4 bg-[#171717] rounded-lg">
                <span className="text-4xl font-poppins font-bold text-[#02ECD1]">12+</span>
                <span className="text-gray-300 mt-2">Projects Completed</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-[#171717] rounded-lg">
                <span className="text-4xl font-poppins font-bold text-[#02ECD1]">5+</span>
                <span className="text-gray-300 mt-2">Years Experience</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="rounded-lg shadow-2xl w-full h-[350px] bg-[#171717]/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#171717]/20 to-[#171717]/90 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern tech workspace" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#02ECD1] rounded-md rotate-12 z-0" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#02ECD1] rounded-md -rotate-12 z-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
