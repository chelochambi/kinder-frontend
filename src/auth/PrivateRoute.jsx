// src/auth/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export default function PrivateRoute({ children }) {
  const { usuario, token, logout, loading } = useAuth();

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  if (!usuario || !token) return <Navigate to="/login" replace />;

  const decoded = decodeToken(token);
  const currentTime = Date.now() / 1000;

  if (!decoded || decoded.exp < currentTime) {
    logout(); // Limpia localStorage y contexto
    return <Navigate to="/login" replace />;
  }

  return children;
}
