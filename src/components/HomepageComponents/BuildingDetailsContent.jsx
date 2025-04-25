// components/BuildingDetails.jsx
import React, { useState, useEffect } from 'react';
import { getBuildingById } from '../../api/Homeapi';
import { useNavigate } from 'react-router-dom';
import UnitRequestModal from './UnitRequest';

const BuildingDetails = ({ buildingId }) => {
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unitStats, setUnitStats] = useState({});
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildingDetails = async () => {
      try {
        setLoading(true);
        const data = await getBuildingById(buildingId);
        console.log("Building details:", data);
        setBuilding(data.data);
        
        // Calculate unit statistics
        if (data.data.units && data.data.units.length > 0) {
          const stats = calculateUnitStats(data.data.units);
          setUnitStats(stats);
          setFilteredUnits(data.data.units);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching building details:", err);
        setError('Failed to load building details');
        setLoading(false);
      }
    };

    fetchBuildingDetails();
  }, [buildingId]);

  useEffect(() => {
    if (building && building.units) {
      if (activeFilter === 'All') {
        setFilteredUnits(building.units);
      } else if (activeFilter === 'Vacant') {
        setFilteredUnits(building.units.filter(unit => unit.status === 'Vacant'));
      } else if (activeFilter === 'Occupied') {
        setFilteredUnits(building.units.filter(unit => unit.status === 'Occupied'));
      } else {
        // Filter by unit type
        setFilteredUnits(building.units.filter(unit => unit.unitType === activeFilter));
      }
    }
  }, [activeFilter, building]);

  const calculateUnitStats = (units) => {
    const stats = {
      total: units.length,
      vacant: 0,
      types: {}
    };

    units.forEach(unit => {
      // Count vacant units
      if (unit.status === 'Vacant') {
        stats.vacant++;
      }

      // Count by unit types
      if (!stats.types[unit.unitType]) {
        stats.types[unit.unitType] = {
          total: 0,
          vacant: 0
        };
      }
      
      stats.types[unit.unitType].total++;
      
      if (unit.status === 'Vacant') {
        stats.types[unit.unitType].vacant++;
      }
    });

    return stats;
  };

  const handleRequestSubmit = async (formData) => {
    // Replace with your actual API call
    console.log("Submitting request:", formData);
    
    // Mock API call (replace with your actual API)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  const handletoback = () => {
    navigate('/');
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-xl text-gray-700">Loading building details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center bg-red-50 p-8 rounded-lg shadow">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-red-500 text-xl font-medium">{error}</p>
      </div>
    </div>
  );

  if (!building) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center bg-red-50 p-8 rounded-lg shadow">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-red-500 text-xl font-medium">Building not found</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <button 
        onClick={handletoback}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Buildings
      </button>
      
      {/* Building Hero Section with improved visuals */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        {building.images && building.images.length > 0 ? (
          <div className="h-72 md:h-96 overflow-hidden relative">
            <img 
              src={building.images[0]} 
              alt={building.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{building.name}</h1>
                {building.address && (
                  <p className="text-gray-200 mb-1">
                    {building.address.street}, {building.address.city}, {building.address.state} - {building.address.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-72 md:h-96 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 text-lg">No image available</p>
          </div>
        )}
        
        <div className="p-6">
          <p className="text-gray-700">{building.description}</p>
        </div>
      </div>
      
      {/* Building Stats with improved visual appeal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm uppercase mb-1 font-medium">Construction Year</h3>
          <p className="text-2xl font-bold">{building.constructionYear}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm uppercase mb-1 font-medium">Total Units</h3>
          <p className="text-2xl font-bold">{unitStats.total || 0}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm uppercase mb-1 font-medium">Vacant Units</h3>
          <p className="text-2xl font-bold text-green-600">{unitStats.vacant || 0}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm uppercase mb-1 font-medium">Owner</h3>
          <p className="text-2xl font-bold">{building.owner?.name || "Not specified"}</p>
        </div>
      </div>
      
      {/* Unit Types Summary with improved visuals */}
      {Object.keys(unitStats.types || {}).length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Unit Types Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(unitStats.types).map(([type, stats]) => (
              <div 
                key={type} 
                className="border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveFilter(type)}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">{type}</h3>
                  <button 
                    className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFilter(type);
                    }}
                  >
                    View All
                  </button>
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(stats.total / unitStats.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">{((stats.total / unitStats.total) * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Total:</span>
                    <span className="ml-1 font-medium">{stats.total}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Vacant:</span>
                    <span className="ml-1 font-medium text-green-600">{stats.vacant}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Units Filter Tabs */}
      {building.units && building.units.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">All Units</h2>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setActiveFilter('All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'All' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({unitStats.total || 0})
              </button>
              <button
                onClick={() => setActiveFilter('Vacant')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'Vacant' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vacant ({unitStats.vacant || 0})
              </button>
              <button
                onClick={() => setActiveFilter('Occupied')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'Occupied' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Occupied ({(unitStats.total - unitStats.vacant) || 0})
              </button>
              {Object.entries(unitStats.types || {}).map(([type, stats]) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === type 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type} ({stats.total})
                </button>
              ))}
            </div>
          </div>
          
          {/* Units Grid with improved card design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.map((unit) => (
              <div key={unit._id} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                {/* Unit image or placeholder */}
                {unit.images && unit.images.length > 0 ? (
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={unit.images[0]} 
                      alt={`Unit ${unit.unitNumber}`}
                      className="w-full h-full object-cover" 
                    />
                    <div className={`absolute top-0 right-0 mt-3 mr-3 px-3 py-1 rounded-full text-xs font-bold ${
                      unit.status === 'Vacant' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {unit.status}
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                    <p className="text-gray-400">No image available</p>
                    <div className={`absolute top-0 right-0 mt-3 mr-3 px-3 py-1 rounded-full text-xs font-bold ${
                      unit.status === 'Vacant' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {unit.status}
                    </div>
                  </div>
                )}
                
                {/* Unit details */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">Room : {unit.unitNumber}</h3>
                    <span className="text-lg font-bold text-blue-600">₹{unit.rent}/mo</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                      {unit.unitType}
                    </span>
                    {unit.specialFeature && (
                      <span className="inline-block bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm font-semibold mb-2">
                        {unit.specialFeature}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-500 text-xs">Floor</span>
                      <span className="font-medium">{unit.floor}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-500 text-xs">Size</span>
                      <span className="font-medium">{unit.size} sq.ft</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-500 text-xs">Beds</span>
                      <span className="font-medium">{unit.bedrooms}</span>
                    </div>
                  </div>
                  
                  {unit.status === 'Vacant' ? (
                    <button 
                      onClick={() => {
                        setSelectedUnit(unit);
                        setIsModalOpen(true);
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      Request Details
                    </button>
                  ) : (
                    <div className="text-center py-2 text-gray-500 text-sm">
                      Currently occupied
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredUnits.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-500 text-lg">No units match your current filter</p>
              <button 
                onClick={() => setActiveFilter('All')}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Show all units
              </button>
            </div>
          )}
        </div>
      )}

      {/* Unit Request Modal */}
      {isModalOpen && (
        <UnitRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          unitDetails={selectedUnit}
          onSubmit={handleRequestSubmit}
        />
      )}
    </div>
  );
};

export default BuildingDetails;