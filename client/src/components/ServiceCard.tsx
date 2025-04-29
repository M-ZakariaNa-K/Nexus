import { motion } from 'framer-motion';
import {
  Code,
  Smartphone,
  Globe,
  Palette,
  LineChart,
  Cloud,
  ShieldCheck,
  Database
} from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, delay }) => {
  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-8 w-8 text-[#02ECD1]" };
    
    switch (iconName) {
      case 'Code':
        return <Code {...iconProps} />;
      case 'Smartphone':
        return <Smartphone {...iconProps} />;
      case 'Globe':
        return <Globe {...iconProps} />;
      case 'Palette':
        return <Palette {...iconProps} />;
      case 'LineChart':
        return <LineChart {...iconProps} />;
      case 'Cloud':
        return <Cloud {...iconProps} />;
      case 'ShieldCheck':
        return <ShieldCheck {...iconProps} />;
      case 'Database':
        return <Database {...iconProps} />;
      default:
        return <Code {...iconProps} />;
    }
  };

  return (
    <motion.div 
      className="bg-[#171717] p-8 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-[#02ECD1]/20"
      whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(2, 236, 209, 0.2)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 flex items-center justify-center bg-[#02ECD1]/10 rounded-lg mb-6">
        {getIcon(service.icon)}
      </div>
      <h3 className="text-xl font-poppins font-semibold mb-4">{service.title}</h3>
      <p className="text-gray-400">{service.description}</p>
    </motion.div>
  );
};

export default ServiceCard;
