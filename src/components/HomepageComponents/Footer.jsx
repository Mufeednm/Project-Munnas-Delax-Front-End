// components/Footer.jsx
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Pullanoor Land Mark</h3>
            <p>Providing quality spaces since 2010</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-blue-300">Home</a></li>
              <li><a href="#buildings" className="hover:text-blue-300">Buildings</a></li>
              <li><a href="#rooms" className="hover:text-blue-300">Vacant Rooms</a></li>
              <li><a href="#contact" className="hover:text-blue-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2">Contact Info</h4>
            <address className="not-italic">
              <p>123 Main Street</p>
              <p>Pullanoor, Kerala</p>
              <p>India - 680001</p>
              <p className="mt-2">Email: info@pullanoor.com</p>
              <p>Phone: +91 98765 43210</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>© {new Date().getFullYear()} Pullanoor Land Mark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer