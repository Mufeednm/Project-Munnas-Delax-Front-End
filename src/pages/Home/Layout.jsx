import React from 'react';
import Footer from './Footer';
import Header from '../../components/HomepageComponents/Header';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;