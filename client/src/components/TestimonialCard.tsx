import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    company: string;
    image: string;
    rating: number;
    content: string;
  };
  isVisible: boolean;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isVisible, delay }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="bg-[#171717] p-8 rounded-xl h-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-poppins font-semibold text-white">{testimonial.name}</h4>
          <p className="text-gray-400 text-sm">{testimonial.company}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className="h-5 w-5" 
              fill={i < testimonial.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>
      
      <p className="text-gray-300">
        "{testimonial.content}"
      </p>
    </motion.div>
  );
};

export default TestimonialCard;
