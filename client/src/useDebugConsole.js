import { useEffect } from 'react';

export function useDebugConsole() {
  useEffect(() => {
    // Log when component mounts
    // console.log('✅ React App Initialized');
    // console.log('✅ DOM Root:', document.getElementById('root'));
    // console.log('✅ Header Element:', document.getElementById('header'));
    // console.log('✅ Hero Section:', document.getElementById('hotel-hero'));
    // console.log('✅ Footer Element:', document.getElementById('footer'));
    // console.log('✅ Scroll Top Button:', document.getElementById('scroll-top'));

    // // Log external library availability
    // console.log('✅ AOS Available:', !!window.AOS);
    // console.log('✅ PureCounter Available:', !!window.PureCounter);
    // console.log('✅ GLightbox Available:', !!window.GLightbox);
    // console.log('✅ Swiper Available:', !!window.Swiper);

    // Check CSS is loaded
    const mainCSS = document.querySelector('link[href*="main.css"]');
    // console.log('✅ Main CSS Loaded:', !!mainCSS);

    // Check Bootstrap CSS
    const bootstrapCSS = document.querySelector('link[href*="bootstrap"]');
    // console.log('✅ Bootstrap CSS Loaded:', !!bootstrapCSS);

    // List all loaded stylesheets
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    // console.log('✅ Stylesheets loaded:', stylesheets.length);

    // Listen for any runtime errors
    const handleError = (event) => {
      // console.error('❌ Runtime Error:', event.error);
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);
}
