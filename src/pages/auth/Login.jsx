import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // 1. Ajout de l'import

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 2. Ajout de l'état pour l'œil
  const [loading, setLoading] = useState(false); // 3. Ajout de l'état loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Active le chargement
    const loadingToast = toast.loading("Connexion en cours...");
    try {
      const response = await axios.post('https://hotel-management-backend-ommj.onrender.com/api/login/', {
        username: email, 
        password: password
      });
      
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('username', email); 
        toast.success("Bienvenue !", { id: loadingToast });
        navigate('/dashboard'); 
      }
    } catch (error) {
      toast.error("Identifiants incorrects", { id: loadingToast });
    } finally {
      setLoading(false); // Désactive le chargement
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white p-10 rounded-sm shadow-2xl w-full max-w-[400px] z-10">
        <p className="text-gray-700 mb-10 font-normal text-lg">Connectez-vous en tant qu'Admin</p>
        
        <form className="space-y-10" onSubmit={handleSubmit}>
          
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

          <div className="relative border-b border-gray-300">
            <input 
              type={showPassword ? "text" : "password"} // 4. Type dynamique pour l'œil
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
            {/* 5. Ton icône de l'œil placée à droite */}
            <div 
              className="absolute right-0 top-2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="keep" className="w-4 h-4 accent-[#45484B] cursor-pointer" />
            <label htmlFor="keep" className="text-sm text-gray-600 cursor-pointer">Gardez-moi connecté</label>
          </div>

          <button 
            type="submit" 
            disabled={loading} // Désactive si chargement
            className={`w-full py-4 rounded-sm font-bold text-lg transition-all text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#45484B] hover:bg-black'
            }`}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center z-10">
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