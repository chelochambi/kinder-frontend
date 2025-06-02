import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaStore, FaUser, FaChevronDown, FaChevronUp, FaBars } from "react-icons/fa";
import "../assets/css/sidebar.css"; // Archivo con estilos personalizados

export default function Sidebar() {
  const location = useLocation();

  // Estado para sidebar colapsado o no
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Estado para controlar qué menús padres están abiertos
  const [openMenus, setOpenMenus] = useState([]);

  // Menú con íconos, rutas y submenús
  const menuItems = [
    { id: 1, label: "Inicio", icon: FaHome, path: "/" },
    {
      id: 2,
      label: "Usuarios",
      icon: FaUsers,
      subMenus: [
        { id: 21, label: "Roles", path: "/roles" },
        { id: 22, label: "Usuarios", path: "/usuarios" },
      ],
    },
    { id: 3, label: "Sucursales", icon: FaStore, path: "/sucursales" },
    { id: 4, label: "Clientes", icon: FaUser, path: "/clientes" },
  ];

  // Abrir automáticamente el menú padre si la ruta actual es un submenú
  useEffect(() => {
    // Buscar qué menús padres tienen un submenú activo
    const activeParentIds = menuItems
      .filter(
        (menu) =>
          menu.subMenus &&
          menu.subMenus.some((sm) => sm.path === location.pathname)
      )
      .map((menu) => menu.id);

    setOpenMenus(activeParentIds);
  }, [location.pathname]);

  // Función para abrir/cerrar submenú
  const toggleSubMenu = (id) => {
    if (openMenus.includes(id)) {
      setOpenMenus(openMenus.filter((openId) => openId !== id));
    } else {
      setOpenMenus([...openMenus, id]);
    }
  };

  // Toggle colapsar sidebar
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`bg-dark text-white d-flex flex-column ${
        isCollapsed ? "sidebar-collapsed" : ""
      }`}
      style={{ width: isCollapsed ? "70px" : "250px", minHeight: "100vh" }}
    >
      {/* Botón para colapsar */}
      <div className="d-flex justify-content-end p-2">
        <button
          onClick={toggleSidebar}
          className="btn btn-sm btn-outline-light"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Título (oculto si colapsado) */}
      {!isCollapsed && (
        <h5 className="px-3 mb-4" style={{ userSelect: "none" }}>
          Menú
        </h5>
      )}

      {/* Lista de menús */}
      <ul className="nav flex-column gap-1 px-1">
        {menuItems.map(({ id, label, icon: Icon, path, subMenus }) => {
          // Determinar si el menú padre está activo o su submenú está activo
          const isActiveParent =
            (path && location.pathname === path) ||
            (subMenus &&
              subMenus.some((sm) => sm.path === location.pathname));
          const isOpen = openMenus.includes(id);

          return (
            <li key={id} className="nav-item">
              {subMenus ? (
                <>
                  <button
                    className={`btn btn-toggle nav-link text-white d-flex align-items-center justify-content-between w-100 ${
                      isActiveParent ? "active" : ""
                    }`}
                    onClick={() => toggleSubMenu(id)}
                    style={{ background: "none", border: "none" }}
                  >
                    <span className="d-flex align-items-center">
                      <Icon />
                      {!isCollapsed && <span className="ms-2">{label}</span>}
                    </span>
                    {!isCollapsed &&
                      (isOpen ? <FaChevronUp /> : <FaChevronDown />)}
                  </button>

                  {isOpen && !isCollapsed && (
                    <ul className="nav flex-column ms-4 mt-1">
                      {subMenus.map(({ id: subId, label: subLabel, path: subPath }) => {
                        const isActiveSub = location.pathname === subPath;
                        return (
                          <li key={subId} className="nav-item">
                            <Link
                              to={subPath}
                              className={`nav-link text-white ${
                                isActiveSub ? "active" : ""
                              }`}
                            >
                              {subLabel}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={path}
                  className={`nav-link text-white d-flex align-items-center ${
                    isActiveParent ? "active" : ""
                  }`}
                >
                  <Icon />
                  {!isCollapsed && <span className="ms-2">{label}</span>}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
