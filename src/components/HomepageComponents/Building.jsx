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
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-xl">Loading buildings...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Buildings</h1>
      {buildings.length === 0 || !buildings.building ? (
        <p className="text-center text-xl">No buildings available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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