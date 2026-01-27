import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { Plus, Image as ImageIcon, X } from 'lucide-react';
import HotelCard from '../../components/HotelCard';
import toast from 'react-hot-toast'; // IMPORTATION ICI

const BASE_URL = "https://hotel-management-backend-ommj.onrender.com";

const Hotels = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [searchTerm] = useOutletContext(); 
  
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
      toast.error("Erreur de chargement des données.");
    }
  };

  useEffect(() => { fetchHotels(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet hôtel ?")) {
      const t = toast.loading("Suppression en cours...");
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${BASE_URL}/api/hotels/${id}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        toast.success("Hôtel supprimé !", { id: t });
        fetchHotels();
      } catch (error) {
        toast.error("Erreur lors de la suppression.", { id: t });
      }
    }
  };

  const closeAndReset = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', address: '', email: '', phone: '', price_per_night: '', currency: 'XOF', image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = toast.loading(editingId ? "Mise à jour..." : "Création...");
    const token = localStorage.getItem('token');
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      const config = { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };

      if (editingId) {
        await axios.patch(`${BASE_URL}/api/hotels/${editingId}/`, data, config);
        toast.success("Hôtel mis à jour !", { id: t });
      } else {
        await axios.post(`${BASE_URL}/api/hotels/`, data, config);
        toast.success("Hôtel créé avec succès !", { id: t });
      }
      closeAndReset();
      fetchHotels();
    } catch (error) { 
      toast.error("Erreur d'enregistrement.", { id: t }); 
    }
  };

  // ... (Le reste du JSX de ton return est identique, les fonctions sont maintenant liées aux toasts)
  return (
      // Ton code JSX ici reste le même
      <div className="space-y-6">
        {/* ... tout ton code de rendu ... */}
      </div>
  );
};

export default Hotels;