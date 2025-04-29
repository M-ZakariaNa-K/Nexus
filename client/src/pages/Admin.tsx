import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/motion';

const Admin = () => {
  const [, setLocation] = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/auth/check'],
    retry: false,
  });

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (data && data) {
      // if (data && data.authenticated) {
      setLocation('/dashboard');
    }
  }, [data, setLocation]);

  const handleLoginClick = () => {
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#171717] mb-8">
            <Lock className="h-12 w-12 text-[#02ECD1]" />
          </div>

          <h1 className="text-4xl font-poppins font-bold mb-6">
            Admin <span className="text-[#02ECD1]">Access</span>
          </h1>

          <p className="text-gray-300 mb-10 text-lg">
            This area is restricted to authorized personnel only. Please log in with your credentials to access the admin dashboard and manage site content.
          </p>

          <div className="flex justify-center space-x-6">
            <Button
              size="lg"
              className="bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90 rounded-full font-montserrat font-semibold text-lg transition-transform hover:scale-105 shadow-lg shadow-[#02ECD1]/20"
              onClick={handleLoginClick}
            >
              Log In
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-[#02ECD1] text-[#02ECD1] hover:bg-[#02ECD1]/10 rounded-full font-montserrat font-semibold text-lg"
              onClick={() => setLocation('/')}
            >
              Back to Website
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto mt-24 rounded-xl overflow-hidden"
        >
          <div className="bg-[#171717] p-8 rounded-xl">
            <h2 className="text-2xl font-poppins font-semibold mb-6 text-center">
              Admin Dashboard Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#171717] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#02ECD1] mb-3">Content Management</h3>
                <p className="text-gray-300">Update website content including services, projects, and testimonials.</p>
              </div>

              <div className="bg-[#171717] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#02ECD1] mb-3">Image Gallery</h3>
                <p className="text-gray-300">Upload, organize, and manage project images and galleries.</p>
              </div>

              <div className="bg-[#171717] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#02ECD1] mb-3">Contact Messages</h3>
                <p className="text-gray-300">View and respond to messages submitted through the contact form.</p>
              </div>

              <div className="bg-[#171717] p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#02ECD1] mb-3">Analytics Overview</h3>
                <p className="text-gray-300">Monitor website traffic, user engagement, and content performance.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
