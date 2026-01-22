import { Search, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// On ajoute les props ici
const Header = ({ title, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      
      <div className="flex items-center gap-6">
        {/* Barre de recherche connectée */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="pl-10 pr-4 py-1.5 bg-gray-100 rounded-full text-sm outline-none focus:ring-1 focus:ring-gray-300 w-64"
            value={searchTerm} // Affiche ce qui est stocké
            onChange={(e) => setSearchTerm(e.target.value)} // Met à jour quand on tape
          />
        </div>

        <div className="flex items-center gap-4 text-gray-600">
          <button className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 text-[10px] text-white flex items-center justify-center rounded-full">3</span>
          </button>
          <button onClick={handleLogout} title="Déconnexion">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;