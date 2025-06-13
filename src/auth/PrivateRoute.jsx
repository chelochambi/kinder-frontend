// src/auth/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { usuario, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return usuario ? children : <Navigate to="/login" />;
}
