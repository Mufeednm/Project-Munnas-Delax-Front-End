// components/Header.jsx
import React from 'react';

const Header = () => {
  // Scroll to section with smooth animation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span>Pullanoor</span>
          <span className="text-yellow-400">Land Mark</span>
        </div>
        
        <nav>
          <ul className="flex space-x-8">
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
    </header>
  );
};

export default Header;