// src/hooks/usePermisosPagina.js
import { useAuth } from "/src/auth/AuthContext";

export function usePermisosPagina(ruta) {
  const { usuario } = useAuth();

  if (!usuario || !usuario.menus) return [];

  const buscarPermisos = (menus) => {
    for (const menu of menus) {
      if (menu.ruta === ruta && menu.permisos) {
        return menu.permisos;
      }

      if (menu.submenus) {
        const permisosSub = buscarPermisos(menu.submenus);
        if (permisosSub.length) return permisosSub;
      }
    }
    return [];
  };

  return buscarPermisos(usuario.menus);
}
