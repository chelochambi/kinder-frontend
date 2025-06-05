// src/components/Header.jsx
import UserDropdown from "./UserDropdown";

export default function Header() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3 shadow-sm">
      {/* Logo e Identidad */}
      <div className="d-flex align-items-center gap-2">
        <img src="/src/assets/logo.png" alt="Logo" style={{ height: 28 }} />
        <span className="navbar-brand mb-0 h6">Kinder ERP</span>
      </div>

      {/* Dropdown del usuario */}
      <UserDropdown />
    </nav>
  );
}
