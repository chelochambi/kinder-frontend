import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { buildMenuTree } from "/src/utils/buildMenuTree";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState([]);
  const [menus, setMenus] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const rawMenus = JSON.parse(localStorage.getItem("menus") || "[]");
    const treeMenus = buildMenuTree(rawMenus);
    setMenus(treeMenus);
  }, []);

  const toggleSubMenu = (id) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderMenu = (items, level = 0) => {
    return (
      <ul className={`nav flex-column ${level > 0 ? "ms-" + level * 2 : "px-2"}`}>
        {items.map((item) => {
          const isOpen = openMenus.includes(item.id);
          const isActive = location.pathname === item.ruta;

          // ✅ Obtener ícono dinámicamente
          const IconComponent = FaIcons[item.icono] || FaIcons.FaList;

          return (
            <li key={item.id} className="nav-item">
              {item.children.length > 0 ? (
                <>
                  <button
                    className={`btn nav-link text-white d-flex justify-content-between align-items-center w-100 ${isActive ? "active" : ""}`}
                    onClick={() => toggleSubMenu(item.id)}
                    style={{ background: "none", border: "none" }}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <IconComponent className="me-2" />
                      {!isCollapsed && item.nombre}
                    </span>
                    {!isCollapsed &&
                      (isOpen ? <FaChevronUp /> : <FaChevronDown />)}
                  </button>
                  {!isCollapsed && isOpen && renderMenu(item.children, level + 1)}
                </>
              ) : (
                <Link
                  to={item.ruta}
                  className={`nav-link text-white d-flex align-items-center ${isActive ? "active" : ""}`}
                >
                  <IconComponent className="me-2" />
                  {!isCollapsed && item.nombre}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className={`bg-dark text-white min-vh-100 d-flex flex-column position-relative`}
      style={{ width: isCollapsed ? "80px" : "250px", transition: "width 0.3s" }}
    >
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        {!isCollapsed && <h5>Menú</h5>}
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <FaBars />
        </button>
      </div>

      <div className="flex-grow-1">{renderMenu(menus)}</div>
    </div>
  );
}
