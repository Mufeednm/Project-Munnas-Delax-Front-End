import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import SpaceCard from './SpaceCard';

function RentalSpaces({ spaces, onSpaceClick }) {
  const [activeTab, setActiveTab] = useState('all');

  const filterSpaces = () => {
    if (activeTab === 'all') return spaces;
    return spaces.filter(space => space.type.toLowerCase().includes(activeTab.toLowerCase()));
  };

  const tabs = [
    { id: 'all', label: 'All Spaces' },
    { id: 'shop', label: 'Shop Rooms' },
    { id: 'family', label: 'Family Rooms' },
    { id: 'bachelor', label: 'Bachelor Rooms' },
    { id: 'godown', label: 'Godowns' }
  ];

  return (
    <section id="spaces" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle>Available Rental Spaces</SectionTitle>
        
        <div className="flex justify-center mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-5 py-2 mx-1 mb-2 rounded transition duration-300 ${
                activeTab === tab.id 
                  ? 'bg-blue-700 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterSpaces().map(space => (
            <SpaceCard 
              key={space.id} 
              space={space} 
              onClick={() => onSpaceClick(space.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RentalSpaces;