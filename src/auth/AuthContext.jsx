// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Función para decodificar el token (base64url decoding simple)
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

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Verificación al montar: controla que el token no esté vencido en el arranque
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUsuario = localStorage.getItem("usuario");
    const savedMenus = localStorage.getItem("menus");

    if (savedToken && savedUsuario && savedMenus) {
      const decoded = decodeToken(savedToken);
      const currentTime = Date.now() / 1000;

      if (!decoded || decoded.exp < currentTime) {
        console.warn("Token expirado o inválido");
        logout();
      } else {
        try {
          setToken(savedToken);
          setUsuario(JSON.parse(savedUsuario));
        } catch (error) {
          console.error("Error parseando datos del localStorage", error);
          logout();
        }
      }
    }

    setLoading(false);
  }, []);

  // ✅ Nuevo: verificación periódica del token (cada 15 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        const decoded = decodeToken(token);
        const now = Date.now() / 1000;

        if (!decoded || decoded.exp < now) {
          console.warn("Token expirado (verificado en segundo plano)");
          logout();
        }
      }
    }, 15000); // cada 15 segundos

    return () => clearInterval(interval); // Limpieza del intervalo
  }, [token]);

  const login = (token, usuario) => {
    setToken(token);
    setUsuario(usuario);

    const sidebarMenus = [];

    const extractSidebarMenus = (menus) => {
      menus.forEach((menu) => {
        if (menu.tipo === "sidebar" && menu.mostrar !== false) {
          sidebarMenus.push({
            ...menu,
            padre_id: menu.padre_id ?? null,
          });

          if (menu.submenus && Array.isArray(menu.submenus)) {
            menu.submenus.forEach((submenu) => {
              if (submenu.tipo === "sidebar" && submenu.mostrar !== false) {
                sidebarMenus.push({
                  ...submenu,
                  padre_id: menu.id,
                });
              }
            });
          }
        }
      });
    };

    extractSidebarMenus(usuario.menus);

    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menus", JSON.stringify(sidebarMenus));
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("menus");
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
