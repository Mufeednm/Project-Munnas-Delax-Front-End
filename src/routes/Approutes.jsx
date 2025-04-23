// src/routes/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login';
import Admin from '../pages/Admin/Admin';
import NotFound from '../pages/NotFound';
import React from 'react';
import BuildingDetails from '../pages/Home/BuildingDetails';




const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/buildings/:buildingId" element={<BuildingDetails />} />
      
      {/* Auth routes */}
     
        <Route path="/login" element={<Login />} />
    
      


        <Route path="/admin" element={<Admin />} />

      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;