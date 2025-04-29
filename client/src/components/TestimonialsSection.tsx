import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import { Button } from '../components/ui/button';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  image: string;
  rating: number;
  content: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Default testimonials if none are provided from the API
  const defaultTestimonials = [
    {
      id: '1',
      name: 'Ahmad Khalil',
      company: 'CEO, Seamsaar',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: 'The Nexus team delivered an exceptional platform that exceeded our expectations. Their attention to detail and commitment to quality resulted in a user-friendly solution that has significantly improved our business operations.'
    },
    {
      id: '2',
      name: 'Sara Al-Ahmed',
      company: 'Product Manager, Nabd Healthcare',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: 'Working with Nexus was a game-changer for our healthcare platform. They understood our specific needs and delivered a secure, user-friendly app that has transformed how we connect with patients.'
    },
    {
      id: '3',
      name: 'Mohammed Farhat',
      company: 'Founder, CarK',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: 'Nexus turned our vision into reality with CarK platform. Their technical expertise and innovative approach created a seamless experience for our users, resulting in increased engagement and sales.'
    }
  ];
  
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;
  
  const getScreenSize = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  
  const slideWidth = 100 / getScreenSize();
  const maxSlides = Math.max(0, displayTestimonials.length - getScreenSize());
  
  const nextSlide = () => {
    setActiveIndex(prev => (prev < maxSlides ? prev + 1 : 0));
  };
  
  const prevSlide = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : maxSlides));
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-4xl font-poppins font-bold"
          >
            Client <span className="text-[#02ECD1]">Testimonials</span>
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
            What our clients say about our services and solutions.
          </motion.p>
        </div>
        
        <div className="relative testimonial-slider">
          <div 
            className="flex overflow-hidden"
            style={{
              transform: `translateX(-${activeIndex * slideWidth}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {displayTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-4"
                style={{ 
                  minWidth: `${slideWidth}%`
                }}
              >
                <TestimonialCard testimonial={testimonial} isVisible={isInView} delay={index * 0.1} />
              </div>
            ))}
          </div>
          
          {displayTestimonials.length > getScreenSize() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center mt-8 gap-4"
            >
              <Button
                onClick={prevSlide}
                size="icon"
                variant="outline"
                className="w-12 h-12 rounded-full border border-[#02ECD1] text-[#02ECD1] hover:bg-[#02ECD1] hover:text-[#0C0C0C]"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={nextSlide}
                size="icon"
                variant="outline"
                className="w-12 h-12 rounded-full border border-[#02ECD1] text-[#02ECD1] hover:bg-[#02ECD1] hover:text-[#0C0C0C]"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
