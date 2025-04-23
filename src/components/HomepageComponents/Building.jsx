// components/HomepageComponents/Building.jsx
import React, { useState, useEffect } from 'react';
import { getAllbuildings } from '../../api/Homeapi';
import BuildingCard from './BuildingsCard';
import { useNavigate } from 'react-router-dom';

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getBuildings = async () => {
      try {
        setLoading(true);
        const data = await getAllbuildings();
        console.log("in Building", data);
        setBuildings(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load buildings');
        setLoading(false);
      }
    };

    getBuildings();
  }, []);

  const handleViewDetails = (buildingId) => {
    // Navigate to the building details page with the building ID
    navigate(`/buildings/${buildingId}`);
  };

  if (loading) return (
    <div className="flex justify-center items-center py-16">
      <div className="animate-pulse flex space-x-2">
        <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
        <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
        <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
      </div>
      <p className="text-lg ml-3">Loading buildings...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center py-16">
      <p className="text-red-500 text-lg md:text-xl">{error}</p>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center">Our Buildings</h1>
      {buildings.length === 0 || !buildings.building ? (
        <p className="text-center text-lg md:text-xl">No buildings available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {buildings.building.map((building) => (
            <BuildingCard 
              key={building.id} 
              name={building.name} 
              image={building.image} 
              description={building.description}
              onViewDetails={() => handleViewDetails(building.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};  

export default Buildings;