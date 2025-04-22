import React from 'react';
import BuildingCard from './BuildingCard';
import SectionTitle from './SectionTitle';

function Buildings({ data }) {
  return (
    <section id="buildings" className="py-16">
      <div className="container mx-auto px-4">
        <SectionTitle>Our Buildings</SectionTitle>
        
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {data.map(building => (
            <BuildingCard 
              key={building.id} 
              building={building} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Buildings;