// pages/Home/Home.jsx
import React from 'react';
import Header from '../../components/HomepageComponents/Header';
import Hero from '../../components/HomepageComponents/Hero.jsx';
import Buildings from '../../components/HomepageComponents/Building.jsx';
import VacantRooms from '../../components/HomepageComponents/VacantRooms.jsx';
import Contact from '../../components/HomepageComponents/Contact.jsx';
import Footer from '../../components/HomepageComponents/Footer.jsx';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Header />
      
      {/* Home/Hero section with id="home" */}
      <section id="home" className="w-full px-4 md:px-0 lg:px-0">
        <Hero />
      </section>
      
      {/* Buildings section with id="buildings" */}
      <section id="buildings" className="w-full px-4 md:px-0 lg:px-0 py-8 md:py-12">
        <Buildings />
      </section>
      
      {/* Rental Spaces section with id="rental-spaces" */}
      <section id="rental-spaces" className="w-full px-4 md:px-0 lg:px-0 py-8 md:py-12">
        <VacantRooms />
      </section>
      
      {/* Contact section with id="contact" */}
      <section id="contact" className="w-full px-2 md:px-0 lg:px-0 py-8 md:py-12">
        <Contact />
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;