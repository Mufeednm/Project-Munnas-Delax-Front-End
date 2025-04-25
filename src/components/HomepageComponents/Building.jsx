// components/HomepageComponents/Building.jsx
import React, { useState, useEffect } from 'react';
import { getAllbuildings } from '../../api/Homeapi';
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
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">Our Premium Buildings</h1>
      
      {buildings.length === 0 || !buildings.building ? (
        <p className="text-center text-lg md:text-xl">No buildings available at the moment.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {buildings.building.map((building) => (
            <div 
              key={building.id} 
              className="flex-1 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={building.image || '/placeholder-building.jpg'} 
                  alt={building.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Featured
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{building.name}</h3>
                <p className="text-gray-600 mb-6">{building.description}</p>
                
                <div className="mt-4">
                  <button
                    onClick={() => handleViewDetails(building.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};  

export default Buildings;