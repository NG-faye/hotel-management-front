import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import de l'œil

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour l'œil
  const [loading, setLoading] = useState(false); // AJOUT DE L'ÉTAT LOADING
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // ON ACTIVE LE CHARGEMENT
    try {
      // On utilise l'email comme username pour Django
      await axios.post('https://hotel-management-backend-ommj.onrender.com/api/register/', {
        username: email,
        email: email,
        password: password,
        first_name: name,
      });

      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate('/login');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        alert("Erreur : " + JSON.stringify(error.response.data));
      } else {
        alert("Erreur lors de l'inscription.");
      }
    } finally {
      setLoading(false); // ON DÉSACTIVE LE CHARGEMENT QUOI QU'IL ARRIVE
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white p-10 rounded-sm shadow-2xl w-full max-w-[400px] z-10">
        <p className="text-gray-700 mb-10 font-normal text-lg">Inscrivez-vous en tant que Admin</p>
        
        <form className="space-y-10" onSubmit={handleRegister}>
          
          {/* CHAMP NOM */}
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

          {/* CHAMP E-MAIL */}
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

          {/* CHAMP MOT DE PASSE AVEC TON OEIL REPLACÉ */}
          <div className="relative border-b border-gray-300">
            <input 
              type={showPassword ? "text" : "password"} 
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
            <div 
              className="absolute right-0 top-2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="terms" className="w-5 h-5 accent-[#45484B] cursor-pointer border-gray-300 rounded" required />
            <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
              Accepter les termes et la politique
            </label>
          </div>

          {/* BOUTON AVEC ÉTAT DE CHARGEMENT */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white py-4 rounded-sm font-bold text-lg transition-all ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#45484B] hover:bg-black'
            }`}
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
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