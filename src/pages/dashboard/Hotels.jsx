import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Plus, Image as ImageIcon, X } from 'lucide-react';
import HotelCard from '../../components/HotelCard';

const BASE_URL = "https://hotel-management-backend-ommj.onrender.com";

const Hotels = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false); // AJOUT DU LOADING

  // LA SEULE LIGNE CHANGÉE POUR ÉVITER LE CRASH
  const context = useOutletContext() || [""]; 
  const searchTerm = context[0] || ""; 
  
  const [formData, setFormData] = useState({
    name: '', address: '', email: '', phone: '', price_per_night: '', currency: 'XOF', image: null
  });

  const fetchHotels = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/api/hotels/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setHotels(response.data);
    } catch (error) {
      console.error("Erreur chargement hôtels:", error);
    }
  };

  useEffect(() => { fetchHotels(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet hôtel ?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/api/hotels/${id}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchHotels();
      } catch (error) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const openEditModal = (hotel) => {
    setEditingId(hotel.id);
    setFormData({
      name: hotel.name,
      address: hotel.address,
      email: hotel.email || '',
      phone: hotel.phone || '',
      price_per_night: hotel.price_per_night,
      currency: hotel.currency || 'XOF',
      image: null 
    });
    setModalOpen(true);
  };

  const closeAndReset = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', address: '', email: '', phone: '', price_per_night: '', currency: 'XOF', image: null });
    setLoading(false); // Reset loading
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // DÉMARRAGE DU CHARGEMENT
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('name', formData.name);
    data.append('address', formData.address);
    data.append('price_per_night', formData.price_per_night);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('currency', formData.currency);
    if (formData.image) data.append('image', formData.image);

    try {
      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data' 
        }
      };

      if (editingId) {
        await axios.patch(`${BASE_URL}/api/hotels/${editingId}/`, data, config);
        alert("Hôtel mis à jour !");
      } else {
        await axios.post(`${BASE_URL}/api/hotels/`, data, config);
        alert("Hôtel créé !");
      }
      closeAndReset();
      fetchHotels();
    } catch (error) { 
      alert("Erreur lors de l'enregistrement."); 
    } finally {
      setLoading(false); // ARRÊT DU CHARGEMENT
    }
  };

  const filteredHotels = hotels.filter(hotel => 
    (hotel.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (hotel.address?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-medium">Hôtels <span className="text-gray-400 ml-2">{filteredHotels.length}</span></h2>
        <button onClick={() => { setEditingId(null); setModalOpen(true); }} className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Plus size={18} /> Créer un nouveau hôtel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredHotels.map(hotel => (
          <HotelCard 
            key={hotel.id} 
            {...hotel} 
            onEdit={() => openEditModal(hotel)} 
            onDelete={() => handleDelete(hotel.id)} 
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800 uppercase">
                {editingId ? "Modifier l'hôtel" : "Créer un nouveau hôtel"}
              </h3>
              <button onClick={closeAndReset} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Nom de l'hôtel</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="Le Grand Hotel" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Adresse</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required placeholder="Dakar, Plateau" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">E-mail</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="hotel@mail.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Numéro de téléphone</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required placeholder="+221 ..." />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Prix par nuit</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" value={formData.price_per_night} onChange={(e) => setFormData({...formData, price_per_night: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Devise</label>
                  <select className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500" value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})}>
                    <option value="XOF">F CFA (XOF)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="USD">Dollar (USD)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-sm font-medium text-gray-700">Ajouter une photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer relative">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} />
                  <ImageIcon className="text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500">{formData.image ? formData.image.name : "Cliquez pour ajouter une image"}</p>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={closeAndReset} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`px-6 py-2.5 text-white rounded-lg font-medium transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#45484B] hover:bg-black'}`}
                >
                  {loading ? "Enregistrement..." : (editingId ? "Modifier" : "Enregistrer")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;