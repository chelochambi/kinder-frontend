import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-4 text-center">
      <h1 className="display-1">404</h1>
      <h2>Página no encontrada</h2>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
    </div>
  );
}
