import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const HotelCard = ({ image, address, name, price_per_night, onEdit, onDelete }) => {
  const API_URL = "https://hotel-management-backend-ommj.onrender.com";

  // Ici, on vérifie si l'image est déjà un lien complet (Cloudinary)
  // ou s'il faut ajouter l'adresse du backend devant.
  const getFullImageUrl = () => {
    if (!image) return "https://via.placeholder.com/300x200";
    if (image.startsWith('http')) return image; // C'est déjà sur Cloudinary
    return `${API_URL}${image}`; // C'est un lien relatif du backend
  };

  const imageUrl = getFullImageUrl();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group">
      
      {/* TES BOUTONS D'ACTION (Inchangés) */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button 
          onClick={onEdit}
          className="p-2 bg-white/90 hover:bg-white text-blue-600 rounded-full shadow-md transition-all hover:scale-110"
          title="Modifier"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={onDelete}
          className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-full shadow-md transition-all hover:scale-110"
          title="Supprimer"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* TON IMAGE (Réparée) */}
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-40 object-cover"
        onError={(e) => { e.target.src = "https://via.placeholder.com/300x200"; }}
      />

      {/* TES INFORMATIONS (Inchangées) */}
      <div className="p-4">
        <p className="text-xs text-[#F3C449] font-semibold mb-1">{address}</p>
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 font-medium">
          {price_per_night} XOF <span className="text-xs font-normal">par nuit</span>
        </p>
      </div>
    </div>
  );
};

export default HotelCard;