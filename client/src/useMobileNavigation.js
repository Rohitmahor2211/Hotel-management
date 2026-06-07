import { useEffect } from 'react';

export function useMobileNavigation() {
  useEffect(() => {
    const navMenu = document.getElementById('navmenu');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

    if (!navMenu || !mobileNavToggle) return;

    const handleToggleClick = () => {
      navMenu.classList.toggle('active');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
    };

    const handleNavLinkClick = () => {
      navMenu.classList.remove('active');
      mobileNavToggle.classList.add('bi-list');
      mobileNavToggle.classList.remove('bi-x');
    };

    mobileNavToggle.addEventListener('click', handleToggleClick);

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', handleNavLinkClick);
    });

    return () => {
      mobileNavToggle.removeEventListener('click', handleToggleClick);
      navLinks.forEach((link) => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, []);
}

