// components/Buildings.jsx
import React, { useState, useEffect } from 'react';
import { getAllbuildings } from '../../api/Homeapi';
import BuildingCard from './BuildingsCard';

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBuildings = async () => {
      try {
        setLoading(true);
        const data = await getAllbuildings();
        console.log("in Building",data);
        setBuildings(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load buildings');
        setLoading(false);
      }
    };

    getBuildings();
  }, []);

  if (loading) return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <p>Loading buildings...</p>
      </div>
    </section>
  );

  if (error) return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    </section>
  );

  return (
    <section id="buildings" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Buildings</h2>
        {buildings.length === 0 ? (
          <p className="text-center">No buildings available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2-3 gap-8">
            {buildings.building.map((building) => (
              <BuildingCard
                key={building.id}
                name={building.name}
                image={building.imageUrl}
                description={building.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Buildings;