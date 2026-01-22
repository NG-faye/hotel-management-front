import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: email, 
        password: password
      });
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('username', email); 
        navigate('/dashboard'); 
      }
    } catch (error) {
      alert("Erreur : Identifiants incorrects");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* CARTE BLANCHE */}
      <div className="bg-white p-10 rounded-sm shadow-2xl w-full max-w-[400px] z-10">
        <p className="text-gray-700 mb-10 font-normal text-lg">Connectez-vous en tant qu'Admin</p>
        
        <form className="space-y-10" onSubmit={handleSubmit}>
          
          {/* CHAMP EMAIL FLOTTANT */}
          <div className="relative border-b border-gray-300">
            <input 
              type="text" 
              id="email"
              className="peer w-full py-2 outline-none text-sm text-gray-800 bg-transparent placeholder-transparent" 
              placeholder="E-mail"
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label 
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all 
                         peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                         peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-xs pointer-events-none"
            >
              E-mail
            </label>
          </div>

          {/* CHAMP MOT DE PASSE FLOTTANT */}
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
            <label 
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all 
                         peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                         peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-xs pointer-events-none"
            >
              Mot de passe
            </label>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="keep" className="w-4 h-4 accent-[#45484B] cursor-pointer" />
            <label htmlFor="keep" className="text-sm text-gray-600 cursor-pointer">Gardez-moi connecté</label>
          </div>

          <button type="submit" className="w-full bg-[#45484B] text-white py-4 rounded-sm font-bold text-lg hover:bg-black transition-all">
            Se connecter
          </button>
        </form>
      </div>

      <div className="mt-8 text-center z-10">
        {/* CORRECTION DU LIEN ICI */}
        <Link to="/forgot-password" className="text-[#FFD700] block mb-4 font-bold hover:underline">
          Mot de passe oublié ?
        </Link>
        <p className="text-white">
          Vous n'avez pas de compte ? <Link to="/register" className="text-[#FFD700] font-bold hover:underline">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;