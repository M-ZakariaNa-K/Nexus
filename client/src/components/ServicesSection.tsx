import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceCard from './ServiceCard';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Default services if none are provided from the API
  const defaultServices = [
    {
      id: '1',
      title: 'Custom Software Development',
      description: 'Tailored solutions designed to meet your specific business requirements and objectives with cutting-edge technologies.',
      icon: 'Code'
    },
    {
      id: '2',
      title: 'Mobile App Development',
      description: 'Create engaging, high-performance native and cross-platform mobile applications for iOS and Android devices.',
      icon: 'Smartphone'
    },
    {
      id: '3',
      title: 'Web Development',
      description: 'Design and develop responsive, user-friendly websites and web applications with modern technologies.',
      icon: 'Globe'
    },
    {
      id: '4',
      title: 'UI/UX Design',
      description: 'Create intuitive, visually appealing interfaces that provide exceptional user experiences and drive engagement.',
      icon: 'Palette'
    },
    {
      id: '5',
      title: 'API Development & Integration',
      description: 'Build scalable APIs and integrate third-party services to enhance your application\'s functionality.',
      icon: 'LineChart'
    },
    {
      id: '6',
      title: 'DevOps & Cloud Services',
      description: 'Implement DevOps practices and leverage cloud platforms to ensure efficient development and deployment.',
      icon: 'Cloud'
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-poppins font-bold"
          >
            Our <span className="text-[#02ECD1]">Services</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-24 h-1 bg-[#02ECD1] mx-auto mt-4 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-gray-300 max-w-2xl mx-auto"
          >
            We provide end-to-end services that cater to startups and enterprises, delivering high-performance digital experiences with exceptional design.
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {displayServices.map((service, index) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard service={service} delay={index * 0.1} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
