// components/BuildingsCard.jsx
import React from 'react';

const BuildingCard = ({ name, image, description, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <button 
          onClick={onViewDetails}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default BuildingCard;