// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Leftsidebar from '../Comnponent/Leftsidebar/Leftsidebar';
const MainLayout = () => {
  return (
    <div className="flex">
      <Leftsidebar />
      <div className="flex-1 p-4">
        <Outlet /> {/* This is where the child route component will render */}
      </div>
    </div>
  );
};

export default MainLayout;
