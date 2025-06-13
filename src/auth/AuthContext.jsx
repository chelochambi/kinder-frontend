import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (resp.ok) {
          const data = await resp.json();
          setUsuario(data.usuario);
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          // Procesar menus igual que antes si querés
        } else {
          setUsuario(null);
          localStorage.removeItem("usuario");
        }
      } catch (error) {
        setUsuario(null);
        localStorage.removeItem("usuario");
      }
      setLoading(false);
    }
    fetchUsuario();
  }, []);

  const login = (usuario) => {
    setUsuario(usuario);

    // Aquí puedes seguir procesando menus para guardarlos en localStorage
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

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menus", JSON.stringify(sidebarMenus));
  };

  const logout = async () => {
    // Opcional: llamar a backend para invalidar sesión
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("menus");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
