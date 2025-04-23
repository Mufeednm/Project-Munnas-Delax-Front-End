import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import { fetchVacantRooms } from '../../api/Homeapi';

const VacantRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState({
    buildings: [],
    types: [],
    priceRanges: [
      { label: 'Under ₹10,000', min: 0, max: 10000 },
      { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
      { label: '₹20,000 - ₹30,000', min: 20000, max: 30000 },
      { label: 'Above ₹30,000', min: 30000, max: Infinity }
    ]
  });

  useEffect(() => {
    const getRooms = async () => {
      try {
        setLoading(true);
        const data = await fetchVacantRooms();
        setRooms(data.data);
        setFilteredRooms(data.data);
        
        const buildingSet = new Set();
        const typeSet = new Set();
        
        data.data.forEach(room => {
          buildingSet.add(room.building.name);
          typeSet.add(room.unitType);
        });
        
        setCategories(prev => ({
          ...prev,
          buildings: Array.from(buildingSet),
          types: Array.from(typeSet)
        }));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load vacant rooms');
        setLoading(false);
      }
    };

    getRooms();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredRooms(rooms);
      return;
    }

    if (categories.buildings.includes(activeFilter)) {
      setFilteredRooms(rooms.filter(room => room.building.name === activeFilter));
      return;
    }

    if (categories.types.includes(activeFilter)) {
      setFilteredRooms(rooms.filter(room => room.unitType === activeFilter));
      return;
    }

    const priceRange = categories.priceRanges.find(range => range.label === activeFilter);
    if (priceRange) {
      setFilteredRooms(rooms.filter(room => room.rent >= priceRange.min && room.rent <= priceRange.max));
      return;
    }
  }, [activeFilter, rooms, categories]);

  const handleFilterChange = (category, value) => {
    setActiveCategory(category);
    setActiveFilter(value);
  };

  if (loading) return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full h-12 w-12 bg-blue-100"></div>
          </div>
          <p className="text-lg text-gray-600 font-medium">Finding your perfect space...</p>
          <p className="text-gray-500">We're gathering the latest availability</p>
        </div>
      </div>
    </section>
  );

  if (error) return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <section id="rooms" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Discover Your Perfect Space</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our {rooms.length} carefully curated vacant units to find your ideal match
          </p>
        </div>
        
        {/* Enhanced Filter Section */}
        <div className="mb-10 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Spaces</h3>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeCategory === 'all' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Spaces
              </button>
              <button
                onClick={() => setActiveCategory('building')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeCategory === 'building' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                By Building
              </button>
              <button
                onClick={() => setActiveCategory('type')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeCategory === 'type' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                By Type
              </button>
              <button
                onClick={() => setActiveCategory('price')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeCategory === 'price' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                By Price
              </button>
            </div>
            
            {/* Filter Options */}
            <div className="space-y-4">
              {activeCategory === 'all' && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleFilterChange('all', 'all')}
                    className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center ${
                      activeFilter === 'all'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <svg className={`w-4 h-4 mr-2 ${activeFilter === 'all' ? 'text-white' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    Show All ({rooms.length})
                  </button>
                </div>
              )}
              
              {activeCategory === 'building' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.buildings.map(building => (
                    <button
                      key={building}
                      onClick={() => handleFilterChange('building', building)}
                      className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                        activeFilter === building 
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <span>{building}</span>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {rooms.filter(room => room.building.name === building).length}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              
              {activeCategory === 'type' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.types.map(type => (
                    <button
                      key={type}
                      onClick={() => handleFilterChange('type', type)}
                      className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                        activeFilter === type 
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <span>{type}</span>
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {rooms.filter(room => room.unitType === type).length}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              
              {activeCategory === 'price' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.priceRanges.map(range => {
                    const count = rooms.filter(room => room.rent >= range.min && room.rent <= range.max).length;
                    if (count === 0) return null;
                    
                    return (
                      <button
                        key={range.label}
                        onClick={() => handleFilterChange('price', range.label)}
                        className={`p-3 rounded-lg border transition-all flex flex-col ${
                          activeFilter === range.label 
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <span className="font-medium">{range.label.split(' ')[0]}</span>
                        <span className="text-xs text-gray-500">{range.label.split(' ').slice(1).join(' ')}</span>
                        <span className="mt-1 text-xs font-medium text-blue-600 self-end">
                          {count} {count === 1 ? 'unit' : 'units'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center mb-3 sm:mb-0">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            <span className="text-gray-700">
              {activeFilter === 'all' ? (
                <>
                  Showing <span className="font-medium text-gray-900">all {rooms.length} spaces</span>
                </>
              ) : (
                <>
                  Filtered by <span className="font-medium text-gray-900">{activeFilter}</span> • 
                  <span className="ml-2 font-medium text-blue-600">{filteredRooms.length} result{filteredRooms.length !== 1 ? 's' : ''}</span>
                </>
              )}
            </span>
          </div>
          
          {activeFilter !== 'all' && (
            <button 
              onClick={() => handleFilterChange('all', 'all')}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Clear filters
            </button>
          )}
        </div>
        
        {/* Room Cards Grid */}
        {filteredRooms.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-sm p-12 border border-gray-200">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No spaces match your criteria</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new availability</p>
              <button 
                onClick={() => handleFilterChange('all', 'all')}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
              >
                Show All Spaces
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id || room._id}
                building={room.building.name}
                roomNumber={room.unitNumber}
                size={room.size}
                price={room.rent}
                type={room.unitType}
                image={room.images && room.images.length > 0 ? room.images[0] : null}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VacantRooms;