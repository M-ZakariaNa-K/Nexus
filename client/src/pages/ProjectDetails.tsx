import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fadeIn } from '../lib/motion';

const ProjectDetails = () => {
  const [, params] = useRoute('/project/:id');
  const projectId = params?.id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const { data: project } = useQuery({
    queryKey: ['/api/projects', projectId],
  });

  // Fallback data if API doesn't return a project
  const fallbackProject = {
    id: projectId,
    title: projectId === '1' ? 'SEAMSAAR' :
      projectId === '2' ? 'KANZ AL-DHAKEREEN' :
        projectId === '3' ? 'CARK' : 'Project',
    description: projectId === '1' ? 'A one-stop online platform for car and real estate rentals in Syria, providing easy search and booking options. It also includes a travel guide section featuring Syria\'s best tourist spots, serving as a useful tool for locals and tourists alike.' :
      projectId === '2' ? 'A free, ad-free app designed to help you easily incorporate daily remembrance (dhikr) and supplications (dua) into your routine. With a simple and elegant interface, it serves as a spiritual companion, bringing peace and enlightenment to your heart and soul through consistent devotion.' :
        projectId === '3' ? 'A comprehensive platform for showcasing and selling cars, featuring location-based car listings for a more convenient search experience. It also supports paid advertisements to highlight listings and accelerate sales.' :
          'Project description is unavailable.',
    fullDescription: 'This project was designed to meet specific client needs and leverages modern technology to deliver a seamless user experience. Our team worked closely with stakeholders to ensure all requirements were met, and the final product exceeded expectations.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    features: [
      'User authentication and authorization',
      'Responsive design for all device sizes',
      'Advanced search and filtering capabilities',
      'Real-time notifications',
      'Integration with third-party APIs',
      'Admin dashboard for content management'
    ],
    challenge: 'One of the main challenges was implementing a robust real-time notification system that works across different devices and platforms.',
    solution: 'We implemented WebSockets to ensure real-time communication and used a queue-based architecture to handle message delivery and persistence.',
    image: projectId === '1' ? 'https://images.unsplash.com/photo-1534531173927-aeb928d54385?auto=format&fit=crop&w=800&q=80' :
      projectId === '2' ? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' :
        projectId === '3' ? 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80' :
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535074153497-b08c5aa9fa3e?auto=format&fit=crop&w=800&q=80',
    ],
    client: projectId === '1' ? 'Seamsaar Company' :
      projectId === '2' ? 'Islamic Foundation' :
        projectId === '3' ? 'CarK Inc.' : 'Client name unavailable',
    tags: projectId === '1' ? ['Web Platform', 'Booking System'] :
      projectId === '2' ? ['Mobile App', 'Religious'] :
        projectId === '3' ? ['E-commerce', 'Automotive'] :
          ['Technology', 'Software'],
    date: '2023',
    link: 'https://example.com'
  };

  const displayProject = project || fallbackProject;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#02ECD1]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[#171717] top-0 bottom-1/3 shadow-md"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            <Link href="/#projects">
              <a className="inline-flex items-center text-gray-300 hover:text-[#02ECD1] mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </a>
            </Link>

            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">{displayProject.title}</h1>

            <p className="text-gray-300 text-lg mb-8">{displayProject.description}</p>

            <div className="flex flex-wrap gap-2 mb-12">
              {displayProject.tags.map((tag, index) => (
                <span key={index} className="bg-[#02ECD1]/10 text-[#02ECD1] px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Image */}
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-20"
      >
        <div className="rounded-xl overflow-hidden shadow-2xl shadow-[#02ECD1]/10 max-w-5xl mx-auto">
          <img
            src={displayProject.image}
            alt={displayProject.title}
            className="w-full h-auto object-cover aspect-video"
          />
        </div>
      </motion.div>

      {/* Project Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            variants={fadeIn('right', 0.3)}
            initial="hidden"
            animate="visible"
            className="md:col-span-2"
          >
            <h2 className="text-2xl font-poppins font-semibold mb-6">About the Project</h2>
            <div className="text-gray-300 space-y-4">
              <p>{displayProject.fullDescription}</p>

              <h3 className="text-xl font-poppins font-semibold mt-8 mb-4 text-white">The Challenge</h3>
              <p>{displayProject.challenge}</p>

              <h3 className="text-xl font-poppins font-semibold mt-8 mb-4 text-white">Our Solution</h3>
              <p>{displayProject.solution}</p>

              <h3 className="text-xl font-poppins font-semibold mt-8 mb-4 text-white">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                {displayProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn('left', 0.3)}
            initial="hidden"
            animate="visible"
            className="md:col-span-1"
          >
            <div className="bg-[#171717] p-6 rounded-xl">
              <h3 className="text-xl font-poppins font-semibold mb-6">Project Information</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400">Client</h4>
                  <p className="font-medium">{displayProject.client}</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400">Date</h4>
                  <p className="font-medium">{displayProject.date}</p>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {displayProject.technologies.map((tech, index) => (
                      <span key={index} className="bg-[#171717] px-3 py-1 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {displayProject.link && (
                  <div className="pt-4">
                    <Button
                      className="w-full bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90"
                      asChild
                    >
                      <a href={displayProject.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-[#171717] py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate="visible"
            className="text-3xl font-poppins font-semibold mb-10 text-center"
          >
            Project <span className="text-[#02ECD1]">Gallery</span>
          </motion.h2>

          <motion.div
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {displayProject.gallery.map((image, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={image}
                  alt={`${displayProject.title} Gallery ${index + 1}`}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Next Projects Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-poppins font-semibold mb-6">
            Interested in working with us?
          </h2>
          <p className="text-gray-300 mb-10">
            Let's discuss your project and see how we can help you achieve your business goals with innovative software solutions.
          </p>
          <Button
            size="lg"
            className="bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90 rounded-full font-montserrat font-semibold"
            asChild
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
