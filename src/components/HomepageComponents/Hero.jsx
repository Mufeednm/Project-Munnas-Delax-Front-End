// components/Hero.jsx with background image
import React from 'react';

const Hero = () => {
  return (
    <section 
      className="relative py-32 bg-cover bg-center"
      style={{ 
        backgroundImage: 'url(/path-to-your-image.jpg)' // Replace with your actual image path
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-6">
          Premium Rental Spaces at Pullanoor Land Mark
        </h1>
        <p className="text-xl mb-8">
          Discover the perfect space for your business, family, or storage needs.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
          Explore Our Properties
        </button>
      </div>
    </section>
  );
};

export default Hero;