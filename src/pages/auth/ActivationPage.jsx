import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActivationPage = () => {
    const { uid, token } = useParams(); // Récupère les paramètres de l'URL du mail
    const navigate = useNavigate();
    const [status, setStatus] = useState('activation_en_cours');

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                // Remplace par ton URL Render réelle
                await axios.post('https://ton-backend.onrender.com/auth/users/activation/', {
                    uid,
                    token
                });
                setStatus('success');
                // Redirection vers la connexion après 3 secondes
                setTimeout(() => navigate('/login'), 3000);
            } catch (error) {
                setStatus('error');
            }
        };

        verifyAccount();
    }, [uid, token, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            {status === 'activation_en_cours' && <h2>Activation de votre compte en cours...</h2>}
            {status === 'success' && (
                <div style={{ color: 'green' }}>
                    <h2>Compte activé avec succès ! 🎉</h2>
                    <p>Vous allez être redirigé vers la page de connexion.</p>
                </div>
            )}
            {status === 'error' && (
                <div style={{ color: 'red' }}>
                    <h2>Erreur d'activation</h2>
                    <p>Le lien est invalide ou a déjà été utilisé.</p>
                </div>
            )}
        </div>
    );
};

export default ActivationPage;