import { useEffect } from 'react';

export function useComponentInitialization() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
      window.AOS.refresh();
    }

    // Initialize PureCounter
    if (window.PureCounter) {
      new window.PureCounter();
    }

    // Initialize GLightbox if available
    if (window.GLightbox) {
      window.GLightbox({
        selector: '.glightbox',
      });
    }

    // Initialize Swiper if available
    if (window.Swiper) {
      const swipers = document.querySelectorAll('.swiper');
      swipers.forEach(() => {
        new window.Swiper('.swiper', {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
      });
    }

    // Cleanup
    return () => {
      if (window.AOS) {
        window.AOS.refresh();
      }
    };
  }, []);
}
