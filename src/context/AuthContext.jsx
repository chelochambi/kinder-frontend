import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const hardcodedUser = {
  username: "admin",
  password: "1234",
  roles: ["admin", "docente"], // ejemplo de roles
  sucursales: [
    { id: "s1", nombre: "Sucursal Centro" },
    { id: "s2", nombre: "Sucursal Norte" },
  ],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === hardcodedUser.username && password === hardcodedUser.password) {
      // Aquí guardamos toda la info del usuario, incluyendo roles y sucursales
      const newUser = {
        username: hardcodedUser.username,
        roles: hardcodedUser.roles,
        sucursales: hardcodedUser.sucursales,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/");
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
