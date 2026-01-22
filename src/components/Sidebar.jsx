import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, LayoutDashboard, Hotel, LogOut, User } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // RÉCUPÉRATION DU NOM DYNAMIQUE
  const username = localStorage.getItem('username') || 'Utilisateur';

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear(); // Vide TOUT (token et username)
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-[#2D3134] text-white flex flex-col p-6 fixed left-0 top-0 border-r border-white/5">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-white p-1.5 rounded-lg flex items-center justify-center">
          <Package size={20} className="text-[#2D3134]" strokeWidth={2.5} />
        </div>
        <h1 className="text-lg font-bold tracking-wider uppercase">Red Product</h1>
      </div>

      <nav className="flex-1">
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">Principal</p>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive('/dashboard') ? 'bg-white text-black' : 'hover:bg-[#3a3f42]'}`}>
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/hotels" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive('/hotels') ? 'bg-white text-black' : 'hover:bg-[#3a3f42]'}`}>
              <Hotel size={20} />
              <span className="font-medium">Liste des hôtels</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-4 p-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center border-2 border-gray-400">
              <User size={20} className="text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2D3134] rounded-full"></span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{username}</p> {/* NOM DYNAMIQUE ICI */}
            <p className="text-xs text-green-400 font-medium">En ligne</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full hover:bg-red-500/10 text-red-400 rounded-lg transition-colors group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;