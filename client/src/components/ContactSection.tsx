import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Twitter, GitPullRequest, Linkedin, Facebook } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import ThreeScene from './ThreeScene';
import { apiRequest } from '../lib/queryClient';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Force animation to run when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest('POST', '/api/contact', formData);

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#171717] relative overflow-hidden">
      <div className="absolute inset-0">
        <ThreeScene type="contact" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            animate={isVisible || isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            className="text-4xl font-poppins font-bold"
          >
            Get In <span className="text-[#02ECD1]">Touch</span>
          </motion.h2>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isVisible || isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-24 h-1 bg-[#02ECD1] mx-auto mt-4 rounded-full"
          />
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate={isVisible || isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-gray-300 max-w-2xl mx-auto"
          >
            Ready to transform your ideas into digital reality? Contact us to discuss your project requirements.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isVisible || isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl overflow-hidden"
          >
            <div className="p-8 bg-[#171717] rounded-xl relative border-2 border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:m-[-2px] before:rounded-xl before:bg-gradient-to-r before:from-[#02ECD1] before:to-[#171717]">
              <h3 className="text-2xl font-poppins font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#02ECD1]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#02ECD1]" />
                  </div>
                  <div>
                    <h4 className="text-white font-montserrat font-semibold">Address</h4>
                    <p className="text-gray-400 mt-1">Damascus, Syria</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#02ECD1]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-[#02ECD1]" />
                  </div>
                  <div>
                    <h4 className="text-white font-montserrat font-semibold">Phone</h4>
                    <p className="text-gray-400 mt-1">+963 982 794 689</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#02ECD1]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#02ECD1]" />
                  </div>
                  <div>
                    <h4 className="text-white font-montserrat font-semibold">Email</h4>
                    <p className="text-gray-400 mt-1">info@nexusagency.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-white font-montserrat font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#02ECD1]/10 flex items-center justify-center hover:bg-[#02ECD1]/20 transition-colors">
                    <Twitter className="h-5 w-5 text-[#02ECD1]" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#02ECD1]/10 flex items-center justify-center hover:bg-[#02ECD1]/20 transition-colors">
                    <GitPullRequest className="h-5 w-5 text-[#02ECD1]" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#02ECD1]/10 flex items-center justify-center hover:bg-[#02ECD1]/20 transition-colors">
                    <Linkedin className="h-5 w-5 text-[#02ECD1]" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#02ECD1]/10 flex items-center justify-center hover:bg-[#02ECD1]/20 transition-colors">
                    <Facebook className="h-5 w-5 text-[#02ECD1]" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isVisible || isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="p-8 bg-[#171717] rounded-xl relative border-2 border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:m-[-2px] before:rounded-xl before:bg-gradient-to-r before:from-[#02ECD1] before:to-[#171717]">
              <h3 className="text-2xl font-poppins font-semibold mb-6">Send Message</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-[#0C0C0C] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#02ECD1] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full bg-[#0C0C0C] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#02ECD1] focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full bg-[#0C0C0C] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#02ECD1] focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message"
                  className="w-full bg-[#0C0C0C] border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#02ECD1] focus:border-transparent resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90 py-3 rounded-lg font-montserrat font-semibold transition-transform hover:scale-[1.01]"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
