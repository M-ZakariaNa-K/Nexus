import { ReactNode, useEffect } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      if (!targetElement) return;
      
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Add CSS for smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return <>{children}</>;
};

export default SmoothScroll;
