import { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";

export default function Header() {
  const { usuario, logout } = useAuth();
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

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3 shadow-sm">
      {/* Logo e Identidad */}
      <div className="d-flex align-items-center gap-2">
        <img src="/src/assets/logo.png" alt="Logo" style={{ height: 28 }} />
        <span className="navbar-brand mb-0 h6">Kinder ERP</span>
      </div>

      {/* Dropdown de usuario solo si hay un usuario autenticado */}
      {usuario && (
        <div className="ms-auto" ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
            type="button"
            aria-expanded={open}
            aria-haspopup="true"
          >
            Bienvenido, {usuario.username}
          </button>

          {open && (
            <ul
              className="dropdown-menu show dropstart"
              style={{ position: "absolute", top: "100%", right: 0, marginTop: "0.5rem" }}
            >
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => alert("Datos de usuario")}
                >
                  <FaUser className="me-2" />
                  Datos usuario
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => alert("Cambiar contraseña")}
                >
                  <FaKey className="me-2" />
                  Cambiar contraseña
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item text-danger d-flex align-items-center"
                  onClick={logout}
                >
                  <FaSignOutAlt className="me-2" />
                  Cerrar sesión
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}
