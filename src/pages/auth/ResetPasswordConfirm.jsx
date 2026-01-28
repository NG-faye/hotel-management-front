import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPasswordConfirm = () => {
  const { uid, token } = useParams(); // On récupère les IDs de l'URL
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== reNewPassword) {
      return toast.error("Les mots de passe ne correspondent pas");
    }

    setLoading(true);
    const loadingToast = toast.loading("Réinitialisation...");

    try {
      await axios.post('https://hotel-management-backend-ommj.onrender.com/auth/users/reset_password_confirm/', {
        uid,
        token,
        new_password: newPassword,
        re_new_password: reNewPassword
      });

      toast.success("Mot de passe modifié avec succès !", { id: loadingToast });
      navigate('/login');
    } catch (error) {
      toast.error("Le lien a expiré ou est invalide.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white p-10 rounded-sm shadow-2xl w-full max-w-[400px]">
        <h2 className="text-gray-800 text-xl font-bold mb-6">Nouveau mot de passe</h2>
        
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="relative border-b border-gray-300">
            <input 
              type="password" 
              className="peer w-full py-2 outline-none text-sm bg-transparent placeholder-transparent" 
              placeholder="Nouveau mot de passe"
              required 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3.5 peer-focus:text-xs">
              Nouveau mot de passe
            </label>
          </div>

          <div className="relative border-b border-gray-300">
            <input 
              type="password" 
              className="peer w-full py-2 outline-none text-sm bg-transparent placeholder-transparent" 
              placeholder="Confirmer"
              required 
              value={reNewPassword}
              onChange={(e) => setReNewPassword(e.target.value)}
            />
            <label className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3.5 peer-focus:text-xs">
              Confirmer le mot de passe
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-sm font-bold text-white ${loading ? 'bg-gray-400' : 'bg-[#45484B] hover:bg-black'}`}
          >
            {loading ? "Mise à jour..." : "Réinitialiser"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;