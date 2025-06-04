import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3 shadow-sm">
      <span className="navbar-brand">Kinder ERP</span>

      <div className="ms-auto" ref={dropdownRef} style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
        >
          Bienvenido, {user.username}
        </button>

        {open && (
          <ul
            className="dropdown-menu show dropstart"
            style={{ position: "absolute", top: "100%", right: 0, marginTop: "0.5rem" }}
          >
            <li>
              <button className="dropdown-item d-flex align-items-center" onClick={() => alert("Datos de usuario")}>
                <FaUser className="me-2" />
                Datos usuario
              </button>
            </li>
            <li>
              <button className="dropdown-item d-flex align-items-center" onClick={() => alert("Cambiar contraseña")}>
                <FaKey className="me-2" />
                Cambiar contraseña
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger d-flex align-items-center" onClick={logout}>
                <FaSignOutAlt className="me-2" />
                Cerrar sesión
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
