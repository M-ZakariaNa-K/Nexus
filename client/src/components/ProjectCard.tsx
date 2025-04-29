import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'wouter';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      variants={item}
      className="bg-[#171717] rounded-xl overflow-hidden shadow-md"
      whileHover={{ 
        y: -10,
        boxShadow: "0 15px 30px rgba(2, 236, 209, 0.2)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-poppins font-semibold text-[#02ECD1]">{project.title}</h3>
        <p className="text-gray-400 mt-2">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-[#02ECD1]/10 text-[#02ECD1] px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <Button
            variant="link"
            className="text-[#02ECD1] font-montserrat text-sm p-0 hover:text-[#02ECD1]/90 hover:underline"
            asChild
          >
            <Link href={`/project/${project.id}`}>View Details</Link>
          </Button>
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#02ECD1] transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
