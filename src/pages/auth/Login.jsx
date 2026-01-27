import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react'; 
import toast from 'react-hot-toast'; // On garde l'import pour envoyer les messages

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // On appelle le toast, mais l'affichage se fera via le Toaster de App.jsx
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
      setIsLoading(false);
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
            <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs">
              E-mail
            </label>
          </div>

          <div className="relative border-b border-gray-300">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password"
              className="peer w-full py-2 pr-10 outline-none text-sm text-gray-800 bg-transparent placeholder-transparent" 
              placeholder="Mot de passe"
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs">
              Mot de passe
            </label>
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-4 rounded-sm font-bold text-lg transition-all active:scale-95 flex justify-center items-center gap-2
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#45484B] hover:bg-black text-white'}`}
          >
            {isLoading ? "Chargement..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;