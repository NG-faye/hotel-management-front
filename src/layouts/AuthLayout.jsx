import React from 'react';
import { Outlet } from 'react-router-dom';
// On remplace le logo image par l'icône Package
import { Package } from 'lucide-react'; 
import authBg from '../assets/WhatsApp Image 2026-01-17 at 00.05.18.jpeg'; 

const AuthLayout = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#45484B] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      {/* 1. TON LOGO (Maintenant avec une icône) */}
      <div className="z-10 mb-8 flex items-center gap-3">
        {/* On utilise l'icône à la place de la balise <img> */}
        <Package size={32} className="text-white" /> 
        <h1 className="text-white text-2xl font-bold tracking-wider uppercase">
          Red Product
        </h1>
      </div>

      {/* 2. LE CONTENU DYNAMIQUE (Login / Register / Forgot Password) */}
      <div className="z-10 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;