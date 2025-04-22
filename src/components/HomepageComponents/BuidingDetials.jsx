import React, { useState, useEffect } from 'react';
import { getBuildingById } from '../../api/Homeapi';

const BuildingDetails = ({ buildingId, onBack }) => {
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuildingDetails = async () => {
      try {
        setLoading(true);
        const data = await getBuildingById(buildingId);
        console.log("Building details:", data);
        setBuilding(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching building details:", err);
        setError('Failed to load building details');
        setLoading(false);
      }
    };

    fetchBuildingDetails();
  }, [buildingId]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-xl">Loading building details...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  );

  if (!building) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500 text-xl">Building not found</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-blue-600 hover:underline"
      >
        ← Back to Buildings
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {building.images && building.images.length > 0 && (
          <div className="h-64 md:h-96 overflow-hidden">
            <img 
              src={building.images[0]} 
              alt={building.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{building.name}</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{building.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Address</h2>
              {building.address && (
                <p className="text-gray-700">
                  {building.address.street}, {building.address.city}<br />
                  {building.address.state} - {building.address.pincode}
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Building Details</h2>
              <p className="text-gray-700">Construction Year: {building.constructionYear}</p>
              <p className="text-gray-700">Owner: {building.owner?.name || "Not specified"}</p>
            </div>
          </div>
          
          {building.units && building.units.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Available Units</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Unit Number</th>
                      <th className="py-2 px-4 border-b text-left">Type</th>
                      <th className="py-2 px-4 border-b text-left">Floor</th>
                      <th className="py-2 px-4 border-b text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {building.units.map((unit) => (
                      <tr key={unit._id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{unit.unitNumber}</td>
                        <td className="py-2 px-4 border-b">{unit.unitType}</td>
                        <td className="py-2 px-4 border-b">{unit.floor}</td>
                        <td className="py-2 px-4 border-b">
                          <span className={`px-2 py-1 rounded text-sm ${
                            unit.isOccupied ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {unit.isOccupied ? 'Occupied' : 'Available'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p className="text-gray-700">Owner: {building.owner?.name || "Not specified"}</p>
            {/* Add contact phone/email if available in your data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetails;