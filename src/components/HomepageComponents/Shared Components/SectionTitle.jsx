import React from 'react';

function SectionTitle({ children }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold inline-block relative pb-3">
        {children}
        <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-yellow-500"></span>
      </h2>
    </div>
  );
}

export default SectionTitle;