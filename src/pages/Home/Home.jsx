import React, { useState, useEffect } from 'react';
// Import the logo - adjust the path as needed

const HomePage = () => {


  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSpaceModal = (spaceId) => {
    const space = spacesData.find(space => space.id === spaceId);
    setSelectedSpace(space);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 <div>
   <Layout>
      <Hero />
      <Buildings data={buildingsData} />
      <RentalSpaces 
        spaces={spacesData} 
        onSpaceClick={openSpaceModal} 
      />
      <Contact />
      
      {isModalOpen && selectedSpace && (
        <SpaceDetailsModal 
          space={selectedSpace} 
          onClose={closeModal} 
        />
      )}
    </Layout>
 </div>

};

export default HomePage;