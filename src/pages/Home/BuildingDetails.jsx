// pages/BuildingDetails/BuildingDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/HomepageComponents/Header';
import Footer from '../../components/HomepageComponents/Footer';
import BuildingDetailsContent from '../../components/HomepageComponents/BuildingDetailsContent';

const BuildingDetails = () => {
  const { buildingId } = useParams();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <BuildingDetailsContent buildingId={buildingId} />
      </main>
      
      <Footer />
    </div>
  );
};

export default BuildingDetails;