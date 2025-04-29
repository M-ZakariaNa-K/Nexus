import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Twitter, GitPullRequest, Linkedin, Facebook, ChevronRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import logoImage from '../assets/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const [currentYear, setCurrentYear] = useState('');
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll now receive our latest updates.",
      });
      setEmail('');
    }
  };

  const services = [
    { name: 'Custom Software Development', href: '#' },
    { name: 'Mobile App Development', href: '#' },
    { name: 'Web Development', href: '#' },
    { name: 'UI/UX Design', href: '#' },
    { name: 'API Development & Integration', href: '#' }
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#' }
  ];

  return (
    <footer className="bg-[#171717] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/">
              <a className="flex items-center mb-6">
                <img src={logoImage} alt="Nexus Agency Logo" className="h-14 w-auto" />
              </a>
            </Link>
            <p className="text-gray-400 mb-6">
              Innovative software development company specializing in efficient technology solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#02ECD1] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#02ECD1] transition-colors">
                <GitPullRequest className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#02ECD1] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#02ECD1] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-poppins font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="text-gray-400 hover:text-[#02ECD1] transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="h-4 w-4 text-[#02ECD1] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-poppins font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-[#02ECD1] transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="h-4 w-4 text-[#02ECD1] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-poppins font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to receive updates on our latest projects and services.</p>
            <form onSubmit={handleSubscribe}>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0C0C0C] border border-gray-600 rounded-l-lg py-3 px-4 w-full text-white focus:outline-none focus:ring-2 focus:ring-[#02ECD1] focus:border-transparent"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-[#02ECD1] text-[#0C0C0C] px-4 rounded-r-lg hover:bg-opacity-90 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; {currentYear} Nexus Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
