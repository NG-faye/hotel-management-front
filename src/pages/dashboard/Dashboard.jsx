import React, { useState, useEffect } from 'react'; // Ajout de useState et useEffect
import axios from 'axios'; // Ajout d'axios
import StatCard from '../../components/StatCard';
import { Mail, Users, FileText } from 'lucide-react';

const Dashboard = () => {
  // 1. État pour stocker le nombre d'hôtels
  const [hotelCount, setHotelCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupère le jeton du login
        
        const response = await axios.get('http://127.0.0.1:8000/api/hotels/', {
          headers: {
            'Authorization': `Bearer ${token}` // On envoie le jeton pour déverrouiller l'accès
          }
        });
        
        // 2. On compte combien d'hôtels Django nous a envoyés
        setHotelCount(response.data.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des stats :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light text-gray-800">Bienvenue sur RED Product</h1>
        <p className="text-gray-500 text-sm">Vue d'ensemble de vos activités</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={FileText} count="125" label="Formulaires" subtext="Inscriptions reçues" bgColor="bg-purple-100" iconColor="text-purple-600" />
        <StatCard icon={Mail} count="40" label="Messages" subtext="Nouveaux messages" bgColor="bg-green-100" iconColor="text-green-600" />
        <StatCard icon={Users} count="600" label="Utilisateurs" subtext="Inscrits ce mois" bgColor="bg-blue-100" iconColor="text-blue-600" />
        <StatCard icon={Mail} count="25" label="E-mails" subtext="Campagnes envoyées" bgColor="bg-red-100" iconColor="text-red-600" />
        
        {/* 3. Ici, on utilise hotelCount au lieu de "40" */}
        <StatCard 
          icon={FileText} 
          count={hotelCount.toString()} 
          label="Hôtels" 
          subtext="Hôtels enregistrés" 
          bgColor="bg-yellow-100" 
          iconColor="text-yellow-600" 
        />
        
        <StatCard icon={Users} count="02" label="Entités" subtext="Filiales actives" bgColor="bg-teal-100" iconColor="text-teal-600" />
      </div>
    </div>
  );
};

export default Dashboard;