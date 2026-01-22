import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword'; // N'oublie pas l'import
import Dashboard from './pages/dashboard/Dashboard';
import Hotels from './pages/dashboard/Hotels';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Routes PROTÉGÉES : Seuls les connectés peuvent entrer ici */}
        <Route 
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hotels" element={<Hotels />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
export default App;
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Groupe AUTH : Utilise AuthLayout */}
//         <Route element={<AuthLayout />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Ajoute cette ligne */}
//         </Route>

//         {/* Groupe DASHBOARD : Utilise DashboardLayout */}
//         <Route element={<DashboardLayout />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/hotels" element={<Hotels />} />
//         </Route>

//         {/* Redirection par défaut */}
//         <Route path="/" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;