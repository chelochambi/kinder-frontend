import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const hardcodedUser = {
  username: "admin",
  password: "1234"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NUEVO
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // Cuando termina de intentar recuperar sesión
  }, []);

  const login = (username, password) => {
    if (username === hardcodedUser.username && password === hardcodedUser.password) {
      const newUser = { username };
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
