// components/Hero.jsx with responsive design
import React from 'react';

const Hero = () => {
  return (
    <section 
      className="relative py-16 md:py-24 lg:py-32 bg-cover bg-center min-h-[60vh]"
      style={{ 
        backgroundImage: 'url(/path-to-your-image.jpg)' // Replace with your actual image path
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          Premium Rental Spaces at Pullanoor Land Mark
        </h1>
        <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
          Discover the perfect space for your business, family, or storage needs.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-md font-medium transition-colors text-sm md:text-base">
          Explore Our Properties
        </button>
      </div>
    </section>
  );
};

export default Hero;