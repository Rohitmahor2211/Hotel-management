import { useEffect } from 'react';

export function useScrollEffects() {
  useEffect(() => {
    const toggleScrolled = () => {
      const header = document.getElementById('header');
      if (!header) return;

      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    const toggleScrollTop = () => {
      const scrollTopBtn = document.getElementById('scroll-top');
      if (!scrollTopBtn) return;

      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    };

    const scrollToTop = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    // Add scroll listener
    const handleScroll = () => {
      toggleScrolled();
      toggleScrollTop();
    };

    window.addEventListener('scroll', handleScroll);

    // Add click listener to scroll-top button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', scrollToTop);
    }

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTopBtn) {
        scrollTopBtn.removeEventListener('click', scrollToTop);
      }
    };
  }, []);
}

