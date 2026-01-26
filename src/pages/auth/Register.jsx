import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Pour éviter les doubles clics
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ÉTAPE 1 : On prépare les données (Django attend souvent 'username')
      const userData = {
        username: email, // On utilise l'email comme identifiant unique
        email: email,
        password: password,
        first_name: name // On envoie quand même le nom dans first_name
      };

      console.log("Tentative d'inscription avec :", userData);

      // ÉTAPE 2 : Envoi vers ton Backend Render
      const response = await axios.post(
        'https://hotel-management-backend-ommj.onrender.com/api/register/', 
        userData
      );

      console.log("Réponse réussie :", response.data);
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate('/login');

    } catch (error) {
      // ÉTAPE 3 : Analyse précise de l'erreur
      if (error.response) {
        // Le serveur a répondu (ex: 400, 403, 500)
        console.error("Détails de l'erreur Backend :", error.response.data);
        
        // On extrait le message d'erreur pour l'utilisateur
        const errorMsg = JSON.stringify(error.response.data);
        alert(`Erreur du serveur : ${errorMsg}`);
      } else if (error.request) {
        // Le serveur n'a pas répondu du tout
        console.error("Le serveur ne répond pas :", error.request);
        alert("Impossible de contacter le serveur. Vérifie si ton projet Render est bien 'Live'.");
      } else {
        console.error("Erreur de configuration :", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white p-10 rounded-sm shadow-2xl w-full max-w-[400px] z-10">
        <p className="text-gray-700 mb-10 font-normal text-lg">Inscrivez-vous en tant que Admin</p>
        
        <form className="space-y-10" onSubmit={handleRegister}>
          
          {/* NOM */}
          <div className="relative border-b border-gray-300">
            <input 
              type="text" 
              id="name"
              className="peer w-full py-2 outline-none text-sm text-gray-800 bg-transparent placeholder-transparent" 
              placeholder="Nom"
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-xs pointer-events-none">
              Nom
            </label>
          </div>

          {/* E-MAIL */}
          <div className="relative border-b border-gray-300">
            <input 
              type="email" 
              id="email"
              className="peer w-full py-2 outline-none text-sm text-gray-800 bg-transparent placeholder-transparent" 
              placeholder="E-mail"
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-xs pointer-events-none">
              E-mail
            </label>
          </div>

          {/* MOT DE PASSE */}
          <div className="relative border-b border-gray-300">
            <input 
              type="password" 
              id="password"
              className="peer w-full py-2 outline-none text-sm text-gray-800 bg-transparent placeholder-transparent" 
              placeholder="Mot de passe"
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-xs pointer-events-none">
              Mot de passe
            </label>
          </div>

          {/* CONDITIONS */}
          <div className="flex items-center gap-2 pt-2">
            <input 
              type="checkbox" 
              id="terms" 
              className="w-5 h-5 accent-[#45484B] cursor-pointer border-gray-300 rounded" 
              required 
            />
            <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
              Accepter les termes et la politique
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#45484B]'} text-white py-4 rounded-sm font-bold text-lg hover:bg-black transition-all`}
          >
            {loading ? "Chargement..." : "S'inscrire"}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center z-10">
        <p className="text-white font-medium">
          Vous avez déjà un compte ? <Link to="/login" className="text-[#FFD700] font-bold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;