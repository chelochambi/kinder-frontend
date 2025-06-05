import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);  // <---- Estado para controlar carga

  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUsuario = localStorage.getItem("usuario");

  if (savedToken && savedUsuario) {
    try {
      setToken(savedToken);
      setUsuario(JSON.parse(savedUsuario));
      console.log("Usuario y token restaurados correctamente");
    } catch (error) {
      console.error("Error parseando usuario desde localStorage", error);
      setToken(null);
      setUsuario(null);
    }
  } else {
    console.log("No se encontraron token o usuario en localStorage");
  }
  setLoading(false);
}, []);


  const login = (token, usuario) => {
    setToken(token);
    setUsuario(usuario);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
