import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 1.5,
        repeat: Infinity,
        repeatType: 'reverse'
      }}
    >
      <ChevronDown className="h-8 w-8 text-[#02ECD1]" />
    </motion.div>
  );
};

export default ScrollIndicator;
