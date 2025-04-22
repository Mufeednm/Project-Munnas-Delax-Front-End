import React from 'react';
import Button from './Button';

function BuildingCard({ building }) {
  const { name, image, shopRooms, familyRooms, bachelorRooms, godowns, description, vacancies } = building;
  
  return (
    <div className="w-full md:w-[48%] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <div 
        className="h-64 bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-4">{name}</h3>
        
        <div className="flex justify-between mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">{shopRooms}</div>
            <div className="text-sm text-gray-600">Shop Rooms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">{familyRooms}</div>
            <div className="text-sm text-gray-600">Family Rooms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">{bachelorRooms}</div>
            <div className="text-sm text-gray-600">Bachelor Rooms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">{godowns}</div>
            <div className="text-sm text-gray-600">Godowns</div>
          </div>
        </div>
        
        <p className="mb-4">{description}</p>
        
        <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mt-2 mb-4">
          {vacancies} Vacancies Available
        </div>
        
        <Button href="#" className="mt-2 block text-center">
          View Details
        </Button>
      </div>
    </div>
  );
}

export default BuildingCard;