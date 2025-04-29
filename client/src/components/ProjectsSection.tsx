import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Button } from '../components/ui/button';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Default projects if none are provided from the API
  const defaultProjects = [
    {
      id: '1',
      title: 'SEAMSAAR',
      description: 'A one-stop online platform for car and real estate rentals in Syria, providing easy search and booking options.',
      image: 'https://images.unsplash.com/photo-1534531173927-aeb928d54385?auto=format&fit=crop&w=800&q=80',
      tags: ['Web Platform', 'Booking System']
    },
    {
      id: '2',
      title: 'KANZ AL-DHAKEREEN',
      description: 'A free, ad-free app designed to help users easily incorporate daily remembrance (dhikr) and supplications (dua) into their routine.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      tags: ['Mobile App', 'Religious']
    },
    {
      id: '3',
      title: 'CARK',
      description: 'A comprehensive platform for showcasing and selling cars, featuring location-based car listings for a more convenient search experience.',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
      tags: ['E-commerce', 'Automotive']
    },
    {
      id: '4',
      title: 'ALNORIYA',
      description: 'A Hadith recitation management app for Al-Nouria School in Damascus. Teachers record recitations, students track results & rankings.',
      image: 'https://images.unsplash.com/photo-1539788816080-8bdd722d8c22?auto=format&fit=crop&w=800&q=80',
      tags: ['Education', 'Management']
    },
    {
      id: '5',
      title: 'ANNAK',
      description: 'Delivery management system for Rural Damascus: Includes restaurant, customer, and driver apps, plus an admin dashboard for smooth operations.',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
      tags: ['Delivery', 'Management']
    },
    {
      id: '6',
      title: 'NABD',
      description: 'An app for Nabd Home Healthcare Center in Saudi Arabia, allowing users to request services such as doctor visits, home nursing, and lab tests.',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
      tags: ['Healthcare', 'Service']
    },
    {
      id: '7',
      title: 'CURE',
      description: 'An app for medical students in Syria, allowing them to browse, read, or listen to their lectures and subscribe to codes to activate the courses.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      tags: ['Education', 'Medical']
    },
    {
      id: '8',
      title: 'BE HEALTHY',
      description: 'An internal system that tracks restaurant bags using QR code scanning, identifying the current status and location of each bag.',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
      tags: ['Tracking', 'Food Industry']
    },
    {
      id: '9',
      title: 'TADALAL',
      description: 'A delivery system in Kuwait that allows restaurants and stores to manage orders seamlessly, providing users with a convenient ordering experience.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      tags: ['Delivery', 'Food']
    },
    {
      id: '10',
      title: 'ALHADARA',
      description: 'An app for managing the staff, administrators, and classrooms of Al-Hadara Institute in Damascus, enabling efficient management of daily operations.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      tags: ['Management', 'Education']
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const displayedProjects = displayProjects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < displayProjects.length;

  const showMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, displayProjects.length));
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-4xl font-poppins font-bold"
          >
            Our <span className="text-[#02ECD1]">Projects</span>
          </motion.h2>
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="w-24 h-1 bg-[#02ECD1] mx-auto mt-4 rounded-full"
          />
          <motion.p
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-300 max-w-2xl mx-auto"
          >
            Explore our portfolio of successful projects that showcase our expertise and innovation.
          </motion.p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            <motion.div
              variants={container}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex gap-6"
            >
              {displayedProjects.map((project, index) => (
                <div key={project.id} className="flex-shrink-0 w-full sm:w-[350px] md:w-[380px] snap-center">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="absolute left-0 top-1/2 bottom-0 w-10 bg-gradient-to-r from-[#171717] to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-1/2 bottom-0 w-10 bg-gradient-to-l from-[#171717] to-transparent pointer-events-none"></div>
        </div>
        
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button 
              onClick={showMoreProjects}
              variant="outline" 
              className="border-2 border-[#02ECD1] text-[#02ECD1] hover:bg-[#02ECD1] hover:text-[#0C0C0C] transition-colors rounded-full font-montserrat font-semibold"
            >
              View More Projects
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
