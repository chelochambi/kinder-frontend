// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUsuario = localStorage.getItem("usuario");
    const savedMenus = localStorage.getItem("menus");

    if (savedToken && savedUsuario && savedMenus) {
      try {
        setToken(savedToken);
        setUsuario(JSON.parse(savedUsuario));
      } catch (error) {
        console.error("Error parseando datos del localStorage", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token, usuario) => {
    setToken(token);
    setUsuario(usuario);

    // Filtrar menús que sean tipo sidebar
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
