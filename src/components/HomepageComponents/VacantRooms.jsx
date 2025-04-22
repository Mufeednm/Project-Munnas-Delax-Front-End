// components/VacantRooms.jsx
import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import { fetchVacantRooms } from '../../api/Homeapi';

const VacantRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      try {
        setLoading(true);
        const data = await fetchVacantRooms();
        console.log("in  get rooms  Vacciunt rooms ",data.data);
        setRooms(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load vacant rooms');
        setLoading(false);
      }
    };

    getRooms();
  }, []);

  if (loading) return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <p>Loading available spaces...</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    </section>
  );

  return (
    <section id="rooms" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Available Spaces</h2>
        {rooms.length === 0 ? (
          <p className="text-center">No vacant rooms available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                building={room.building.name}
                roomNumber={room.unitNumber}
                size={room.size}
                price={room.rent}
                type={room.unitType}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VacantRooms;