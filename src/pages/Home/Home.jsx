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
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Home/Hero section with id="home" */}
      <section id="home">
        <Hero />
      </section>
      
      {/* Buildings section with id="buildings" */}
      <section id="buildings">
        <Buildings />
      </section>
      
      {/* Rental Spaces section with id="rental-spaces" */}
      <section id="rental-spaces">
        <VacantRooms />
      </section>
      
      {/* Contact section with id="contact" */}
      <section id="contact">
        <Contact />
      </section>
      
      <Footer/>
    </div>
  );
};

export default Home;