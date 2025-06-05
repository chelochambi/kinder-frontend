// src/components/UserDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";

export default function UserDropdown() {
  const { usuario, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!usuario) return null;

  return (
    <div className="ms-auto" ref={dropdownRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-outline-secondary d-flex align-items-center gap-2"
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <FaUser className="text-primary" />
        <span className="d-none d-sm-inline">{usuario.username}</span>
      </button>

      {open && (
        <ul
          className="dropdown-menu show dropstart shadow"
          style={{ position: "absolute", top: "100%", right: 0, marginTop: "0.5rem" }}
        >
          <li className="dropdown-header text-muted small px-3">
            Sesión de usuario
          </li>
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
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button className="dropdown-item text-danger d-flex align-items-center" onClick={logout}>
              <FaSignOutAlt className="me-2" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
