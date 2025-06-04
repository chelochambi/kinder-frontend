import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { menuItems } from "../data/menuItems";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState([]); // para controlar submenús abiertos
  const [hoveredMenu, setHoveredMenu] = useState(null); // para flyout
  const location = useLocation();

  useEffect(() => {
    const menusToOpen = menuItems
      .filter(
        (menu) =>
          menu.subMenus &&
          menu.subMenus.some((sub) => sub.path === location.pathname)
      )
      .map((menu) => menu.id);

    setOpenMenus(menusToOpen);
  }, [location.pathname]);

  const toggleSubMenu = (id) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
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
            setHoveredMenu(null);
          }}
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <FaBars />
        </button>
      </div>

      <ul className="nav flex-column gap-1 flex-grow-1 px-2">
        {menuItems.map(({ id, label, icon: Icon, path, subMenus }) => {
          const isActiveParent =
            (path && location.pathname === path) ||
            (subMenus && subMenus.some((sm) => sm.path === location.pathname));
          const isOpen = openMenus.includes(id);

          return (
            <li
              key={id}
              className="nav-item position-relative"
              onMouseEnter={() => isCollapsed && setHoveredMenu(id)}
              onMouseLeave={() => isCollapsed && setHoveredMenu(null)}
            >
              {subMenus ? (
                <>
                  <button
                    className={`btn nav-link text-white d-flex align-items-center justify-content-between w-100 ${
                      isActiveParent ? "active" : ""
                    }`}
                    onClick={() => !isCollapsed && toggleSubMenu(id)}
                    style={{ background: "none", border: "none" }}
                  >
                    <span className="d-flex align-items-center">
                      <Icon size={isCollapsed ? 24 : 18} />
                      {!isCollapsed && <span className="ms-2">{label}</span>}
                    </span>
                    {!isCollapsed &&
                      (isOpen ? <FaChevronUp /> : <FaChevronDown />)}
                  </button>

                  {!isCollapsed && isOpen && (
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

                  {isCollapsed && hoveredMenu === id && (
                    <div
                      className="bg-dark text-white rounded shadow position-absolute flyout-menu flyout-with-arrow show"
                      style={{
                        top: 0,
                        left: "100%",
                        zIndex: 1000,
                        minWidth: "180px",
                        padding: "0.5rem",
                      }}
                    >
                      <strong className="d-block mb-2">{label}</strong>
                      {subMenus.map(({ id: subId, label: subLabel, path: subPath }) => {
                        const isActiveSub = location.pathname === subPath;
                        return (
                          <Link
                            key={subId}
                            to={subPath}
                            className={`d-block px-2 py-1 text-decoration-none text-white rounded ${
                              isActiveSub ? "bg-primary" : "hover:bg-secondary"
                            }`}
                          >
                            {subLabel}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={path}
                  className={`nav-link text-white d-flex align-items-center ${
                    isActiveParent ? "active" : ""
                  }`}
                >
                  <Icon size={isCollapsed ? 24 : 18} />
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
