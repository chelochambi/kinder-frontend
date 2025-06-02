import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { menuItems } from "../data/menuItems";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState([]); // para controlar submenús abiertos
  const location = useLocation();

  // Al cargar el componente o cambiar ruta, abrir automáticamente el submenú correspondiente
  useEffect(() => {
    // Buscar qué menús padres tienen un submenú con la ruta actual
    const menusToOpen = menuItems
      .filter(
        (menu) =>
          menu.subMenus &&
          menu.subMenus.some((sub) => sub.path === location.pathname)
      )
      .map((menu) => menu.id);

    setOpenMenus(menusToOpen);
  }, [location.pathname]);

  // Función para abrir/cerrar submenú
  const toggleSubMenu = (id) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      className={`bg-dark text-white min-vh-100 d-flex flex-column`}
      style={{ width: isCollapsed ? "80px" : "250px", transition: "width 0.3s" }}
    >
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        {!isCollapsed && <h5>Menú</h5>}
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <FaBars />
        </button>
      </div>

      <ul className="nav flex-column gap-1 flex-grow-1 px-2">
        {menuItems.map(({ id, label, icon: Icon, path, subMenus }) => {
          // Detectar si el menú padre está activo (ruta igual o alguna ruta hija coincide)
          const isActiveParent =
            (path && location.pathname === path) ||
            (subMenus && subMenus.some((sm) => sm.path === location.pathname));

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
                    {!isCollapsed && (isOpen ? <FaChevronUp /> : <FaChevronDown />)}
                  </button>

                  {/* Submenús */}
                  {isOpen && !isCollapsed && (
                    <ul className="nav flex-column ms-4 mt-1">
                      {subMenus.map(({ id: subId, label: subLabel, path: subPath }) => {
                        const isActiveSub = location.pathname === subPath;
                        return (
                          <li key={subId} className="nav-item">
                            <Link
                              to={subPath}
                              className={`nav-link text-white ${isActiveSub ? "active" : ""}`}
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
