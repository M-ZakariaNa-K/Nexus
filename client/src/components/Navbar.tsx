import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import logoImage from '../assets/Logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'About', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 ${isScrolled
          ? 'bg-[#0C0C0C]/90 backdrop-blur-md border-b border-[#171717]'
          : 'bg-transparent'
        } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/">
            <a className="flex items-center cursor-pointer">
              <img src={logoImage} alt="Nexus Agency Logo" className="h-12 w-auto" />
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="font-montserrat text-sm hover:text-[#02ECD1] transition-colors"
              >
                {link.title}
              </a>
            ))}
            <Button className="bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90 rounded-full font-montserrat font-semibold text-sm transition-transform hover:scale-105">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#02ECD1]"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0C0C0C] border-b border-[#171717]"
          >
            <div className="px-4 py-5 space-y-5">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block font-montserrat text-base hover:text-[#02ECD1] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}
              <Button className="w-full bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90 rounded-full font-montserrat font-semibold text-sm">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
