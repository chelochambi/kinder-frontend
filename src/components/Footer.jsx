// src/components/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-light border-top py-3 px-4 mt-auto">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <small className="text-muted">
          © {year} Kinder ERP — Todos los derechos reservados
        </small>
        <small className="text-muted mt-2 mt-md-0">
          Versión 1.0.0
        </small>
      </div>
    </footer>
  );
}
