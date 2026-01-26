import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Assure-toi d'avoir installé react-icons

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour l'œil
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = {
        username: email,
        email: email,
        password: password,
        first_name: name
      };

      await axios.post('https://hotel-management-backend-ommj.onrender.com/api/register/', userData);
      alert("Inscription réussie !");
      navigate('/login');
    } catch (error) {
      if (error.response) {
        alert("Erreur : " + JSON.stringify(error.response.data));
      } else {
        alert("Le serveur ne répond pas.");
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
            <input type="text" className="peer w-full py-2 outline-none text-sm bg-transparent" placeholder="Nom" required value={name} onChange={(e) => setName(e.target.value)} />
            <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm">Nom</label>
          </div>

          {/* E-MAIL */}
          <div className="relative border-b border-gray-300">
            <input type="email" className="peer w-full py-2 outline-none text-sm bg-transparent" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm">E-mail</label>
          </div>

          {/* MOT DE PASSE AVEC L'OEIL */}
          <div className="relative border-b border-gray-300">
            <input 
              type={showPassword ? "text" : "password"} 
              className="peer w-full py-2 outline-none text-sm bg-transparent" 
              placeholder="Mot de passe" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm">Mot de passe</label>
            
            {/* L'icône de l'œil positionnée à droite */}
            <div 
              className="absolute right-0 top-2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="terms" className="w-5 h-5 accent-[#45484B]" required />
            <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">Accepter les termes</label>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#45484B] text-white py-4 rounded-sm font-bold">
            {loading ? "Chargement..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;