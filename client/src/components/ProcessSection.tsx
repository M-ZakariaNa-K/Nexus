import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const processSteps = [
    {
      number: 1,
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, target audience, and project requirements through in-depth consultation.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
    },
    {
      number: 2,
      title: "Design & Prototyping",
      description: "Our design team creates intuitive user interfaces and experiences that align with your brand and project goals.",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=800&q=80"
    },
    {
      number: 3,
      title: "Development",
      description: "Our skilled developers build your solution using the latest technologies and following industry best practices.",
      image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80"
    },
    {
      number: 4,
      title: "Testing & Quality Assurance",
      description: "Rigorous testing ensures your solution is bug-free, secure, and performs optimally across all platforms.",
      image: "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?auto=format&fit=crop&w=800&q=80"
    },
    {
      number: 5,
      title: "Deployment & Support",
      description: "We handle the deployment process and provide ongoing support to ensure your solution continues to meet your needs.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="process" 
      ref={sectionRef}
      className="py-24 bg-[#171717] relative overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)"
      }}
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
            Our <span className="text-[#02ECD1]">Process</span>
          </motion.h2>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-24 h-1 bg-[#02ECD1] mx-auto mt-4 rounded-full"
          />
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-gray-300 max-w-2xl mx-auto"
          >
            Our proven development process ensures efficient delivery of high-quality solutions tailored to your specific needs.
          </motion.p>
        </div>
        
        <div className="relative mt-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#02ECD1]/30 hidden md:block" />
          
          <div className="grid grid-cols-1 gap-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeIn}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 items-center`}
              >
                <div className={`md:col-span-2 order-2 ${step.number % 2 === 0 ? 'md:order-3' : 'md:order-1'}`}>
                  <div className="bg-[#171717] p-6 rounded-lg">
                    <h3 className="text-xl font-poppins font-semibold text-[#02ECD1] mb-3">
                      {step.number}. {step.title}
                    </h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
                
                <div className="md:col-span-1 flex justify-center order-1 md:order-2">
                  <div className="w-12 h-12 bg-[#02ECD1] rounded-full flex items-center justify-center z-10">
                    <span className="font-poppins font-bold text-[#171717]">{step.number}</span>
                  </div>
                </div>
                
                <div className={`md:col-span-2 order-3 ${step.number % 2 === 0 ? 'md:order-1' : 'md:order-3'}`}>
                  <div className="rounded-lg shadow-lg w-full h-48 md:h-56 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#02ECD1]/10 to-[#171717]/70 z-10" />
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
