import React, { useState } from 'react'; // Ajout de useState
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
  // 1. On crée l'état de recherche ici
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col min-w-0 overflow-hidden">
        {/* 2. On passe la recherche au Header pour qu'il puisse la modifier */}
        <Header title="Dashboard" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* 3. On envoie la recherche à l'Outlet (Hotels) via le context */}
          <Outlet context={[searchTerm]} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;