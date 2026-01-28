import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Pour l'état du bouton

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Envoi des instructions...");

    try {
      // Route Djoser pour demander la réinitialisation
      await axios.post('https://hotel-management-backend-ommj.onrender.com/auth/users/reset_password/', { 
        email: email 
      });

      toast.success("Si cet e-mail existe, vous recevrez un lien de réinitialisation.", { id: loadingToast });
      setEmail(''); // On vide le champ après succès
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'envoi.", { id: loadingToast });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white p-10 rounded-sm shadow-2xl w-full max-w-[400px] z-10">
        <h2 className="text-gray-800 text-xl font-bold mb-2">Mot de passe oublié ?</h2>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed">
          Entrez votre adresse e-mail ci-dessous et nous vous envoyons des instructions pour réinitialiser votre mot de passe.
        </p>

        <form className="space-y-12" onSubmit={handleSubmit}>
          <div className="relative border-b border-gray-300">
            <input 
              type="email" 
              id="forgot-email"
              className="peer w-full py-2 outline-none text-sm text-gray-800 bg-transparent placeholder-transparent" 
              placeholder="E-mail"
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label 
              htmlFor="forgot-email"
              className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all 
                         peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                         peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-xs pointer-events-none"
            >
              E-mail
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-sm font-bold text-lg transition-all text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#45484B] hover:bg-black'
            }`}
          >
            {loading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center z-10">
        <p className="text-white">
          Revenir à la <Link to="/login" className="text-[#FFD700] font-bold hover:underline">connexion</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;