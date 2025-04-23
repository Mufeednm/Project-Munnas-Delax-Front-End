// components/Header.jsx
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to section with smooth animation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close the mobile menu after clicking a link
    setIsMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold">
          <span>Pullanoor</span>
          <span className="text-yellow-400">Land Mark</span>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // X icon for close
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            // Hamburger icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-8">
            <li>
              <a 
                href="#home" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('home');
                }}
                className="hover:text-yellow-400 transition-colors cursor-pointer"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#buildings" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('buildings');
                }}
                className="hover:text-yellow-400 transition-colors cursor-pointer"
              >
                Buildings
              </a>
            </li>
            <li>
              <a 
                href="#rental-spaces" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('rental-spaces');
                }}
                className="hover:text-yellow-400 transition-colors cursor-pointer"
              >
                Rental Spaces
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="hover:text-yellow-400 transition-colors cursor-pointer"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile navigation - slide down when open */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 py-4 px-4 absolute left-0 right-0 shadow-lg">
          <ul className="flex flex-col space-y-4">
            <li>
              <a 
                href="#home" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('home');
                }}
                className="hover:text-yellow-400 transition-colors cursor-pointer block"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#buildings" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('buildings');
                }}
                className="hover:text-yellow-400 transition-colors cursor-pointer block"
              >
                Buildings
              </a>
            </li>
            <li>
              <a 
                href="#rental-spaces" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('rental-spaces');
                }}
                className="hover:text-yellow-400 transition-colors cursor-pointer block"
              >
                Rental Spaces
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="hover:text-yellow-400 transition-colors cursor-pointer block"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;