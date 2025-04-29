import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import ProcessSection from "../components/ProcessSection";
import ProjectsSection from "../components/ProjectsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: projects } = useQuery({
    queryKey: ['/api/projects'],
  });

  const { data: services } = useQuery({
    queryKey: ['/api/services'],
  });

  const { data: testimonials } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  useEffect(() => {
    document.title = "Nexus Agency - Innovative Software Solutions";
  }, []);

  return (
    <div className="font-inter text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services || []} />
      <ProcessSection />
      <ProjectsSection projects={projects || []} />
      <TestimonialsSection testimonials={testimonials || []} />
      <ContactSection />
      <Footer />
    </div>
  );
}
