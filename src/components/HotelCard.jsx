import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const HotelCard = ({ image, address, name, price_per_night, onEdit, onDelete }) => {
  const API_URL = "https://hotel-management-backend-ommj.onrender.com";
  const fallbackImage = "https://placehold.co/300x200?text=Image+Indisponible";

  const imageUrl = image 
    ? (image.startsWith('http') ? image : `${API_URL}${image}`) 
    : fallbackImage;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group">
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button onClick={onEdit} className="p-2 bg-white/90 text-blue-600 rounded-full shadow-md hover:scale-110 transition-all"><Edit size={16} /></button>
        <button onClick={onDelete} className="p-2 bg-white/90 text-red-600 rounded-full shadow-md hover:scale-110 transition-all"><Trash2 size={16} /></button>
      </div>
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-40 object-cover"
        onError={(e) => { e.target.src = fallbackImage; }} 
      />
      <div className="p-4">
        <p className="text-xs text-[#F3C449] font-semibold mb-1">{address}</p>
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 font-medium">{price_per_night} XOF</p>
      </div>
    </div>
  );
};
export default HotelCard;