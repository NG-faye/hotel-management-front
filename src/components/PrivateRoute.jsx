import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // On vérifie si un jeton de connexion existe dans le stockage du navigateur
  const isAuthenticated = !!localStorage.getItem('token');
  
  // Si oui, on affiche la page demandée. Sinon, on redirige vers /login.
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;