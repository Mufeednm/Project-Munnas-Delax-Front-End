import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-5">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            Pullanoor <span className="text-yellow-500">Land Mark</span>
          </div>
          <ul className="hidden md:flex space-x-8">
            <li><a href="#home" className="hover:text-yellow-500 transition duration-300">Home</a></li>
            <li><a href="#buildings" className="hover:text-yellow-500 transition duration-300">Buildings</a></li>
            <li><a href="#spaces" className="hover:text-yellow-500 transition duration-300">Rental Spaces</a></li>
            <li><a href="#contact" className="hover:text-yellow-500 transition duration-300">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;